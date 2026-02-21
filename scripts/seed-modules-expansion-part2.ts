/**
 * Phase B 內容擴增 — Part 2（模組 6-10）
 * 癲癇重積、鑑別診斷 PU/PD、鑑別診斷急性腹症、傷口閉合、DKA 案例
 *
 * 用法: npx tsx scripts/seed-modules-expansion-part2.ts
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
if (!supabaseUrl || !supabaseKey) { console.error('❌ 缺少環境變數'); process.exit(1); }
const supabase = createClient(supabaseUrl, supabaseKey);

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
  // 6. 癲癇重積狀態
  {
    module_type: 'emergency_protocol', title: 'Status Epilepticus Emergency Protocol',
    title_zh: '癲癇重積狀態處置流程', slug: 'seizure-status-epilepticus',
    description: 'Emergency protocol for status epilepticus and cluster seizures in dogs and cats',
    description_zh: '犬貓癲癇重積狀態與叢集性癲癇的急診處置', department: 'neuro-behavior',
    tags: ['emergency', 'neurology'], content_status: 'verified', content_source: 'manual', sort_order: 15,
    metadata: { species: ['canine', 'feline'] },
    content_json: doc(
      h2('Status Epilepticus Management'),
      p(bold('Definition:'), text(' Continuous seizure >5 min or ≥2 seizures without regaining consciousness')),
      h3('First-line (0-5 min)'),
      ol(li('Diazepam 0.5-1.0 mg/kg IV (dog) / 0.5 mg/kg IV (cat) — may repeat x2'),
         li('If no IV: Midazolam 0.2-0.5 mg/kg IM/IN (faster IM absorption than diazepam)'),
         li('Rectal diazepam 1-2 mg/kg if no IV/IM access (owner first-aid)')),
      h3('Second-line (5-20 min, benzodiazepine-refractory)'),
      ol(li('Levetiracetam 30-60 mg/kg IV over 5 min (safest second-line)'),
         li('Phenobarbital 2-4 mg/kg IV slow over 15 min (cumulative max 24 mg/kg)'),
         li('Monitor respiratory depression with phenobarbital')),
      h3('Third-line (refractory SE >30 min)'),
      ul(li('Propofol 1-6 mg/kg IV bolus, then 0.1-0.6 mg/kg/min CRI'),
         li('Ketamine 5 mg/kg IV bolus, then 5 mg/kg/hr CRI (NMDA antagonist)'),
         li('Requires intubation and mechanical ventilation support')),
      h3('Supportive Care'),
      ul(li('Supplemental O₂, intubate if prolonged'), li('Monitor temperature — active cooling if >40°C (104°F)'),
         li('IV dextrose: 0.5-1.0 mL/kg of 50% dextrose diluted 1:4 if hypoglycemia suspected'),
         li('Blood glucose, electrolytes (Ca²⁺, Na⁺), NH₃ — identify treatable causes'))
    ),
    content_json_zh: doc(
      h2('癲癇重積狀態處置'),
      p(bold('定義：'), text('持續發作 >5 分鐘，或 ≥2 次發作中間未恢復意識')),
      h3('第一線（0-5 分鐘）'),
      ol(li('Diazepam 犬 0.5-1.0 mg/kg IV / 貓 0.5 mg/kg IV — 可重複 2 次'),
         li('無靜脈通路時：Midazolam 0.2-0.5 mg/kg IM/IN（IM 吸收比 diazepam 快）'),
         li('直腸 diazepam 1-2 mg/kg（無 IV/IM 通路時的飼主急救用）')),
      h3('第二線（5-20 分鐘，苯二氮平類無效）'),
      ol(li('Levetiracetam 30-60 mg/kg IV 5 分鐘內給予（最安全的第二線）'),
         li('Phenobarbital 2-4 mg/kg IV 緩慢 15 分鐘內給予（累積最大 24 mg/kg）'),
         li('Phenobarbital 需監測呼吸抑制')),
      h3('第三線（頑固性 SE >30 分鐘）'),
      ul(li('Propofol 1-6 mg/kg IV 推注，然後 0.1-0.6 mg/kg/min 持續輸注'),
         li('Ketamine 5 mg/kg IV 推注，然後 5 mg/kg/hr 持續輸注（NMDA 拮抗劑）'),
         li('需要插管和呼吸器支持')),
      h3('支持性照護'),
      ul(li('補充氧氣，長時間發作需插管'), li('監測體溫 — >40°C 時主動降溫'),
         li('靜脈葡萄糖：0.5-1.0 mL/kg 50% 葡萄糖 1:4 稀釋（懷疑低血糖時）'),
         li('血糖、電解質（Ca²⁺、Na⁺）、血氨 — 找出可治療的原因'))
    ),
  },
  // 7. 鑑別診斷：多尿多渴
  {
    module_type: 'differential_diagnosis', title: 'Differential Diagnosis: Polyuria/Polydipsia',
    title_zh: '鑑別診斷：多尿多渴', slug: 'ddx-polyuria-polydipsia',
    description: 'Systematic approach to PU/PD differential diagnosis in dogs and cats',
    description_zh: '犬貓多尿多渴的系統性鑑別診斷', department: 'internal-medicine',
    tags: ['internal-medicine', 'diagnostics', 'endocrine'], content_status: 'verified', content_source: 'manual', sort_order: 16,
    metadata: { species: ['canine', 'feline'], presentation: 'PU/PD' },
    content_json: doc(
      h2('PU/PD Differential Diagnosis'),
      p(bold('Definition:'), text(' Water intake >100 mL/kg/day (dog) or >45 mL/kg/day (cat); Urine output >50 mL/kg/day')),
      h3('Endocrine Causes'),
      ul(li('Diabetes mellitus — glucosuria, hyperglycemia'), li('Hyperadrenocorticism (Cushing\'s) — dogs; rare in cats'),
         li('Hyperthyroidism — cats primarily'), li('Diabetes insipidus (central or nephrogenic) — very rare'),
         li('Hypoadrenocorticism (Addison\'s) — Na/K ratio <27')),
      h3('Renal Causes'),
      ul(li('Chronic kidney disease (CKD) — most common in older cats'),
         li('Pyelonephritis'), li('Hypercalcemic nephropathy'), li('Post-obstructive diuresis')),
      h3('Other'),
      ul(li('Pyometra (intact female)'), li('Hepatic insufficiency'), li('Hypercalcemia (lymphoma, anal sac adenocarcinoma)'),
         li('Psychogenic polydipsia'), li('Drugs: corticosteroids, phenobarbital, diuretics')),
      h3('Diagnostic Workup'),
      ol(li('CBC, chemistry (BUN, Crea, glucose, Ca²⁺, ALP, ALT), electrolytes'),
         li('Urinalysis with USG (isosthenuria vs glucosuria vs pyuria)'),
         li('T4 (cats >6 years)'), li('UCCR or LDDS if Cushing\'s suspected'),
         li('Abdominal ultrasound: kidneys, adrenals, uterus'),
         li('Water deprivation test ONLY after ruling out CKD and metabolic causes'))
    ),
    content_json_zh: doc(
      h2('多尿多渴鑑別診斷'),
      p(bold('定義：'), text('飲水量 >100 mL/kg/day（犬）或 >45 mL/kg/day（貓）；尿量 >50 mL/kg/day')),
      h3('內分泌原因'),
      ul(li('糖尿病 — 尿糖、高血糖'), li('腎上腺皮質功能亢進（庫欣氏症）— 犬；貓罕見'),
         li('甲狀腺功能亢進 — 主要發生在貓'), li('尿崩症（中樞型或腎源型）— 非常罕見'),
         li('腎上腺皮質功能低下（Addison 病）— Na/K 比值 <27')),
      h3('腎臟原因'),
      ul(li('慢性腎病（CKD）— 老年貓最常見'), li('腎盂腎炎'),
         li('高血鈣性腎病'), li('阻塞後利尿')),
      h3('其他'),
      ul(li('子宮蓄膿（未結紮母犬）'), li('肝功能不全'), li('高血鈣（淋巴瘤、肛門囊腺癌）'),
         li('心因性多飲'), li('藥物：皮質類固醇、phenobarbital、利尿劑')),
      h3('診斷步驟'),
      ol(li('CBC、生化（BUN、Crea、血糖、Ca²⁺、ALP、ALT）、電解質'),
         li('尿液分析含比重（等張尿 vs 尿糖 vs 膿尿）'), li('T4（>6 歲貓）'),
         li('UCCR 或 LDDS（懷疑庫欣氏症時）'), li('腹部超音波：腎臟、腎上腺、子宮'),
         li('禁水試驗僅在排除 CKD 和代謝原因後進行'))
    ),
  },
  // 8. 鑑別診斷：急性腹症
  {
    module_type: 'differential_diagnosis', title: 'Differential Diagnosis: Acute Abdomen in Dogs',
    title_zh: '鑑別診斷：犬急性腹症', slug: 'ddx-acute-abdomen-dogs',
    description: 'Emergency differential diagnosis approach to acute abdomen in dogs',
    description_zh: '犬急性腹症的急診鑑別診斷方法', department: 'emergency',
    tags: ['emergency', 'surgery', 'GI'], content_status: 'verified', content_source: 'manual', sort_order: 17,
    metadata: { species: ['canine'], urgency: 'surgical emergency' },
    content_json: doc(
      h2('Acute Abdomen: Emergency Differentials'),
      h3('Surgical Emergencies'),
      ul(li('GDV (Gastric Dilatation-Volvulus)'), li('Splenic torsion / rupture (hemangiosarcoma)'),
         li('Intestinal foreign body with obstruction / perforation'), li('Mesenteric volvulus'),
         li('Septic peritonitis (ruptured viscus)'), li('Uterine rupture / pyometra with rupture'),
         li('Urinary bladder rupture (uroabdomen)')),
      h3('Medical Causes'),
      ul(li('Acute pancreatitis'), li('Acute hepatitis / hepatic abscess'), li('Acute kidney injury'),
         li('Peritonitis (bile, urine, blood)'), li('Hemoabdomen (non-surgical: coagulopathy, anaphylaxis)')),
      h3('Triage Assessment'),
      ol(li('Vitals: HR, RR, BP, temperature, mucous membranes, CRT'),
         li('AFAST ultrasound: free fluid? Target organ identification'),
         li('Abdominocentesis if fluid detected: cytology, lactate, bilirubin, creatinine comparison'),
         li('Abdominal radiographs: free gas (perforation), dilation patterns, mass effect'),
         li('Blood work: PCV/TS, lactate, glucose, electrolytes, venous blood gas')),
      h3('Decision: Surgery vs Medical'),
      ul(li('Surgery: free gas, septic effusion, GDV, hemoabdomen with hemodynamic instability'),
         li('Medical first: pancreatitis, non-septic effusion, stable hemoabdomen'),
         li('Serial monitoring: repeat AFAST, lactate trending'))
    ),
    content_json_zh: doc(
      h2('急性腹症：急診鑑別診斷'),
      h3('外科急症'),
      ul(li('GDV 胃擴張扭轉'), li('脾扭轉/破裂（血管肉瘤）'),
         li('腸道異物合併阻塞/穿孔'), li('腸繫膜扭轉'),
         li('敗血性腹膜炎（臟器破裂）'), li('子宮破裂/子宮蓄膿破裂'), li('膀胱破裂（尿腹）')),
      h3('內科原因'),
      ul(li('急性胰腺炎'), li('急性肝炎/肝膿瘍'), li('急性腎損傷'),
         li('腹膜炎（膽汁、尿液、血液）'), li('血腹（非手術性：凝血障礙、過敏性休克）')),
      h3('檢傷評估'),
      ol(li('生命徵象：HR、RR、BP、體溫、黏膜、CRT'),
         li('AFAST 超音波：有無游離液體？目標器官辨識'),
         li('偵測到液體時腹腔穿刺：細胞學、乳酸、膽紅素、肌酐酸比較'),
         li('腹部 X 光：游離氣體（穿孔）、擴張模式、腫塊效應'),
         li('血液檢驗：PCV/TS、乳酸、血糖、電解質、靜脈血氣')),
      h3('手術 vs 內科決策'),
      ul(li('手術：游離氣體、敗血性滲出液、GDV、血流動力學不穩定的血腹'),
         li('先內科：胰腺炎、非敗血性滲出液、穩定血腹'),
         li('連續監測：重複 AFAST、乳酸趨勢'))
    ),
  },
  // 9. 傷口閉合技術
  {
    module_type: 'surgical_technique', title: 'Wound Closure Techniques',
    title_zh: '傷口閉合技術概論', slug: 'wound-closure-techniques',
    description: 'Overview of wound closure methods and suture selection in veterinary surgery',
    description_zh: '獸醫外科傷口閉合方式與縫線選擇概論', department: 'soft-tissue-surgery',
    tags: ['surgery', 'wound-care'], content_status: 'verified', content_source: 'manual', sort_order: 18,
    metadata: { species: ['canine', 'feline'] },
    content_json: doc(
      h2('Wound Closure Techniques'),
      h3('Primary Closure (First Intention)'),
      ul(li('Clean, fresh wounds <6-8 hours old'), li('Minimal contamination, good blood supply'),
         li('Skin apposition with appropriate suture pattern')),
      h3('Delayed Primary Closure'),
      ul(li('Contaminated wounds managed open for 3-5 days'), li('Close after granulation tissue forms'),
         li('Debride, lavage, and verify no infection before closure')),
      h3('Common Suture Patterns'),
      ul(li('Simple interrupted: versatile, good for most skin closures'),
         li('Simple continuous: faster, good for long incisions; risk of complete dehiscence if breaks'),
         li('Cruciate (cross-mattress): good tension distribution, wound eversion'),
         li('Subcuticular (intradermal): cosmetic, no skin suture removal needed')),
      h3('Suture Material Selection'),
      ul(li('Monofilament absorbable (Poliglecaprone/Monocryl): subcutaneous, 90-120 day absorption'),
         li('Braided absorbable (Polyglactin/Vicryl): ligatures, 56-70 day absorption'),
         li('Monofilament non-absorbable (Nylon): skin, 10-14 day removal'),
         li('Size: 3-0 to 4-0 for skin; 2-0 to 3-0 for fascia/linea alba')),
      h3('Staples and Tissue Adhesive'),
      ul(li('Skin staples: rapid closure, minimal tissue reaction'), li('Tissue adhesive (cyanoacrylate): small clean wounds, no tension'))
    ),
    content_json_zh: doc(
      h2('傷口閉合技術'),
      h3('一期閉合（初級癒合）'),
      ul(li('乾淨、新鮮傷口 <6-8 小時'), li('汙染最少、血液供應良好'), li('以適當縫合方式對合皮膚')),
      h3('延遲一期閉合'),
      ul(li('汙染傷口開放處理 3-5 天'), li('肉芽組織形成後再閉合'), li('清創、沖洗並確認無感染後再閉合')),
      h3('常用縫合方式'),
      ul(li('簡單間斷縫合：用途廣泛，適用於大多數皮膚閉合'),
         li('簡單連續縫合：較快，適合長切口；斷裂時有完全裂開風險'),
         li('十字交叉褥式縫合：張力分佈佳，傷口外翻'),
         li('皮下（皮內）縫合：美觀，不需拆除皮膚縫線')),
      h3('縫線材料選擇'),
      ul(li('單股可吸收（Poliglecaprone/Monocryl）：皮下，90-120 天吸收'),
         li('編織可吸收（Polyglactin/Vicryl）：結紮，56-70 天吸收'),
         li('單股不可吸收（Nylon）：皮膚，10-14 天拆除'),
         li('粗細：皮膚 3-0 至 4-0；筋膜/白線 2-0 至 3-0')),
      h3('釘合器與組織膠'),
      ul(li('皮膚釘合器：快速閉合，組織反應小'), li('組織膠（氰基丙烯酸酯）：小型乾淨傷口、無張力'))
    ),
  },
  // 10. 臨床案例：DKA
  {
    module_type: 'case_study', title: 'Clinical Case: Diabetic Ketoacidosis (DKA)',
    title_zh: '臨床案例：糖尿病酮酸中毒', slug: 'case-diabetic-ketoacidosis',
    description: 'Case study of DKA management in a dog with concurrent pancreatitis',
    description_zh: '犬糖尿病酮酸中毒合併胰腺炎的案例研究', department: 'internal-medicine',
    tags: ['internal-medicine', 'endocrine', 'emergency'], content_status: 'verified', content_source: 'manual', sort_order: 19,
    metadata: { species: ['canine'], diagnosis: 'DKA', comorbidity: 'pancreatitis' },
    content_json: doc(
      h2('Case: DKA in a 9-year-old Miniature Schnauzer'),
      h3('Presentation'),
      ul(li('9y FS Miniature Schnauzer, 7.2 kg'), li('3-day history: anorexia, vomiting, progressive lethargy'),
         li('PU/PD for past 2 weeks'), li('Physical exam: 8% dehydrated, weak, Kussmaul breathing, ketone odor on breath')),
      h3('Initial Diagnostics'),
      ul(li('Glucose: 485 mg/dL (severely hyperglycemic)'), li('Blood gas: pH 7.12, HCO₃⁻ 8 mEq/L (severe metabolic acidosis)'),
         li('Na⁺ 138, K⁺ 5.8 (falsely elevated — shifts with acidosis, total body K⁺ depleted)'),
         li('BUN 45, Crea 2.1 (prerenal azotemia from dehydration)'),
         li('cPL: strongly positive (concurrent pancreatitis)'), li('Urinalysis: USG 1.040, 4+ glucose, 3+ ketones, active sediment')),
      h3('Treatment Protocol'),
      ol(li('IV 0.9% NaCl at 2x maintenance + deficit replacement over 24h'),
         li('Regular insulin CRI: 0.05 U/kg/hr (start AFTER 2h fluids + K⁺ correction)'),
         li('KCl supplementation: 40 mEq/L initially (adjust based on serial K⁺ q4-6h)'),
         li('Phosphate supplementation if PO₄ <1.5 mg/dL (risk of hemolytic anemia)'),
         li('Anti-emetics: maropitant 1 mg/kg IV q24h'), li('Analgesia for pancreatitis: methadone 0.2 mg/kg IV q4h')),
      h3('Monitoring & Outcome'),
      ul(li('Blood glucose q1-2h initially; target decrease 50-75 mg/dL/hr'),
         li('Switch to 5% dextrose + insulin CRI when glucose <250 mg/dL'),
         li('Transition to SC insulin (Caninsulin 0.25 U/kg BID) when eating and ketones resolved'),
         li('Discharged day 4: glucose 180-250 mg/dL, eating well, no ketones'))
    ),
    content_json_zh: doc(
      h2('案例：9 歲迷你雪納瑞犬的 DKA'),
      h3('就診情況'),
      ul(li('9 歲已結紮母犬迷你雪納瑞，7.2 kg'), li('3 天病史：食慾廢絕、嘔吐、進行性嗜睡'),
         li('過去 2 週多尿多渴'), li('理學檢查：8% 脫水、虛弱、Kussmaul 呼吸、口氣有酮味')),
      h3('初步診斷'),
      ul(li('血糖：485 mg/dL（嚴重高血糖）'), li('血氣：pH 7.12，HCO₃⁻ 8 mEq/L（嚴重代謝性酸中毒）'),
         li('Na⁺ 138，K⁺ 5.8（假性升高 — 酸中毒導致細胞外移，全身 K⁺ 實際耗竭）'),
         li('BUN 45，Crea 2.1（脫水導致腎前性氮血症）'),
         li('cPL：強陽性（合併胰腺炎）'), li('尿液分析：USG 1.040，4+ 糖，3+ 酮，沉渣活化')),
      h3('治療方案'),
      ol(li('0.9% NaCl 靜脈輸液：2 倍維持量 + 24 小時內補充缺液量'),
         li('Regular insulin 持續輸注：0.05 U/kg/hr（輸液 2 小時 + K⁺ 校正後才開始）'),
         li('KCl 補充：初始 40 mEq/L（依每 4-6h 連續 K⁺ 調整）'),
         li('磷酸鹽補充：PO₄ <1.5 mg/dL 時（溶血性貧血風險）'),
         li('止吐：maropitant 1 mg/kg IV 每 24h'), li('胰腺炎止痛：methadone 0.2 mg/kg IV 每 4h')),
      h3('監測與結果'),
      ul(li('初期每 1-2h 監測血糖；目標下降速率 50-75 mg/dL/hr'),
         li('血糖 <250 mg/dL 時轉換為 5% 葡萄糖 + insulin 持續輸注'),
         li('開始進食且酮體消失後轉為皮下 insulin（Caninsulin 0.25 U/kg BID）'),
         li('第 4 天出院：血糖 180-250 mg/dL，食慾恢復，無酮體'))
    ),
  },
];

async function main() {
  console.log('🔄 開始 seed 擴增模組 Part 2（模組 6-10）...\n');
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
