/**
 * Phase 2: AI-generated clinical content for 281 veterinary procedures.
 *
 * Uses Claude CLI (`claude -p`) via the user's Max subscription.
 * Generates bilingual (EN + Traditional Chinese) content for 16 DB fields.
 *
 * Usage:
 *   node scripts/generate-content.js                 # full run
 *   node scripts/generate-content.js --dry-run       # generate JSON, no DB write
 *   node scripts/generate-content.js --limit=3       # only N procedures
 *   node scripts/generate-content.js --start=proc_100  # start from specific ID
 *   node scripts/generate-content.js --resume        # resume from checkpoint
 *   node scripts/generate-content.js --model=opus    # use opus (default: sonnet)
 */

const { createClient } = require('@supabase/supabase-js');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// ── Config ──────────────────────────────────────────────────────────
const SUPABASE_URL = 'https://iizotzzzfhqswjmcotil.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlpem90enp6Zmhxc3dqbWNvdGlsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDIyMzUzNCwiZXhwIjoyMDg1Nzk5NTM0fQ.tNpM0fWimEGNux7cs3dZGgCVAuh4W83kGqdxujh5x0A';

const sb = createClient(SUPABASE_URL, SUPABASE_KEY);

const CHECKPOINT_FILE = path.join(__dirname, 'generate-checkpoint.json');
const DRY_RUN_DIR = path.join(__dirname, 'dry-run-output');
const DELAY_MS = 3000; // 3s between calls to be respectful

const CONTENT_FIELDS_EN = [
  'indications', 'contraindications', 'equipment', 'patient_preparation',
  'technique', 'procedure_steps', 'aftercare', 'complications',
];
const CONTENT_FIELDS_ZH = CONTENT_FIELDS_EN.map(f => `${f}_zh`);
const ALL_FIELDS = [...CONTENT_FIELDS_EN, ...CONTENT_FIELDS_ZH];

// ── CLI Args ────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const RESUME = args.includes('--resume');
const LIMIT = (() => {
  const m = args.find(a => a.startsWith('--limit='));
  return m ? parseInt(m.split('=')[1], 10) : 0;
})();
const START_ID = (() => {
  const m = args.find(a => a.startsWith('--start='));
  return m ? m.split('=')[1] : null;
})();
const MODEL_ARG = (() => {
  const m = args.find(a => a.startsWith('--model='));
  return m ? m.split('=')[1] : 'sonnet';
})();

// ── System Prompt ───────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are a veterinary specialist educator with extensive clinical experience in small animal medicine and surgery.
You will generate residency-level training content for a specific clinical procedure.

CONTENT REQUIREMENTS:
1. Professional veterinary manual style, evidence-based medicine
2. Include specific drug dosages (mg/kg), equipment specifications, monitoring parameters
3. Species: dogs and cats only. Note species differences where relevant
4. Format: use "•" for bullet lists, "1. 2. 3." for sequential steps, plain paragraphs for explanatory text
5. Character length per field:
   - indications: 300-1200 chars
   - contraindications: 200-800 chars
   - equipment: 200-800 chars
   - patient_preparation: 300-1000 chars
   - technique: 500-1500 chars
   - procedure_steps: 800-2000 chars (MOST DETAILED field)
   - aftercare: 300-1200 chars
   - complications: 300-1200 chars
6. Traditional Chinese (繁體中文) for _zh fields. Key terms must include English in parentheses:
   e.g. 脈搏血氧飽和度 (pulse oximetry)
7. Drug names stay in English in Chinese text: e.g. 給予 epinephrine 0.01 mg/kg IM
8. Content must integrate these educational dimensions:
   - Pathophysiology: WHY this procedure is needed (in indications & technique)
   - Clinical signs & diagnosis: assessment criteria (in indications & patient_preparation)
   - Treatment strategy: approach rationale (in technique)
   - Complications & monitoring: risks + how to detect/manage (in complications & aftercare)
   - Prognosis discussion (in aftercare)
   - Translational insights from human medicine where applicable (in technique)
   - Clinical controversies & knowledge gaps (in complications)

