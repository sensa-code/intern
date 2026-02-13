/**
 * OCR 文字清理工具 — 用於 BSAVA 臨床程序資料
 *
 * procedures_complete.json 的資料從 PDF OCR 提取，包含以下雜訊：
 * - "Procedures in Small Animal Practice N" 頁腳
 * - fi/fl 連字斷裂（"fl uid" → "fluid"）
 * - 相鄰程序的內容滲漏（content bleed）
 *
 * 注意：不移除散落的單字母 A-Z，因為會破壞醫學內容如 "21 G"（針頭規格）、"pH" 等。
 */

// WARNING: 只匯入精簡版 procedures.json（~15KB），
// 不要匯入 procedures_complete.json（>200KB）
import proceduresData from '@/data/procedures.json';

/** 所有程序名稱，依長度降序排列，用於 content-bleed 偵測 */
const PROCEDURE_NAMES: string[] = (proceduresData as Array<{ name: string }>)
  .map(p => p.name)
  .filter(n => n.length > 8)
  .sort((a, b) => b.length - a.length);

/**
 * 移除 "Procedures in Small Animal Practice N" 頁腳
 */
function removeFooters(text: string): string {
  return text.replace(/Procedures in Small Animal Practice\s+\d{1,3}/g, '');
}

/**
 * 修復常見的 OCR 連字斷裂
 * 只修復已確認的安全模式，避免誤改有效文字
 */
function fixLigatures(text: string): string {
  return text
    // fl 連字
    .replace(/\bfl uid/g, 'fluid')
    .replace(/\bfl ow/g, 'flow')
    .replace(/\bfl ap/g, 'flap')
    .replace(/\bfl ush/g, 'flush')
    .replace(/\bfl exed/g, 'flexed')
    .replace(/\bfl exion/g, 'flexion')
    .replace(/\bfl ex\b/g, 'flex')
    .replace(/\bfl at\b/g, 'flat')
    // fi 連字
    .replace(/\bfi ndings/g, 'findings')
    .replace(/\bfi rst/g, 'first')
    .replace(/\bfi ne\b/g, 'fine')
    .replace(/\bfi eld/g, 'field')
    .replace(/\bfi lm/g, 'film')
    .replace(/\bfi ll/g, 'fill')
    .replace(/\bfi brin/g, 'fibrin')
    .replace(/\bfi bula/g, 'fibula')
    .replace(/\bfi xed/g, 'fixed')
    // fi 連字（複合詞中間）
    .replace(/\bconfi rm/g, 'confirm')
    .replace(/\bidentifi /g, 'identifi')
    .replace(/\bsignifi /g, 'signifi')
    .replace(/\bsuffi cient/g, 'sufficient')
    .replace(/\binsuffi cient/g, 'insufficient')
    .replace(/\bspecifi c/g, 'specific');
}

/**
 * 截斷從相鄰程序滲漏過來的內容
 *
 * 策略：如果另一個程序的名稱出現在文字的後 40%（positionRatio >= 0.6），
 * 則認定為內容滲漏並在該處截斷。
 *
 * 經實測 55 個滲漏案例驗證：
 * - 41 個合法交叉引用出現在前 60%（不截斷）✅
 * - 54 個滲漏出現在後 40%（截斷）✅
 */
function truncateContentBleed(text: string, currentProcedureName: string): string {
  for (const name of PROCEDURE_NAMES) {
    if (name === currentProcedureName) continue;

    const pos = text.indexOf(name);
    if (pos === -1) continue;

    const positionRatio = pos / text.length;
    if (positionRatio >= 0.6) {
      return text.substring(0, pos).trimEnd();
    }
  }
  return text;
}

/**
 * 完整清理流程：頁腳移除 → 連字修復 → 滲漏截斷 → 空白正規化
 */
export function cleanOcrText(
  text: string | null | undefined,
  currentProcedureName: string
): string {
  if (!text || text.trim().length === 0) return '';

  let cleaned = text;
  cleaned = removeFooters(cleaned);
  cleaned = fixLigatures(cleaned);
  cleaned = truncateContentBleed(cleaned, currentProcedureName);
  // 合併連續空白
  cleaned = cleaned.replace(/\s{2,}/g, ' ').trim();

  return cleaned;
}

/**
 * 從程序的內容欄位中取得摘要（用於列表頁卡片）
 *
 * 優先順序：indications → technique → equipment → procedure_steps → contraindications
 */
export function getProcedureSummary(
  fields: {
    indications?: string | null;
    technique?: string | null;
    equipment?: string | null;
    procedure_steps?: string | null;
    contraindications?: string | null;
  },
  procedureName: string,
  maxLength: number = 150
): string {
  const candidates = [
    fields.indications,
    fields.technique,
    fields.equipment,
    fields.procedure_steps,
    fields.contraindications,
  ];

  for (const raw of candidates) {
    const cleaned = cleanOcrText(raw, procedureName);
    if (cleaned.length > 20) {
      if (cleaned.length <= maxLength) return cleaned;
      const truncated = cleaned.substring(0, maxLength);
      const lastSpace = truncated.lastIndexOf(' ');
      return (lastSpace > maxLength * 0.6
        ? truncated.substring(0, lastSpace)
        : truncated
      ) + '...';
    }
  }

  return '';
}
