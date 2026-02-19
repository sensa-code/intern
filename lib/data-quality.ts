/**
 * 資料品質評估模組 — 標記每個程序的內容來源與驗證狀態
 *
 * 2026-02-19 更新：AI 生成 281 筆程序臨床教學內容（EN+ZH 雙語）
 * - proc_001~062：62 筆原始 BSAVA 程序，已從 RAG 重建內容（needs_review）
 * - proc_063~343：281 筆新增臨床訓練程序，AI 生成內容（needs_review）
 *
 * 狀態說明：
 * - VERIFIED: 內容已人工審核確認正確
 * - NEEDS_REVIEW: 內容來自 RAG 或 AI 生成，尚未人工驗證，顯示並加提示
 * - EMPTY: 程序已建立但內容尚未填充
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

  // proc_063~343: 281 筆新增臨床訓練程序（AI 生成內容）
  ...Object.fromEntries(
    Array.from({ length: 281 }, (_, i) => {
      const id = `proc_${String(i + 63).padStart(3, '0')}`;
      return [id, { status: 'needs_review' as const, source: 'AI_generated' }];
    })
  ),
};

/**
 * 取得程序的資料品質狀態
 * proc_001~062: needs_review（RAG 重建內容）
 * proc_063~343: needs_review（AI 生成內容）
 */
export function getProcedureQuality(procedureId: string): ProcedureQuality {
  return QUALITY_MAP[procedureId] ?? { status: 'empty', source: 'gap_analysis' };
}

/**
 * 內容是否可以安全顯示
 * 2026-02-19: 所有 343 筆程序都有內容（RAG 或 AI 生成），全部可顯示
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