FIELD GUIDELINES:
- indications: Why perform this procedure? Include pathophysiology and clinical indications
- contraindications: Absolute and relative contraindications with rationale
- equipment: Complete equipment list with specifications and drug dosages
- patient_preparation: Pre-procedure assessment, positioning, sedation requirements
- technique: Principle explanation, treatment strategy, translational insights if applicable
- procedure_steps: Detailed step-by-step instructions (THE MOST IMPORTANT field)
- aftercare: Post-procedure monitoring, prognosis discussion, client communication points
- complications: Complication list with management, clinical controversies and knowledge gaps

Produce BOTH English AND Traditional Chinese versions for each field (16 fields total).
Return ONLY valid JSON — no markdown code fences, no comments, no extra text.`;

// ── JSON response schema ────────────────────────────────────────────
const RESPONSE_SCHEMA = `{
  "indications": "...",
  "indications_zh": "...",
  "contraindications": "...",
  "contraindications_zh": "...",
  "equipment": "...",
  "equipment_zh": "...",
  "patient_preparation": "...",
  "patient_preparation_zh": "...",
  "technique": "...",
  "technique_zh": "...",
  "procedure_steps": "...",
  "procedure_steps_zh": "...",
  "aftercare": "...",
  "aftercare_zh": "...",
  "complications": "...",
  "complications_zh": "..."
}`;

// ── Checkpoint management ───────────────────────────────────────────
function loadCheckpoint() {
  if (fs.existsSync(CHECKPOINT_FILE)) {
    return JSON.parse(fs.readFileSync(CHECKPOINT_FILE, 'utf8'));
  }
  return { completed: [], failed: {}, lastRun: null, stats: { total: 0, done: 0, failed: 0 } };
}

function saveCheckpoint(cp) {
  cp.lastRun = new Date().toISOString();
  fs.writeFileSync(CHECKPOINT_FILE, JSON.stringify(cp, null, 2));
}

// ── Claude CLI call ─────────────────────────────────────────────────
function callClaude(userPrompt) {
  // Build the full prompt including system instructions
  const fullPrompt = `${SYSTEM_PROMPT}

RESPONSE FORMAT — return EXACTLY this JSON structure:
${RESPONSE_SCHEMA}

