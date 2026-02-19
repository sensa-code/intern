/**
 * generate-flow-diagrams.js
 *
 * 為程序的 procedure_steps / technique 內容生成 Mermaid 流程圖
 * 使用 claude -p CLI（利用 Claude Max 訂閱，$0 額外成本）
 *
 * 用法：
 *   node scripts/generate-flow-diagrams.js [--dry-run] [--limit=N] [--resume]
 */
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const CHECKPOINT_PATH = path.join(__dirname, 'flow-diagram-checkpoint.json');

// CLI 參數
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const limitArg = args.find(a => a.startsWith('--limit='));
const limit = limitArg ? parseInt(limitArg.split('=')[1]) : undefined;
const isResume = args.includes('--resume');

function loadCheckpoint() {
  try {
    if (fs.existsSync(CHECKPOINT_PATH)) {
      return JSON.parse(fs.readFileSync(CHECKPOINT_PATH, 'utf8'));
    }
  } catch { /* ignore */ }
  return { completed: [], failed: {} };
}

function saveCheckpoint(checkpoint) {
  fs.writeFileSync(CHECKPOINT_PATH, JSON.stringify(checkpoint, null, 2));
}

/**
 * 使用 claude -p 生成 Mermaid 語法
 */
function generateMermaid(procedureName, procedureSteps, technique) {
  const content = procedureSteps || technique || '';
  if (content.length < 50) return null;

  const prompt = `你是一位獸醫臨床流程圖設計師。請根據以下程序步驟，生成一個 Mermaid.js 流程圖。

程序名稱: ${procedureName}

步驟內容:
${content.substring(0, 2000)}

規則:
1. 使用 graph TD（由上到下）
2. 節點文字簡短（10-20 字），使用中文
3. 5-12 個節點為宜
4. 使用菱形 {} 做決策分支（如適用）
5. 使用方形 [] 做一般步驟
6. 使用圓角 () 做起始/結束
7. 只輸出 Mermaid 語法，不要任何其他說明文字
8. 不要用 markdown code fence

範例格式:
graph TD
    A(患者評估) --> B[建立靜脈通路]
    B --> C{血液動力學穩定?}
    C -->|是| D[影像學確認]
    C -->|否| E[液體復甦]
    E --> D
    D --> F[執行程序]
    F --> G(術後監控)`;

  const tmpFile = path.join(os.tmpdir(), `mermaid-prompt-${Date.now()}.txt`);
  fs.writeFileSync(tmpFile, prompt);

  try {
    const result = execSync(
      `claude -p --model claude-sonnet-4-20250514 --output-format json < "${tmpFile}"`,
      { encoding: 'utf8', timeout: 60000, maxBuffer: 1024 * 1024 }
    );

    fs.unlinkSync(tmpFile);

    // 解析 claude CLI JSON 輸出
    const parsed = JSON.parse(result);
    let mermaidCode = parsed.result || parsed;

    if (typeof mermaidCode !== 'string') {
      mermaidCode = JSON.stringify(mermaidCode);
    }

    // 清理可能的 markdown fence
    mermaidCode = mermaidCode
      .replace(/```mermaid\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();

    // 驗證基本結構
    if (!mermaidCode.startsWith('graph')) {
      console.log('    ⚠️ Invalid mermaid (不以 graph 開頭)');
      return null;
    }

    return mermaidCode;
  } catch (err) {
    fs.unlinkSync(tmpFile).catch(() => {});
    console.log(`    ❌ Claude CLI error: ${err.message?.substring(0, 100)}`);
    return null;
  }
}

async function main() {
  console.log(`\n=== generate-flow-diagrams.js ${isDryRun ? '(DRY RUN)' : ''} ===\n`);

  // 載入 checkpoint
  const checkpoint = isResume ? loadCheckpoint() : { completed: [], failed: {} };
  if (isResume && checkpoint.completed.length > 0) {
    console.log(`Resuming: ${checkpoint.completed.length} already completed`);
  }

  // 取得需要生成流程圖的程序（有步驟內容但無 flow_diagram）
  let query = supabase
    .from('vt_procedures')
    .select('procedure_id, name, name_zh, procedure_steps, procedure_steps_zh, technique, technique_zh, flow_diagram')
    .order('procedure_id');

  const { data: procedures, error } = await query;

  if (error) {
    console.error('ERROR:', error.message);
    process.exit(1);
  }

  // 過濾：有步驟但無流程圖
  const candidates = procedures.filter(p =>
    !p.flow_diagram &&
    (p.procedure_steps || p.technique) &&
    !checkpoint.completed.includes(p.procedure_id)
  );

  const total = limit ? Math.min(candidates.length, limit) : candidates.length;
  console.log(`Candidates: ${candidates.length}, Processing: ${total}\n`);

  let success = 0;
  let failed = 0;

  for (let i = 0; i < total; i++) {
    const proc = candidates[i];
    const progress = `[${i + 1}/${total}]`;
    console.log(`${progress} ${proc.procedure_id} ${proc.name_zh || proc.name}`);

    // 優先用中文步驟，fallback 英文
    const steps = proc.procedure_steps_zh || proc.procedure_steps;
    const tech = proc.technique_zh || proc.technique;
    const name = proc.name_zh || proc.name;

    const mermaid = generateMermaid(name, steps, tech);

    if (!mermaid) {
      checkpoint.failed[proc.procedure_id] = 'generation failed';
      failed++;
      saveCheckpoint(checkpoint);
      continue;
    }

    console.log(`    ✅ ${mermaid.split('\n').length} 行 Mermaid 語法`);

    if (!isDryRun) {
      const { error: updateError } = await supabase
        .from('vt_procedures')
        .update({ flow_diagram: mermaid })
        .eq('procedure_id', proc.procedure_id);

      if (updateError) {
        console.log(`    ❌ DB error: ${updateError.message}`);
        checkpoint.failed[proc.procedure_id] = updateError.message;
        failed++;
      } else {
        checkpoint.completed.push(proc.procedure_id);
        success++;
      }
    } else {
      checkpoint.completed.push(proc.procedure_id);
      success++;
      // Dry run: 輸出前幾行
      console.log(`    ${mermaid.split('\n').slice(0, 3).join('\n    ')}`);
    }

    saveCheckpoint(checkpoint);

    // 延遲 1 秒避免 rate limit
    if (i < total - 1) {
      await new Promise(r => setTimeout(r, 1000));
    }
  }

  console.log(`\n=== Done ===`);
  console.log(`  ✅ Success: ${success}`);
  console.log(`  ❌ Failed: ${failed}`);
  console.log(`  📋 Checkpoint: ${CHECKPOINT_PATH}`);
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
