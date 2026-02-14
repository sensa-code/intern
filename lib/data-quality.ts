/**
 * 資料品質評估模組 — 標記每個程序的內容驗證狀態
 *
 * 根據 OCR 分析結果，62 筆程序中只有 2 筆內容正確、3 筆需審查、
 * 5 筆為空、其餘 52 筆內容錯位。此模組用於前端分流：
 * - VERIFIED: 內容已驗證正確，完整顯示
 * - NEEDS_REVIEW: 內容可能有格式瑕疵但大致正確，顯示並加提示
 * - CORRUPTED: 內容屬於其他程序，不顯示（改為佔位提示）
 * - EMPTY: 無內容，顯示佔位提示
 */

export type DataQualityStatus = 'verified' | 'needs_review' | 'corrupted' | 'empty';

export interface ProcedureQuality {
  status: DataQualityStatus;
  /** 如果 status 是 corrupted，描述實際包含的內容 */
  actualContent?: string;
}

/**
 * 每個 proc_id 的人工審核品質標記
 *
 * 來源：2026-02-14 完整 62 筆逐一比對分析
 * - CORRECT (2 筆): 內容與程序名稱匹配
 * - SHIFTED (40 筆): 內容完全屬於其他程序
 * - MERGED (16 筆): 混合了 2-3 個程序的內容
 * - EMPTY (5 筆): 完全無內容
 */