USER REQUEST:
${userPrompt}`;

  // Write prompt to temp file to avoid shell escaping issues
  const tmpFile = path.join(__dirname, '.tmp-prompt.txt');
  fs.writeFileSync(tmpFile, fullPrompt, 'utf8');

  try {
    const modelFlag = MODEL_ARG === 'opus'
      ? '--model claude-opus-4-20250514'
      : '--model claude-sonnet-4-20250514';

    const cmd = `claude -p ${modelFlag} --output-format json < "${tmpFile.replace(/\\/g, '/')}"`;

    const result = execSync(cmd, {
      encoding: 'utf8',
      timeout: 120_000, // 2 min timeout
      maxBuffer: 1024 * 1024, // 1MB
      shell: true,
    });

    // Parse the claude CLI JSON wrapper
    const cliResponse = JSON.parse(result.trim());

    if (cliResponse.is_error) {
      throw new Error(`Claude CLI error: ${cliResponse.result}`);
    }

    // The actual content is in cliResponse.result (a string)
    return cliResponse.result;
  } finally {
    if (fs.existsSync(tmpFile)) fs.unlinkSync(tmpFile);
  }
}

// ── Parse & validate AI response ────────────────────────────────────
function parseAndValidate(rawText, procId) {
  // Try to extract JSON from the response
  let jsonStr = rawText.trim();

  // Remove markdown code fences if present
  jsonStr = jsonStr.replace(/^```(?:json)?\s*\n?/i, '').replace(/\n?```\s*$/i, '');

  let data;
  try {
    data = JSON.parse(jsonStr);
  } catch (e) {
    // Try to find JSON object in the text
    const match = jsonStr.match(/\{[\s\S]*\}/);
    if (match) {
      data = JSON.parse(match[0]);
    } else {
      throw new Error(`JSON parse failed for ${procId}: ${e.message}`);
    }
  }

  // Validate all 16 fields exist
  const missing = ALL_FIELDS.filter(f => !data[f] || typeof data[f] !== 'string');
  if (missing.length > 0) {
    throw new Error(`Missing fields for ${procId}: ${missing.join(', ')}`);
  }

  // Validate minimum lengths
  const MIN_LENGTHS = {
    indications: 150, contraindications: 100, equipment: 100,
    patient_preparation: 150, technique: 300, procedure_steps: 400,
    aftercare: 150, complications: 150,
  };

  for (const [field, minLen] of Object.entries(MIN_LENGTHS)) {
    if (data[field].length < minLen) {
      throw new Error(`${procId}.${field} too short: ${data[field].length} < ${minLen}`);
    }
    // Also check Chinese version (allow slightly shorter)
    const zhField = `${field}_zh`;
    if (data[zhField].length < Math.floor(minLen * 0.5)) {
      throw new Error(`${procId}.${zhField} too short: ${data[zhField].length} < ${Math.floor(minLen * 0.5)}`);
    }
  }

  // Check for AI refusal patterns
  const refusalPatterns = [
    /I cannot/i, /I'm not able/i, /I don't have/i,
    /as an AI/i, /I apologize/i, /I'm sorry/i,
  ];
  for (const field of CONTENT_FIELDS_EN) {
    for (const pattern of refusalPatterns) {
      if (pattern.test(data[field])) {
        throw new Error(`${procId}.${field} contains AI refusal pattern`);
      }
    }
  }

  return data;
}

// ── Write to Supabase ───────────────────────────────────────────────
async function writeToSupabase(procId, data) {
  const { error } = await sb
    .from('vt_procedures')
    .update(data)
    .eq('procedure_id', procId);

  if (error) {
    throw new Error(`DB write failed for ${procId}: ${error.message}`);
  }
}

// ── Main ────────────────────────────────────────────────────────────
async function main() {
  console.log('═══════════════════════════════════════════════════');
  console.log('  VetResidencyTrainer — AI Content Generator');
  console.log('═══════════════════════════════════════════════════');
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN (no DB writes)' : 'LIVE (writing to DB)'}`);
  console.log(`Model: ${MODEL_ARG === 'opus' ? 'Claude Opus 4' : 'Claude Sonnet 4'}`);
  if (LIMIT) console.log(`Limit: ${LIMIT} procedures`);
  if (START_ID) console.log(`Start: ${START_ID}`);
  if (RESUME) console.log('Resuming from checkpoint');
  console.log('');

  // 1. Query empty procedures
  let query = sb
    .from('vt_procedures')
    .select('procedure_id, name, name_zh, tags')
    .is('indications', null)
    .order('procedure_id', { ascending: true });

  const { data: procedures, error: queryError } = await query;
  if (queryError) {
    console.error('Failed to query procedures:', queryError.message);
    process.exit(1);
  }

  console.log(`Found ${procedures.length} procedures with empty content`);

  // 2. Filter by start ID
  let toProcess = procedures;
  if (START_ID) {
    const idx = toProcess.findIndex(p => p.procedure_id === START_ID);
    if (idx === -1) {
      console.error(`Start ID ${START_ID} not found among empty procedures`);
      process.exit(1);
    }
    toProcess = toProcess.slice(idx);
  }

  // 3. Load checkpoint and filter
  const checkpoint = RESUME ? loadCheckpoint() : loadCheckpoint();
  if (RESUME && checkpoint.completed.length > 0) {
    const before = toProcess.length;
    toProcess = toProcess.filter(p => !checkpoint.completed.includes(p.procedure_id));
    console.log(`Checkpoint: skipping ${before - toProcess.length} completed procedures`);
  }

  // 4. Apply limit
  if (LIMIT > 0) {
    toProcess = toProcess.slice(0, LIMIT);
  }

  console.log(`Will process ${toProcess.length} procedures`);
  console.log('');

  if (DRY_RUN && !fs.existsSync(DRY_RUN_DIR)) {
    fs.mkdirSync(DRY_RUN_DIR, { recursive: true });
  }

  // 5. Process each procedure
  let successCount = 0;
  let failCount = 0;
  const startTime = Date.now();

  for (let i = 0; i < toProcess.length; i++) {
    const proc = toProcess[i];
    const progress = `[${i + 1}/${toProcess.length}]`;
    const tags = Array.isArray(proc.tags) ? proc.tags.join(', ') : '';

    console.log(`${progress} ${proc.procedure_id}: ${proc.name}`);
    console.log(`         ${proc.name_zh || '(no Chinese name)'}`);
    if (tags) console.log(`         Tags: ${tags}`);

    try {
      // Build user prompt
      const userPrompt = `Generate clinical training content for: "${proc.name}" (${proc.name_zh || 'N/A'})
Tags: [${tags}]`;

      // Call Claude
      const rawResponse = callClaude(userPrompt);

      // Parse and validate
      const content = parseAndValidate(rawResponse, proc.procedure_id);

      if (DRY_RUN) {
        // Save to local file
        const outFile = path.join(DRY_RUN_DIR, `${proc.procedure_id}.json`);
        fs.writeFileSync(outFile, JSON.stringify(content, null, 2));
        console.log(`  ✅ Saved to ${outFile}`);
      } else {
        // Write to DB
        await writeToSupabase(proc.procedure_id, content);
        console.log(`  ✅ Written to DB`);
      }

      // Update checkpoint
      checkpoint.completed.push(proc.procedure_id);
      successCount++;
    } catch (err) {
      console.error(`  ❌ Failed: ${err.message}`);
      checkpoint.failed[proc.procedure_id] = err.message;
      failCount++;
    }

    // Save checkpoint after each procedure
    checkpoint.stats = {
      total: toProcess.length,
      done: successCount,
      failed: failCount,
    };
    saveCheckpoint(checkpoint);

    // Delay between calls (skip for last one)
    if (i < toProcess.length - 1) {
      await new Promise(r => setTimeout(r, DELAY_MS));
    }

    // Progress report every 20 procedures
    if ((i + 1) % 20 === 0) {
      const elapsed = (Date.now() - startTime) / 1000;
      const rate = (i + 1) / elapsed;
      const remaining = (toProcess.length - i - 1) / rate;
      console.log('');
      console.log(`  ── Progress: ${successCount}✅  ${failCount}❌  Elapsed: ${Math.floor(elapsed)}s  ETA: ${Math.floor(remaining / 60)}m ${Math.floor(remaining % 60)}s ──`);
      console.log('');
    }
  }

  // 6. Final report
  const totalTime = (Date.now() - startTime) / 1000;
  console.log('');
  console.log('═══════════════════════════════════════════════════');
  console.log('  Final Report');
  console.log('═══════════════════════════════════════════════════');
  console.log(`  ✅ Success: ${successCount}`);
  console.log(`  ❌ Failed:  ${failCount}`);
  console.log(`  ⏱  Time:    ${Math.floor(totalTime / 60)}m ${Math.floor(totalTime % 60)}s`);
  console.log(`  📄 Mode:    ${DRY_RUN ? 'DRY RUN' : 'LIVE'}`);

  if (failCount > 0) {
    console.log('');
    console.log('  Failed procedures:');
    for (const [id, reason] of Object.entries(checkpoint.failed)) {
      console.log(`    • ${id}: ${reason.substring(0, 80)}`);
    }
  }

  console.log('');
  console.log(`Checkpoint saved to: ${CHECKPOINT_FILE}`);
  if (DRY_RUN) {
    console.log(`Dry run output saved to: ${DRY_RUN_DIR}/`);
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
