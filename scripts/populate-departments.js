/**
 * populate-departments.js
 *
 * 為 343 筆程序填入 department 欄位：
 * - 281 筆有 tags 的程序：用 tag→department 映射計算
 * - 62 筆無 tags 的舊程序：用名稱對照表手動分類（同時補上 tags）
 *
 * 用法：node scripts/populate-departments.js [--dry-run]
 */
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// ========================================
// Tag → Department 映射（與 departments.ts 一致）
// ========================================
const DEPARTMENTS_ORDER = [
  { id: 'emergency', tags: ['emergency', 'critical-care', 'triage', 'transfusion', 'vascular-access', 'fluid-therapy'] },
  { id: 'soft-tissue-surgery', tags: ['surgery', 'reconstructive', 'wound-care', 'head-neck', 'perineal', 'abdominal', 'thoracic'] },
  { id: 'orthopedics', tags: ['orthopedics', 'hip', 'elbow', 'stifle', 'fracture', 'bandage'] },
  { id: 'internal-medicine', tags: ['internal-medicine', 'gastric', 'hepatic', 'hepatobiliary', 'endocrine', 'GI'] },
  { id: 'anesthesia', tags: ['anesthesia', 'sedation', 'pain'] },
  { id: 'imaging', tags: ['ultrasound', 'radiology', 'imaging', 'endoscopy', 'MRI', 'CT'] },
  { id: 'cardio-respiratory', tags: ['cardiology', 'cardiac', 'respiratory'] },
  { id: 'neuro-behavior', tags: ['neurology', 'behavior'] },
  { id: 'ophthalmology', tags: ['ophthalmology'] },
  { id: 'dermatology', tags: ['dermatology', 'otology'] },
  { id: 'pathology-lab', tags: ['laboratory', 'clinical-pathology', 'cytology', 'hematology', 'diagnostics', 'pharmacology', 'toxicology'] },
  { id: 'specialty-other', tags: ['oncology', 'infectious', 'parasitology', 'mycology', 'zoonosis', 'immunology', 'nephrology', 'urology', 'urinary', 'reproduction', 'reproductive', 'rehabilitation', 'nutrition', 'palliative', 'dental'] },
  { id: 'general', tags: ['basic', 'handling', 'monitoring', 'ethics'] },
];

const TAG_TO_DEPT = {};
for (const dept of DEPARTMENTS_ORDER) {
  for (const tag of dept.tags) {
    TAG_TO_DEPT[tag] = dept.id;
  }
}

function getDeptForTags(tags) {
  if (!tags || tags.length === 0) return 'general';
  for (const tag of tags) {
    if (TAG_TO_DEPT[tag]) return TAG_TO_DEPT[tag];
  }
  return 'general';
}