const QUALITY_MAP: Record<string, ProcedureQuality> = {
  // ✅ VERIFIED — 內容正確
  proc_004: { status: 'verified' },  // Arthrocentesis
  proc_005: { status: 'verified' },  // Aseptic preparation

  // 🟡 NEEDS_REVIEW — 大致正確但有格式瑕疵
  proc_006: { status: 'needs_review' }, // Barium contrast media
  proc_007: { status: 'needs_review' }, // Barium studies of the GI tract
  proc_025: { status: 'needs_review' }, // Electrocardiography (actually Cardiorespiratory exam content, partially relevant)

  // ⛔ EMPTY — 完全無內容
  proc_023: { status: 'empty' },  // Dystocia
  proc_024: { status: 'empty' },  // Echocardiography
  proc_054: { status: 'empty' },  // Tracheal wash – transtracheal
  proc_055: { status: 'empty' },  // Tracheostomy tube placement
  proc_060: { status: 'empty' },  // Urinalysis

  // ⛔ CORRUPTED — 內容屬於其他程序（以下全部為 corrupted）
  proc_001: { status: 'corrupted', actualContent: 'Abdominocentesis + ACTH response test 混合' },
  proc_002: { status: 'corrupted', actualContent: 'ACTH response test + Anaphylaxis 混合' },
  proc_003: { status: 'corrupted', actualContent: 'Arthrocentesis 內容' },
  proc_008: { status: 'corrupted', actualContent: 'Barium studies GI tract 內容' },
  proc_009: { status: 'corrupted', actualContent: 'Blood pressure measurement 內容' },
  proc_010: { status: 'corrupted', actualContent: 'Blood sampling arterial 內容' },
  proc_011: { status: 'corrupted', actualContent: 'Blood sampling venous 內容' },
  proc_012: { status: 'corrupted', actualContent: 'Blood smear preparation 內容' },
  proc_013: { status: 'corrupted', actualContent: 'Blood smear preparation 內容' },
  proc_014: { status: 'corrupted', actualContent: 'Blood transfusion - blood collection 內容' },
  proc_015: { status: 'corrupted', actualContent: 'Blood transfusion - cross-matching 內容' },
  proc_016: { status: 'corrupted', actualContent: 'Blood transfusion - cross-matching 內容' },
  proc_017: { status: 'corrupted', actualContent: 'Blood transfusion - typing 內容' },
  proc_018: { status: 'corrupted', actualContent: 'Bone biopsy 內容' },
  proc_019: { status: 'corrupted', actualContent: 'Bronchoalveolar lavage 內容' },
  proc_020: { status: 'corrupted', actualContent: 'Bronchoscopy 內容' },
  proc_021: { status: 'corrupted', actualContent: 'Buccal mucosal bleeding time 內容' },
  proc_022: { status: 'corrupted', actualContent: 'CPR 內容' },
  proc_026: { status: 'corrupted', actualContent: 'Cast application 內容' },
  proc_027: { status: 'corrupted', actualContent: 'Cast application 內容' },
  proc_028: { status: 'corrupted', actualContent: 'CSF collection - cerebellomedullary 內容' },
  proc_029: { status: 'corrupted', actualContent: 'CSF collection - lumbar 內容' },
  proc_030: { status: 'corrupted', actualContent: 'Cranial draw test 內容' },
  proc_031: { status: 'corrupted', actualContent: 'Cranial draw test + Cystocentesis 混合' },
  proc_032: { status: 'corrupted', actualContent: 'Cystocentesis + DST 混合' },
  proc_033: { status: 'corrupted', actualContent: 'DST high dose + DPL 混合' },
  proc_034: { status: 'corrupted', actualContent: 'Diagnostic peritoneal lavage 內容' },
  proc_035: { status: 'corrupted', actualContent: 'Ehmer sling 內容' },
  proc_036: { status: 'corrupted', actualContent: 'Elbow luxation closed reduction 內容' },
  proc_037: { status: 'corrupted', actualContent: 'Elbow luxation closed reduction 內容' },
  proc_038: { status: 'corrupted', actualContent: 'Electrocardiography 內容' },
  proc_039: { status: 'corrupted', actualContent: 'Endotracheal wash 內容' },
  proc_040: { status: 'corrupted', actualContent: 'FNA + Endotracheal wash 混合' },
  proc_041: { status: 'corrupted', actualContent: 'Gastric decompression 內容' },
  proc_042: { status: 'corrupted', actualContent: 'In-saline agglutination + Hip luxation 混合' },
  proc_043: { status: 'corrupted', actualContent: 'In-saline agglutination + Hip luxation 混合' },
  proc_044: { status: 'corrupted', actualContent: 'Intraosseous cannula 內容' },
  proc_045: { status: 'corrupted', actualContent: 'Intraosseous cannula + IV catheter 混合' },
  proc_046: { status: 'corrupted', actualContent: 'IV catheter - peripheral veins 內容' },
  proc_047: { status: 'corrupted', actualContent: 'IV catheter - jugular Seldinger 內容' },
  proc_048: { status: 'corrupted', actualContent: 'IV catheter - jugular Seldinger 內容' },
  proc_049: { status: 'corrupted', actualContent: 'Intravenous urography 內容' },
  proc_050: { status: 'corrupted', actualContent: 'Iodinated contrast media 內容' },
  proc_051: { status: 'corrupted', actualContent: 'Iodinated contrast media 內容' },
  proc_052: { status: 'corrupted', actualContent: 'Nasal oxygen administration 內容' },
  proc_053: { status: 'corrupted', actualContent: 'Naso-oesophageal tube placement 內容' },
  proc_056: { status: 'corrupted', actualContent: 'Oesophagostomy tube placement 內容' },
  proc_057: { status: 'corrupted', actualContent: 'Oesophagostomy tube placement 內容' },
  proc_058: { status: 'corrupted', actualContent: 'Oesophagostomy tube placement 內容' },
  proc_059: { status: 'corrupted', actualContent: 'Ophthalmic examination 內容' },
  proc_061: { status: 'corrupted', actualContent: 'Ortolani test + Otoscopy 混合' },
  proc_062: { status: 'corrupted', actualContent: 'Otoscopy + Pericardiocentesis 混合' },
};

/**
 * 取得程序的資料品質狀態
 * 預設為 corrupted（未知的 proc_id 不信任）
 */
export function getProcedureQuality(procedureId: string): ProcedureQuality {
  return QUALITY_MAP[procedureId] ?? { status: 'corrupted' };
}

/**
 * 內容是否可以安全顯示
 */
export function isContentSafeToShow(procedureId: string): boolean {
  const quality = getProcedureQuality(procedureId);
  return quality.status === 'verified' || quality.status === 'needs_review';
}

/**
 * 統計資料品質摘要
 */
export function getQualitySummary(): {
  verified: number;
  needsReview: number;
  corrupted: number;
  empty: number;
  total: number;
} {
  const entries = Object.values(QUALITY_MAP);
  return {
    verified: entries.filter(e => e.status === 'verified').length,
    needsReview: entries.filter(e => e.status === 'needs_review').length,
    corrupted: entries.filter(e => e.status === 'corrupted').length,
    empty: entries.filter(e => e.status === 'empty').length,
    total: entries.length,
  };
}
