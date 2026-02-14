/**
 * OCR 文字清理工具 — 用於 BSAVA 臨床程序資料
 *
 * procedures_complete.json 的資料從 PDF OCR 提取，包含以下雜訊：
 * - "Procedures in Small Animal Practice N" 頁腳
 * - fi/fl 連字斷裂（"fl uid" → "fluid"）
 * - 相鄰程序的內容滲漏（content bleed）
 * - 散落的單字母（OCR 在頁面邊緣偵測到的索引標記）
 * - 區塊標題殘留（INDICATIONS、EQUIPMENT 等出現在非對應欄位中）
 *
 * 安全原則（Expert A 建議）：
 * - 散落字母只移除「獨立成行」或「連續 3+」的模式，避免破壞 "type A"、"21 G"
 * - 連字修復使用字典查找，不用通用正則
 * - 區塊標題移除使用最長匹配優先
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
  return text
    // 格式 1: "Procedures in Small Animal Practice 16"（文字在前）
    .replace(/Procedures in Small Animal Practice\s+\d{1,3}/g, '')
    // 格式 2: "16 Procedures in Small Animal Practice"（頁碼在前）
    .replace(/\d{1,3}\s+Procedures in Small Animal Practice/g, '');
}

/**
 * OCR 連字修復字典
 *
 * 使用字典查找而非通用正則（Expert A 建議），
 * 確保每個替換都經過驗證，避免誤改有效文字。
 */
const LIGATURE_DICT: Record<string, string> = {
  // fl 連字
  'fl uid': 'fluid', 'fl uids': 'fluids',
  'fl ow': 'flow', 'fl ows': 'flows',
  'fl ap': 'flap', 'fl aps': 'flaps',
  'fl ush': 'flush', 'fl ushed': 'flushed', 'fl ushing': 'flushing',
  'fl exed': 'flexed', 'fl exion': 'flexion', 'fl exible': 'flexible',
  'fl ex': 'flex', 'fl at': 'flat', 'fl oat': 'float',
  'fl oor': 'floor', 'fl uorescence': 'fluorescence',
  'fl uoroscopy': 'fluoroscopy', 'fl uoroscopic': 'fluoroscopic',
  // fi 連字
  'fi ndings': 'findings', 'fi nding': 'finding',
  'fi rst': 'first', 'fi ne': 'fine', 'fi ner': 'finer',
  'fi eld': 'field', 'fi elds': 'fields',
  'fi lm': 'film', 'fi lms': 'films',
  'fi ll': 'fill', 'fi lled': 'filled', 'fi lling': 'filling',
  'fi lter': 'filter', 'fi ltered': 'filtered',
  'fi brin': 'fibrin', 'fi brinogen': 'fibrinogen',
  'fi bula': 'fibula', 'fi bular': 'fibular',
  'fi xed': 'fixed', 'fi xation': 'fixation',
  'fi nal': 'final', 'fi nger': 'finger', 'fi ngers': 'fingers',
  'fi rmly': 'firmly', 'fi rm': 'firm',
  'fi gure': 'figure', 'fi gures': 'figures',
  'fi ve': 'five',
  // fi 連字（複合詞中間）
  'confi rm': 'confirm', 'confi rmed': 'confirmed', 'confi rming': 'confirming',
  'confi dent': 'confident', 'confi dence': 'confidence',
  'identifi ed': 'identified', 'identifi cation': 'identification',
  'signifi cant': 'significant', 'signifi cance': 'significance',
  'suffi cient': 'sufficient', 'insuffi cient': 'insufficient',
  'specifi c': 'specific', 'specifi cally': 'specifically',
  'benefi t': 'benefit', 'benefi ts': 'benefits', 'benefi cial': 'beneficial',
  'diffi cult': 'difficult', 'diffi culty': 'difficulty',
  'modifi ed': 'modified', 'modifi cation': 'modification',
  'magni fi cation': 'magnification',
};