// ========================================
// 62 筆舊程序手動分類（名稱 → department + tags）
// ========================================
const OLD_PROCEDURE_MAP = {
  'proc_001': { dept: 'internal-medicine', tags: ['internal-medicine', 'diagnostics'] },        // Abdominocentesis
  'proc_002': { dept: 'internal-medicine', tags: ['internal-medicine', 'endocrine', 'diagnostics'] }, // ACTH response test
  'proc_003': { dept: 'emergency', tags: ['emergency', 'pharmacology'] },                       // Anaphylaxis
  'proc_004': { dept: 'orthopedics', tags: ['orthopedics', 'diagnostics'] },                    // Arthrocentesis
  'proc_005': { dept: 'soft-tissue-surgery', tags: ['surgery', 'basic'] },                      // Aseptic preparation
  'proc_006': { dept: 'imaging', tags: ['imaging', 'radiology'] },                              // Barium contrast media
  'proc_007': { dept: 'imaging', tags: ['imaging', 'radiology', 'gastric'] },                   // Barium studies GI
  'proc_008': { dept: 'cardio-respiratory', tags: ['cardiology', 'monitoring'] },                // Blood pressure measurement
  'proc_009': { dept: 'pathology-lab', tags: ['laboratory', 'basic'] },                          // Blood sampling
  'proc_010': { dept: 'pathology-lab', tags: ['laboratory', 'hematology'] },                     // Blood smear preparation
  'proc_011': { dept: 'emergency', tags: ['emergency', 'transfusion'] },                         // Blood transfusion
  'proc_012': { dept: 'orthopedics', tags: ['orthopedics', 'diagnostics'] },                     // Bone biopsy
  'proc_013': { dept: 'pathology-lab', tags: ['laboratory', 'hematology', 'diagnostics'] },      // Bone marrow aspiration
  'proc_014': { dept: 'cardio-respiratory', tags: ['respiratory', 'diagnostics'] },               // Bronchoalveolar lavage
  'proc_015': { dept: 'imaging', tags: ['endoscopy', 'respiratory'] },                           // Bronchoscopy
  'proc_016': { dept: 'pathology-lab', tags: ['hematology', 'diagnostics'] },                    // Buccal mucosal bleeding time
  'proc_017': { dept: 'emergency', tags: ['emergency', 'critical-care'] },                       // CPR
  'proc_018': { dept: 'neuro-behavior', tags: ['neurology', 'diagnostics'] },                    // CSF collection
  'proc_019': { dept: 'emergency', tags: ['emergency', 'thoracic'] },                            // Chest drain placement
  'proc_020': { dept: 'pathology-lab', tags: ['hematology', 'diagnostics'] },                    // Coagulation tests
  'proc_021': { dept: 'specialty-other', tags: ['urology', 'diagnostics'] },                     // Cystocentesis
  'proc_022': { dept: 'internal-medicine', tags: ['internal-medicine', 'diagnostics'] },          // Diagnostic peritoneal lavage
  'proc_023': { dept: 'emergency', tags: ['emergency', 'reproduction'] },                        // Dystocia
  'proc_024': { dept: 'cardio-respiratory', tags: ['cardiology', 'imaging'] },                   // Echocardiography
  'proc_025': { dept: 'cardio-respiratory', tags: ['cardiology', 'diagnostics'] },               // Electrocardiography
  'proc_026': { dept: 'anesthesia', tags: ['anesthesia', 'basic'] },                             // Endotracheal intubation
  'proc_027': { dept: 'imaging', tags: ['imaging', 'radiology', 'urinary'] },                    // Excretory urography
  'proc_028': { dept: 'pathology-lab', tags: ['cytology', 'diagnostics'] },                      // Fine needle aspiration
  'proc_029': { dept: 'emergency', tags: ['emergency', 'gastric'] },                             // Gastric lavage
  'proc_030': { dept: 'soft-tissue-surgery', tags: ['surgery', 'gastric', 'endoscopy'] },         // Gastrostomy tube PEG
  'proc_031': { dept: 'emergency', tags: ['emergency', 'vascular-access'] },                     // Intraosseous cannula
  'proc_032': { dept: 'general', tags: ['basic', 'vascular-access'] },                           // IV catheter placement
  'proc_033': { dept: 'imaging', tags: ['imaging', 'radiology', 'urinary'] },                    // IV urography
  'proc_034': { dept: 'imaging', tags: ['imaging', 'radiology'] },                               // Iodinated contrast media
  'proc_035': { dept: 'dermatology', tags: ['otology', 'surgery'] },                             // Myringotomy
  'proc_036': { dept: 'emergency', tags: ['emergency', 'respiratory'] },                          // Nasal oxygen
  'proc_037': { dept: 'internal-medicine', tags: ['internal-medicine', 'nutrition'] },             // Naso-oesophageal tube
  'proc_038': { dept: 'neuro-behavior', tags: ['neurology', 'diagnostics'] },                    // Neurological examination
  'proc_039': { dept: 'soft-tissue-surgery', tags: ['surgery', 'nutrition'] },                    // Oesophagostomy tube
  'proc_040': { dept: 'ophthalmology', tags: ['ophthalmology', 'diagnostics'] },                 // Ophthalmic examination
  'proc_041': { dept: 'orthopedics', tags: ['orthopedics', 'diagnostics'] },                     // Orthopaedic examination
  'proc_042': { dept: 'orthopedics', tags: ['orthopedics', 'hip', 'diagnostics'] },              // Ortolani test
  'proc_043': { dept: 'dermatology', tags: ['otology', 'diagnostics'] },                         // Otoscopy
  'proc_044': { dept: 'emergency', tags: ['emergency', 'cardiology'] },                          // Pericardiocentesis
  'proc_045': { dept: 'pathology-lab', tags: ['hematology', 'diagnostics'] },                    // Platelet count
  'proc_046': { dept: 'specialty-other', tags: ['urology', 'diagnostics'] },                     // Prostatic wash
  'proc_047': { dept: 'internal-medicine', tags: ['nutrition', 'internal-medicine'] },            // Resting energy requirement
  'proc_048': { dept: 'imaging', tags: ['imaging', 'radiology', 'urinary'] },                    // Retrograde urethrography
  'proc_049': { dept: 'imaging', tags: ['endoscopy', 'respiratory'] },                           // Rhinoscopy
  'proc_050': { dept: 'dermatology', tags: ['dermatology', 'diagnostics'] },                     // Skin scrapes
  'proc_051': { dept: 'dermatology', tags: ['otology', 'surgery'] },                             // Surgical exam of ear
  'proc_052': { dept: 'emergency', tags: ['emergency', 'thoracic'] },                            // Thoracocentesis
  'proc_053': { dept: 'cardio-respiratory', tags: ['respiratory', 'diagnostics'] },               // Tracheal wash – endotracheal
  'proc_054': { dept: 'cardio-respiratory', tags: ['respiratory', 'diagnostics'] },               // Tracheal wash – transtracheal
  'proc_055': { dept: 'emergency', tags: ['emergency', 'surgery', 'respiratory'] },               // Tracheostomy tube
  'proc_056': { dept: 'specialty-other', tags: ['urology', 'basic'] },                           // Urethral catheter – female dog
  'proc_057': { dept: 'specialty-other', tags: ['urology', 'basic'] },                           // Urethral catheter – female cat
  'proc_058': { dept: 'specialty-other', tags: ['urology', 'basic'] },                           // Urethral catheter – male dog
  'proc_059': { dept: 'specialty-other', tags: ['urology', 'basic'] },                           // Urethral catheter – male cat
  'proc_060': { dept: 'pathology-lab', tags: ['laboratory', 'urinary', 'diagnostics'] },          // Urinalysis
  'proc_061': { dept: 'specialty-other', tags: ['reproduction', 'diagnostics'] },                 // Vaginoscopy
  'proc_062': { dept: 'pathology-lab', tags: ['laboratory', 'basic'] },                           // Venepuncture
};

