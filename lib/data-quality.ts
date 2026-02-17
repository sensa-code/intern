/**
 * 資料品質評估模組 — 標記每個程序的內容來源與驗證狀態
 *
 * 2026-02-17 更新：資料庫擴充至 343 筆程序。
 * - proc_001~062：62 筆原始 BSAVA 程序，已從 RAG 重建內容（needs_review）
 * - proc_063~343：281 筆新增臨床訓練程序，內容欄位尚未填充（empty）
 *
 * 狀態說明：
 * - VERIFIED: 內容來自 RAG 且語義匹配度高（>0.6），可完整顯示
 * - NEEDS_REVIEW: 內容來自 RAG 但匹配度較低或區塊較少，顯示並加提示
 * - EMPTY: 程序已建立但內容尚未填充，後續可透過 RAG 填充
 */

export type DataQualityStatus = 'verified' | 'needs_review' | 'corrupted' | 'empty';

export interface ProcedureQuality {
  status: DataQualityStatus;
  /** 內容來源描述 */
  source?: string;
}

/**
 * 每個 proc_id 的品質標記
 *
 * 來源：2026-02-15 RAG 重建結果
 * - 62/62 筆成功從 RAG 取得內容
 * - 平均填充 4.3/8 個內容區塊
 * - 內容來自 ~100 本已完成向量化的獸醫教科書
 */
const QUALITY_MAP: Record<string, ProcedureQuality> = {
  // 所有 62 筆程序都已從 RAG 重建，標記為 needs_review
  // （因為內容為自動語義匹配，尚未人工驗證）
  proc_001: { status: 'needs_review', source: 'RAG' },
  proc_002: { status: 'needs_review', source: 'RAG' },
  proc_003: { status: 'needs_review', source: 'RAG' },
  proc_004: { status: 'needs_review', source: 'RAG' },
  proc_005: { status: 'needs_review', source: 'RAG' },
  proc_006: { status: 'needs_review', source: 'RAG' },
  proc_007: { status: 'needs_review', source: 'RAG' },
  proc_008: { status: 'needs_review', source: 'RAG' },
  proc_009: { status: 'needs_review', source: 'RAG' },
  proc_010: { status: 'needs_review', source: 'RAG' },
  proc_011: { status: 'needs_review', source: 'RAG' },
  proc_012: { status: 'needs_review', source: 'RAG' },
  proc_013: { status: 'needs_review', source: 'RAG' },
  proc_014: { status: 'needs_review', source: 'RAG' },
  proc_015: { status: 'needs_review', source: 'RAG' },
  proc_016: { status: 'needs_review', source: 'RAG' },
  proc_017: { status: 'needs_review', source: 'RAG' },
  proc_018: { status: 'needs_review', source: 'RAG' },
  proc_019: { status: 'needs_review', source: 'RAG' },
  proc_020: { status: 'needs_review', source: 'RAG' },
  proc_021: { status: 'needs_review', source: 'RAG' },
  proc_022: { status: 'needs_review', source: 'RAG' },
  proc_023: { status: 'needs_review', source: 'RAG' },
  proc_024: { status: 'needs_review', source: 'RAG' },
  proc_025: { status: 'needs_review', source: 'RAG' },
  proc_026: { status: 'needs_review', source: 'RAG' },
  proc_027: { status: 'needs_review', source: 'RAG' },
  proc_028: { status: 'needs_review', source: 'RAG' },
  proc_029: { status: 'needs_review', source: 'RAG' },
  proc_030: { status: 'needs_review', source: 'RAG' },
  proc_031: { status: 'needs_review', source: 'RAG' },
  proc_032: { status: 'needs_review', source: 'RAG' },
  proc_033: { status: 'needs_review', source: 'RAG' },
  proc_034: { status: 'needs_review', source: 'RAG' },
  proc_035: { status: 'needs_review', source: 'RAG' },
  proc_036: { status: 'needs_review', source: 'RAG' },
  proc_037: { status: 'needs_review', source: 'RAG' },
  proc_038: { status: 'needs_review', source: 'RAG' },
  proc_039: { status: 'needs_review', source: 'RAG' },
  proc_040: { status: 'needs_review', source: 'RAG' },
  proc_041: { status: 'needs_review', source: 'RAG' },
  proc_042: { status: 'needs_review', source: 'RAG' },
  proc_043: { status: 'needs_review', source: 'RAG' },
  proc_044: { status: 'needs_review', source: 'RAG' },
  proc_045: { status: 'needs_review', source: 'RAG' },
  proc_046: { status: 'needs_review', source: 'RAG' },
  proc_047: { status: 'needs_review', source: 'RAG' },
  proc_048: { status: 'needs_review', source: 'RAG' },
  proc_049: { status: 'needs_review', source: 'RAG' },
  proc_050: { status: 'needs_review', source: 'RAG' },
  proc_051: { status: 'needs_review', source: 'RAG' },
  proc_052: { status: 'needs_review', source: 'RAG' },
  proc_053: { status: 'needs_review', source: 'RAG' },
  proc_054: { status: 'needs_review', source: 'RAG' },
  proc_055: { status: 'needs_review', source: 'RAG' },
  proc_056: { status: 'needs_review', source: 'RAG' },
  proc_057: { status: 'needs_review', source: 'RAG' },
  proc_058: { status: 'needs_review', source: 'RAG' },
  proc_059: { status: 'needs_review', source: 'RAG' },
  proc_060: { status: 'needs_review', source: 'RAG' },
  proc_061: { status: 'needs_review', source: 'RAG' },
  proc_062: { status: 'needs_review', source: 'RAG' },

  // proc_063~343: 281 筆新增臨床訓練程序（尚無內容）
  ...Object.fromEntries(
    Array.from({ length: 281 }, (_, i) => {
      const id = `proc_${String(i + 63).padStart(3, '0')}`;
      return [id, { status: 'empty' as const, source: 'gap_analysis' }];
    })
  ),
};

/**
 * 取得程序的資料品質狀態
 * 已知的 proc_001~062 回傳 needs_review（有 RAG 內容）
 * 其餘回傳 empty（尚無內容）
 */
export function getProcedureQuality(procedureId: string): ProcedureQuality {
  return QUALITY_MAP[procedureId] ?? { status: 'empty', source: 'gap_analysis' };
}

/**
 * 內容是否可以安全顯示
 * 2026-02-15: 所有程序都已從 RAG 重建，全部可顯示
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
