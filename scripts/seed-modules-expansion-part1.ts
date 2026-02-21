/**
 * Phase B 內容擴增 — Part 1（模組 1-5）
 * 麻醉前給藥、圍手術期止痛、尿液分析、凝血檢驗、過敏性休克
 *
 * 用法: npx tsx scripts/seed-modules-expansion-part1.ts
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
if (!supabaseUrl || !supabaseKey) { console.error('❌ 缺少環境變數'); process.exit(1); }
const supabase = createClient(supabaseUrl, supabaseKey);

// TipTap JSON helpers（與 seed-modules.ts 一致）
function text(t: string) { return { type: 'text', text: t }; }
function bold(t: string) { return { type: 'text', text: t, marks: [{ type: 'bold' }] }; }
function h2(t: string) { return { type: 'heading', attrs: { level: 2 }, content: [text(t)] }; }
function h3(t: string) { return { type: 'heading', attrs: { level: 3 }, content: [text(t)] }; }
function p(...nodes: ReturnType<typeof text>[]) { return { type: 'paragraph', content: nodes }; }
function li(t: string) { return { type: 'listItem', content: [p(text(t))] }; }
function ul(...items: ReturnType<typeof li>[]) { return { type: 'bulletList', content: items }; }
function ol(...items: ReturnType<typeof li>[]) { return { type: 'orderedList', content: items }; }
function doc(...nodes: Record<string, unknown>[]) { return { type: 'doc', content: nodes }; }
function hr() { return { type: 'horizontalRule' }; }

interface ModuleSeed {
  module_type: string; title: string; title_zh: string; slug: string;
  description: string; description_zh: string; department: string; tags: string[];
  content_json: Record<string, unknown>; content_json_zh: Record<string, unknown>;
  metadata: Record<string, unknown>; content_status: string; content_source: string; sort_order: number;
}

const MODULES: ModuleSeed[] = [
  // 1. 麻醉前給藥方案
  {
    module_type: 'drug_reference', title: 'Anesthetic Premedication Protocols',
    title_zh: '犬貓麻醉前給藥方案', slug: 'anesthetic-premedication-protocols',
    description: 'Common premedication protocols for dogs and cats before general anesthesia',
    description_zh: '犬貓全身麻醉前常用鎮靜止痛預處理方案', department: 'anesthesia',
    tags: ['anesthesia', 'sedation', 'pain'], content_status: 'verified', content_source: 'manual', sort_order: 10,
    metadata: { species: ['canine', 'feline'], protocol_count: 6 },
    content_json: doc(
      h2('Premedication Protocols'),
      h3('Healthy Dogs (ASA I-II)'),
      ul(li('Acepromazine 0.01-0.05 mg/kg IM + Hydromorphone 0.1 mg/kg IM'),
         li('Dexmedetomidine 2-5 µg/kg IM + Methadone 0.3 mg/kg IM'),
         li('Midazolam 0.2 mg/kg IM + Butorphanol 0.2 mg/kg IM (mild sedation)')),
      h3('Healthy Cats (ASA I-II)'),
      ul(li('Dexmedetomidine 10-20 µg/kg IM + Buprenorphine 0.02 mg/kg IM'),
         li('Alfaxalone 1-2 mg/kg IM + Butorphanol 0.2 mg/kg IM'),
         li('Acepromazine 0.05 mg/kg IM + Methadone 0.3 mg/kg IM')),
      h3('High-Risk Patients (ASA III-V)'),
      ul(li('Reduce doses by 25-50%'), li('Avoid acepromazine in hypotensive patients'),
         li('Avoid dexmedetomidine in cardiac patients'), li('Consider opioid-only premedication: Methadone 0.2-0.3 mg/kg IM')),
      h3('Key Considerations'),
      ul(li('Pre-oxygenate for 3-5 minutes before induction'),
         li('Ensure IV access before induction'), li('Monitor HR, RR, SpO₂, temperature'),
         li('Anticholinergics (atropine/glycopyrrolate) not routinely recommended'))
    ),
    content_json_zh: doc(
      h2('麻醉前給藥方案'),
      h3('健康犬（ASA I-II）'),
      ul(li('Acepromazine 0.01-0.05 mg/kg IM + Hydromorphone 0.1 mg/kg IM'),
         li('Dexmedetomidine 2-5 µg/kg IM + Methadone 0.3 mg/kg IM'),
         li('Midazolam 0.2 mg/kg IM + Butorphanol 0.2 mg/kg IM（輕度鎮靜）')),
      h3('健康貓（ASA I-II）'),
      ul(li('Dexmedetomidine 10-20 µg/kg IM + Buprenorphine 0.02 mg/kg IM'),
         li('Alfaxalone 1-2 mg/kg IM + Butorphanol 0.2 mg/kg IM'),
         li('Acepromazine 0.05 mg/kg IM + Methadone 0.3 mg/kg IM')),
      h3('高風險患者（ASA III-V）'),
      ul(li('劑量減少 25-50%'), li('低血壓患者避免使用 acepromazine'),
         li('心臟病患者避免使用 dexmedetomidine'), li('考慮僅使用鴉片類：Methadone 0.2-0.3 mg/kg IM')),
      h3('重要注意事項'),
      ul(li('誘導前預充氧 3-5 分鐘'), li('誘導前確保靜脈通路'),
         li('監測 HR、RR、SpO₂、體溫'), li('抗膽鹼藥（atropine/glycopyrrolate）不建議常規使用'))
    ),
  },
  // 2. 圍手術期止痛
  {
    module_type: 'drug_reference', title: 'Perioperative Analgesic Protocols',
    title_zh: '圍手術期止痛藥物指引', slug: 'analgesic-protocols-perioperative',
    description: 'Multimodal analgesia protocols for the perioperative period in small animals',
    description_zh: '小動物圍手術期多模式止痛方案', department: 'anesthesia',
    tags: ['anesthesia', 'pain', 'surgery'], content_status: 'verified', content_source: 'manual', sort_order: 11,
    metadata: { species: ['canine', 'feline'], approach: 'multimodal' },
    content_json: doc(
      h2('Multimodal Analgesia'),
      h3('Opioids'),
      ul(li('Methadone: 0.2-0.5 mg/kg IV/IM q4-6h (dog & cat)'),
         li('Buprenorphine: 0.01-0.03 mg/kg IV/IM q6-8h (cats preferred)'),
         li('Fentanyl CRI: 2-5 µg/kg/hr IV (intra- and post-operative)')),
      h3('NSAIDs (postoperative only)'),
      ul(li('Meloxicam: Dog 0.2 mg/kg SC/PO day 1, then 0.1 mg/kg PO q24h; Cat 0.05 mg/kg SC single dose'),
         li('Carprofen: Dog 4 mg/kg SC/PO, then 2 mg/kg PO q12h'),
         li('Contraindicated in renal/hepatic disease, hypovolemia, coagulopathy')),
      h3('Local/Regional Techniques'),
      ul(li('Lidocaine splash block: 1-2 mg/kg at incision site'),
         li('Bupivacaine nerve block: 1-2 mg/kg (max 2 mg/kg dog, 1 mg/kg cat)'),
         li('Epidural: Morphine 0.1 mg/kg + Bupivacaine 0.5 mg/kg preservative-free')),
      h3('Adjunctive Agents'),
      ul(li('Ketamine CRI: 2-10 µg/kg/min (NMDA antagonism, wind-up prevention)'),
         li('Lidocaine CRI (dogs only): 25-50 µg/kg/min (systemic anti-inflammatory)'),
         li('Gabapentin: 5-10 mg/kg PO q8-12h (neuropathic pain)'))
    ),
    content_json_zh: doc(
      h2('多模式止痛方案'),
      h3('鴉片類藥物'),
      ul(li('Methadone：0.2-0.5 mg/kg IV/IM 每 4-6 小時（犬貓皆可）'),
         li('Buprenorphine：0.01-0.03 mg/kg IV/IM 每 6-8 小時（貓首選）'),
         li('Fentanyl 持續輸注：2-5 µg/kg/hr IV（術中及術後）')),
      h3('NSAIDs（僅限術後）'),
      ul(li('Meloxicam：犬 0.2 mg/kg SC/PO 第一天，之後 0.1 mg/kg PO 每 24h；貓 0.05 mg/kg SC 單次'),
         li('Carprofen：犬 4 mg/kg SC/PO，之後 2 mg/kg PO 每 12h'),
         li('腎/肝病、低血容量、凝血障礙禁用')),
      h3('局部/區域麻醉技術'),
      ul(li('Lidocaine 傷口浸潤：1-2 mg/kg 於切口處'),
         li('Bupivacaine 神經阻斷：1-2 mg/kg（犬上限 2 mg/kg，貓 1 mg/kg）'),
         li('硬膜外：Morphine 0.1 mg/kg + Bupivacaine 0.5 mg/kg（無防腐劑）')),
      h3('輔助藥物'),
      ul(li('Ketamine 持續輸注：2-10 µg/kg/min（NMDA 拮抗，防止痛覺增敏）'),
         li('Lidocaine 持續輸注（僅限犬）：25-50 µg/kg/min（全身性抗發炎）'),
         li('Gabapentin：5-10 mg/kg PO 每 8-12h（神經性疼痛）'))
    ),
  },
  // 3. 尿液分析判讀
  {
    module_type: 'lab_reference', title: 'Urinalysis Interpretation Guide',
    title_zh: '尿液分析判讀指南', slug: 'urinalysis-interpretation-guide',
    description: 'Comprehensive guide to interpreting canine and feline urinalysis results',
    description_zh: '犬貓尿液分析結果判讀完整指南', department: 'pathology-lab',
    tags: ['laboratory', 'diagnostics', 'urinary'], content_status: 'verified', content_source: 'manual', sort_order: 12,
    metadata: { species: ['canine', 'feline'], test_components: ['physical', 'chemical', 'sediment'] },
    content_json: doc(
      h2('Urinalysis Interpretation'),
      h3('Physical Examination'),
      ul(li('Color: Normal pale yellow to amber; red/brown suggests hematuria or hemoglobinuria'),
         li('Clarity: Normal clear; turbid suggests cells, crystals, or bacteria'),
         li('USG (dog): 1.015-1.045 (concentrated); (cat): 1.035-1.060'),
         li('Isosthenuria (1.008-1.012): Loss of concentrating ability — investigate renal function')),
      h3('Chemical Analysis (Dipstick)'),
      ul(li('pH: Dog 5.5-7.0; Cat 6.0-6.5 (diet-dependent)'),
         li('Protein: Trace acceptable; ≥1+ investigate with UPC ratio'),
         li('Glucose: Negative normal; positive = renal threshold exceeded (>180 mg/dL dog, >280 cat)'),
         li('Ketones: Positive with DKA, starvation, low-carb diets'),
         li('Bilirubin: Small amount normal in concentrated dog urine; any in cat = abnormal')),
      h3('Sediment Examination'),
      ul(li('RBC: 0-5/hpf normal; >5 = hematuria'), li('WBC: 0-5/hpf normal; >5 = pyuria (infection likely)'),
         li('Bacteria: Any on unstained sediment is significant'), li('Casts: Granular/cellular suggest renal tubular disease'),
         li('Crystals: Struvite (alkaline pH), CaOx (acidic pH), ammonium biurate (liver disease)'))
    ),
    content_json_zh: doc(
      h2('尿液分析判讀'),
      h3('物理性檢查'),
      ul(li('顏色：正常淡黃至琥珀色；紅/棕色提示血尿或血紅素尿'),
         li('透明度：正常透明；混濁提示細胞、結晶或細菌'),
         li('比重（犬）：1.015-1.045（濃縮）；（貓）：1.035-1.060'),
         li('等張尿（1.008-1.012）：喪失濃縮能力 — 須進一步評估腎功能')),
      h3('化學分析（試紙）'),
      ul(li('pH：犬 5.5-7.0；貓 6.0-6.5（與飲食相關）'),
         li('蛋白質：微量可接受；≥1+ 需以 UPC 比值進一步評估'),
         li('葡萄糖：正常陰性；陽性 = 超過腎閾值（犬 >180 mg/dL，貓 >280）'),
         li('酮體：DKA、飢餓、低碳水飲食時陽性'),
         li('膽紅素：濃縮犬尿中微量正常；貓出現任何量均為異常')),
      h3('沉渣檢查'),
      ul(li('紅血球：0-5/hpf 正常；>5 = 血尿'), li('白血球：0-5/hpf 正常；>5 = 膿尿（可能感染）'),
         li('細菌：未染色沉渣中出現任何細菌均有意義'), li('管型：顆粒/細胞管型提示腎小管疾病'),
         li('結晶：磷酸銨鎂（鹼性 pH）、草酸鈣（酸性 pH）、尿酸銨（肝病）'))
    ),
  },
  // 4. 凝血功能檢驗
  {
    module_type: 'lab_reference', title: 'Coagulation Panel Reference',
    title_zh: '凝血功能檢驗參考值', slug: 'coagulation-panel-reference',
    description: 'Reference ranges and interpretation for coagulation tests in dogs and cats',
    description_zh: '犬貓凝血功能檢驗正常值與判讀', department: 'pathology-lab',
    tags: ['laboratory', 'hematology', 'diagnostics'], content_status: 'verified', content_source: 'manual', sort_order: 13,
    metadata: { species: ['canine', 'feline'], tests: ['PT', 'aPTT', 'fibrinogen', 'D-dimer', 'platelet'] },
    content_json: doc(
      h2('Coagulation Tests'),
      h3('Primary Hemostasis'),
      ul(li('Platelet count (dog): 175-500 × 10⁹/L; (cat): 175-500 × 10⁹/L'),
         li('BMBT (Buccal Mucosal Bleeding Time): Dog 1.7-4.2 min; Cat 1.0-2.4 min'),
         li('Thrombocytopenia: <100 × 10⁹/L = mild; <50 = moderate; <30 = spontaneous bleeding risk')),
      h3('Secondary Hemostasis'),
      ul(li('PT (Prothrombin Time): Dog 6.2-8.5 sec; Cat 8-13 sec — extrinsic pathway (Factor VII)'),
         li('aPTT (Activated Partial Thromboplastin Time): Dog 8-14 sec; Cat 12-18 sec — intrinsic pathway'),
         li('Fibrinogen: 150-400 mg/dL (both species)'),
         li('ACT (Activated Clotting Time): Dog <120 sec; Cat <75 sec (point-of-care screening)')),
      h3('DIC Indicators'),
      ul(li('D-dimer: >0.5 µg/mL = elevated (fibrinolysis marker)'),
         li('DIC criteria: prolonged PT/aPTT + low fibrinogen + low platelets + elevated D-dimer'),
         li('Schistocytes on blood smear support DIC diagnosis')),
      h3('Common Causes of Coagulopathy'),
      ul(li('Anticoagulant rodenticide: Factor II, VII, IX, X depletion (PT prolonged first)'),
         li('Liver failure: decreased factor synthesis'), li('DIC: consumptive coagulopathy'),
         li('Immune-mediated thrombocytopenia (ITP)'), li('von Willebrand disease (common in Doberman)'))
    ),
    content_json_zh: doc(
      h2('凝血功能檢驗'),
      h3('初級止血'),
      ul(li('血小板（犬）：175-500 × 10⁹/L；（貓）：175-500 × 10⁹/L'),
         li('口腔黏膜出血時間 BMBT：犬 1.7-4.2 分；貓 1.0-2.4 分'),
         li('血小板減少：<100 輕度；<50 中度；<30 有自發性出血風險')),
      h3('次級止血'),
      ul(li('PT 凝血酶原時間：犬 6.2-8.5 秒；貓 8-13 秒 — 外在途徑（Factor VII）'),
         li('aPTT 活化部分凝血活酶時間：犬 8-14 秒；貓 12-18 秒 — 內在途徑'),
         li('纖維蛋白原：150-400 mg/dL（兩物種）'),
         li('ACT 活化凝血時間：犬 <120 秒；貓 <75 秒（即時篩檢）')),
      h3('DIC 指標'),
      ul(li('D-dimer：>0.5 µg/mL = 升高（纖溶指標）'),
         li('DIC 診斷標準：PT/aPTT 延長 + 纖維蛋白原低 + 血小板低 + D-dimer 升高'),
         li('血液抹片中的裂片紅血球支持 DIC 診斷')),
      h3('凝血障礙常見原因'),
      ul(li('抗凝血滅鼠劑：Factor II、VII、IX、X 消耗（PT 先延長）'),
         li('肝衰竭：凝血因子合成減少'), li('DIC：消耗性凝血障礙'),
         li('免疫介導血小板減少症（ITP）'), li('von Willebrand 病（杜賓犬常見）'))
    ),
  },
  // 5. 過敏性休克急診
  {
    module_type: 'emergency_protocol', title: 'Anaphylaxis Emergency Protocol',
    title_zh: '過敏性休克急診處置流程', slug: 'anaphylaxis-emergency-protocol',
    description: 'Emergency management of anaphylaxis and severe allergic reactions in small animals',
    description_zh: '小動物過敏性休克與嚴重過敏反應的急診處置', department: 'emergency',
    tags: ['emergency', 'critical-care'], content_status: 'verified', content_source: 'manual', sort_order: 14,
    metadata: { species: ['canine', 'feline'], severity: 'life-threatening' },
    content_json: doc(
      h2('Anaphylaxis Emergency Management'),
      h3('Recognition'),
      ul(li('Dogs: GI signs predominant (vomiting, diarrhea, hepatic congestion)'),
         li('Cats: respiratory signs predominant (bronchospasm, laryngeal edema)'),
         li('Both: acute collapse, hypotension, urticaria, facial swelling, tachycardia')),
      h3('Immediate Treatment'),
      ol(li('Epinephrine 0.01 mg/kg IV (severe) or 0.01 mg/kg IM (mild-moderate) — REPEAT q5-15min'),
         li('100% O₂ supplementation; intubate if laryngeal edema'),
         li('Aggressive IV crystalloid bolus: 60-90 mL/kg/hr (dog), 40-60 mL/kg/hr (cat)'),
         li('Diphenhydramine 1-2 mg/kg IM (H1 blocker)'),
         li('Famotidine 0.5-1.0 mg/kg IV (H2 blocker)')),
      h3('Refractory Hypotension'),
      ul(li('Epinephrine CRI: 0.05-0.1 µg/kg/min'), li('Vasopressin: 0.5-2.0 mU/kg/min'),
         li('Norepinephrine: 0.1-1.0 µg/kg/min if vasoplegic')),
      h3('Post-stabilization'),
      ul(li('Dexamethasone 0.1-0.2 mg/kg IV (prevents biphasic reaction)'),
         li('Monitor for 12-24 hours (biphasic anaphylaxis risk)'),
         li('Identify and document the allergen trigger'))
    ),
    content_json_zh: doc(
      h2('過敏性休克急診處置'),
      h3('辨識'),
      ul(li('犬：以消化道症狀為主（嘔吐、腹瀉、肝臟鬱血）'),
         li('貓：以呼吸道症狀為主（支氣管痙攣、喉頭水腫）'),
         li('共通：急性虛脫、低血壓、蕁麻疹、顏面腫脹、心搏過速')),
      h3('立即處置'),
      ol(li('Epinephrine 0.01 mg/kg IV（嚴重）或 0.01 mg/kg IM（輕中度）— 每 5-15 分鐘可重複'),
         li('100% 氧氣供應；喉頭水腫時插管'), li('積極靜脈晶體液衝擊：犬 60-90 mL/kg/hr，貓 40-60 mL/kg/hr'),
         li('Diphenhydramine 1-2 mg/kg IM（H1 阻斷劑）'), li('Famotidine 0.5-1.0 mg/kg IV（H2 阻斷劑）')),
      h3('頑固性低血壓'),
      ul(li('Epinephrine 持續輸注：0.05-0.1 µg/kg/min'), li('Vasopressin：0.5-2.0 mU/kg/min'),
         li('Norepinephrine：0.1-1.0 µg/kg/min（血管麻痺型）')),
      h3('穩定後處置'),
      ul(li('Dexamethasone 0.1-0.2 mg/kg IV（預防雙相反應）'),
         li('監測 12-24 小時（雙相過敏性休克風險）'), li('識別並記錄過敏觸發因子'))
    ),
  },
];

async function main() {
  console.log('🔄 開始 seed 擴增模組 Part 1（模組 1-5）...\n');
  let created = 0, skipped = 0, failed = 0;
  for (const mod of MODULES) {
    const { data: existing } = await supabase.from('vt_modules').select('id').eq('slug', mod.slug).limit(1);
    if (existing && existing.length > 0) { console.log(`  ⏭️  ${mod.title_zh} — 已存在`); skipped++; continue; }
    const { error } = await supabase.from('vt_modules').insert(mod);
    if (error) { console.error(`  ❌ ${mod.title_zh}: ${error.message}`); failed++; }
    else { console.log(`  ✅ ${mod.title_zh}`); created++; }
  }
  console.log(`\n📊 結果：✅ ${created} | ⏭️ ${skipped} | ❌ ${failed}\n`);
}
main().catch(console.error);