// ========================================
// 主邏輯
// ========================================
async function main() {
  const isDryRun = process.argv.includes('--dry-run');
  console.log(`\n=== populate-departments.js ${isDryRun ? '(DRY RUN)' : ''} ===\n`);

  // 1. 取得所有程序
  const { data: procedures, error } = await supabase
    .from('vt_procedures')
    .select('procedure_id, name, tags, department')
    .order('procedure_id');

  if (error) {
    console.error('ERROR fetching procedures:', error.message);
    process.exit(1);
  }

  console.log(`Total procedures: ${procedures.length}`);

  const stats = {};
  const updates = [];

  for (const proc of procedures) {
    let department;
    let newTags = proc.tags;

    // 舊程序（無 tags）→ 用手動對照表
    if (!proc.tags || proc.tags.length === 0) {
      const manual = OLD_PROCEDURE_MAP[proc.procedure_id];
      if (manual) {
        department = manual.dept;
        newTags = manual.tags;
      } else {
        department = 'general';
        newTags = ['basic'];
      }
    } else {
      // 有 tags → 用映射計算
      department = getDeptForTags(proc.tags);
    }

    stats[department] = (stats[department] || 0) + 1;

    updates.push({
      procedure_id: proc.procedure_id,
      name: proc.name,
      department,
      tags: newTags,
      changed: proc.department !== department || !proc.tags || proc.tags.length === 0,
    });
  }

  // 2. 輸出統計
  console.log('\n--- Department Distribution ---');
  const sorted = Object.entries(stats).sort((a, b) => b[1] - a[1]);
  for (const [dept, count] of sorted) {
    console.log(`  ${dept.padEnd(25)} ${count}`);
  }
  console.log(`  ${'TOTAL'.padEnd(25)} ${procedures.length}`);

  const changedCount = updates.filter(u => u.changed).length;
  console.log(`\nChanges needed: ${changedCount}`);

  if (isDryRun) {
    console.log('\n[DRY RUN] No changes written to DB.');
    // 輸出前 10 筆變更
    const changed = updates.filter(u => u.changed).slice(0, 10);
    for (const u of changed) {
      console.log(`  ${u.procedure_id} ${u.name.substring(0, 40).padEnd(42)} → ${u.department} [${u.tags?.join(', ')}]`);
    }
    if (changedCount > 10) console.log(`  ... and ${changedCount - 10} more`);
    return;
  }

  // 3. 批次更新
  console.log('\nUpdating DB...');
  let success = 0;
  let failed = 0;

  for (const u of updates) {
    if (!u.changed) continue;

    const updateData = { department: u.department };
    // 只有原本無 tags 的才補上 tags
    if (OLD_PROCEDURE_MAP[u.procedure_id]) {
      updateData.tags = u.tags;
    }

    const { error: updateError } = await supabase
      .from('vt_procedures')
      .update(updateData)
      .eq('procedure_id', u.procedure_id);

    if (updateError) {
      console.error(`  FAIL ${u.procedure_id}: ${updateError.message}`);
      failed++;
    } else {
      success++;
    }
  }

  console.log(`\n✅ Updated: ${success}  ❌ Failed: ${failed}`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