function fixLigatures(text: string): string {
  let result = text;
  for (const [broken, fixed] of Object.entries(LIGATURE_DICT)) {
    // 使用全域替換但保留大小寫敏感
    const pattern = new RegExp(broken.replace(/\s+/g, '\\s+'), 'g');
    result = result.replace(pattern, fixed);
  }
  return result;
}

/**
 * 安全移除散落的 OCR 索引字母
 *
 * 只移除兩種安全模式（Expert A 建議）：
 * 1. 獨立成行的單字母（如 "A\n" 或 "\nD\n"）
 * 2. 連續 3 個以上單字母序列（如 "D E F G H"）— 明顯是 OCR 索引殘留
 *
 * 不移除文脈中的單字母（如 "type A blood"、"21 G needle"、"vitamin K"）
 */
function removeScatteredLetters(text: string): string {
  // 模式 1: 移除連續 3+ 個單大寫字母的序列（如 "D E F G H I J"）
  // 這些是 BSAVA 字母索引標籤的 OCR 殘留
  let result = text.replace(
    /(?:(?<=\s)|^)(?:[A-Z]\s+){3,}[A-Z](?=\s|$)/g,
    ' '
  );

  // 模式 2: 獨立成行的單大寫字母（前後都是換行或字串邊界）
  result = result.replace(
    /(?:^|\n)\s*[A-Z]\s*(?:\n|$)/g,
    '\n'
  );

  return result;
}

/**
 * 移除欄位中殘留的區塊標題
 *
 * OCR 可能在 indications 欄位裡留有 "INDICATIONS" 標題文字，
 * 或在 equipment 欄位裡出現 "TECHNIQUE" 等。
 * 使用最長匹配優先（longest-match-first）避免部分匹配。
 */
const SECTION_HEADERS = [
  'PATIENT PREPARATION AND POSITIONING',
  'PATIENT PREPARATION',
  'CONTRAINDICATIONS',
  'PROCEDURE STEPS',
  'COMPLICATIONS',
  'INDICATIONS',
  'EQUIPMENT',
  'TECHNIQUE',
  'AFTERCARE',
  'PROCEDURE',
  'REFERENCES',
  'POSITIONING',
];

function removeSectionHeaders(text: string): string {
  let result = text;
  for (const header of SECTION_HEADERS) {
    // 只移除全大寫的標題（OCR 源材料用全大寫表示區塊標題）
    // 不使用 'i' flag，避免誤刪正文中的小寫詞如 "indications"、"technique"
    const pattern = new RegExp(`\\b${header}\\s*:?\\s*`, 'g');
    result = result.replace(pattern, '');
  }
  return result;
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
 * 移除 OCR 常見的參考文獻句尾殘留
 * 如 "See also Figure 12.3" 或 "Refer to Chapter 5"
 */
function removeReferenceResidues(text: string): string {
  return text
    .replace(/See\s+(?:also\s+)?(?:Figure|Fig\.?|Chapter|Table)\s+\d[\d.–-]*/gi, '')
    .replace(/\((?:Figure|Fig\.?|Table)\s+\d[\d.–-]*\)/gi, '');
}

/**
 * 完整清理流程：
 * 頁腳移除 → 區塊標題移除 → 連字修復 → 散落字母移除 →
 * 參考殘留移除 → 滲漏截斷 → 空白正規化
 */
export function cleanOcrText(
  text: string | null | undefined,
  currentProcedureName: string
): string {
  if (!text || text.trim().length === 0) return '';

  let cleaned = text;
  cleaned = removeFooters(cleaned);
  cleaned = removeSectionHeaders(cleaned);
  cleaned = fixLigatures(cleaned);
  cleaned = removeScatteredLetters(cleaned);
  cleaned = removeReferenceResidues(cleaned);
  cleaned = truncateContentBleed(cleaned, currentProcedureName);
  // 合併連續空白（保留單一換行作為段落分隔）
  cleaned = cleaned
    .replace(/[^\S\n]+/g, ' ')      // 非換行空白合併為單一空格
    .replace(/\n{3,}/g, '\n\n')     // 多餘換行合併為最多兩行
    .trim();

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
