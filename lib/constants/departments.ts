/**
 * 獸醫專科分類系統
 *
 * 將 343 個臨床程序依 tags 映射到 12 個主科別 + 1 個 fallback。
 * 優先順序：emergency 最高（急診優先），general 最低（無 tags fallback）。
 */

export interface Department {
  /** 唯一識別碼 */
  id: string;
  /** 中文名稱 */
  name_zh: string;
  /** 英文名稱 */
  name_en: string;
  /** lucide-react icon 名稱 */
  icon: string;
  /** 預計算 Tailwind CSS class（避免 JIT 無法解析動態 class） */
  colorClasses: {
    badge: string;
    bg: string;
    text: string;
    border: string;
  };
  /** 對應的 tags（用於 tag → department 反查） */
  tagPatterns: string[];
}

export const DEPARTMENTS: Department[] = [
  {
    id: 'emergency',
    name_zh: '急診與重症',
    name_en: 'Emergency & Critical Care',
    icon: 'Siren',
    colorClasses: {
      badge: 'bg-red-50 text-red-700 border-red-200',
      bg: 'bg-red-50',
      text: 'text-red-700',
      border: 'border-red-200',
    },
    tagPatterns: ['emergency', 'critical-care', 'triage', 'transfusion', 'vascular-access', 'fluid-therapy'],
  },
  {
    id: 'soft-tissue-surgery',
    name_zh: '軟組織外科',
    name_en: 'Soft Tissue Surgery',
    icon: 'Scissors',
    colorClasses: {
      badge: 'bg-blue-50 text-blue-700 border-blue-200',
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      border: 'border-blue-200',
    },
    tagPatterns: ['surgery', 'reconstructive', 'wound-care', 'head-neck', 'perineal', 'abdominal', 'thoracic'],
  },
  {
    id: 'orthopedics',
    name_zh: '骨科',
    name_en: 'Orthopedics',
    icon: 'Bone',
    colorClasses: {
      badge: 'bg-amber-50 text-amber-700 border-amber-200',
      bg: 'bg-amber-50',
      text: 'text-amber-700',
      border: 'border-amber-200',
    },
    tagPatterns: ['orthopedics', 'hip', 'elbow', 'stifle', 'fracture', 'bandage'],
  },
  {
    id: 'internal-medicine',
    name_zh: '內科',
    name_en: 'Internal Medicine',
    icon: 'Stethoscope',
    colorClasses: {
      badge: 'bg-green-50 text-green-700 border-green-200',
      bg: 'bg-green-50',
      text: 'text-green-700',
      border: 'border-green-200',
    },
    tagPatterns: ['internal-medicine', 'gastric', 'hepatic', 'hepatobiliary', 'endocrine', 'GI'],
  },
  {
    id: 'anesthesia',
    name_zh: '麻醉與疼痛',
    name_en: 'Anesthesia & Pain',
    icon: 'Wind',
    colorClasses: {
      badge: 'bg-purple-50 text-purple-700 border-purple-200',
      bg: 'bg-purple-50',
      text: 'text-purple-700',
      border: 'border-purple-200',
    },
    tagPatterns: ['anesthesia', 'sedation', 'pain'],
  },
  {
    id: 'imaging',
    name_zh: '影像診斷',
    name_en: 'Diagnostic Imaging',
    icon: 'ScanLine',
    colorClasses: {
      badge: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      bg: 'bg-indigo-50',
      text: 'text-indigo-700',
      border: 'border-indigo-200',
    },
    tagPatterns: ['ultrasound', 'radiology', 'imaging', 'endoscopy', 'MRI', 'CT'],
  },
  {
    id: 'cardio-respiratory',
    name_zh: '心肺科',
    name_en: 'Cardiopulmonary',
    icon: 'Heart',
    colorClasses: {
      badge: 'bg-rose-50 text-rose-700 border-rose-200',
      bg: 'bg-rose-50',
      text: 'text-rose-700',
      border: 'border-rose-200',
    },
    tagPatterns: ['cardiology', 'cardiac', 'respiratory'],
  },
  {
    id: 'neuro-behavior',
    name_zh: '神經與行為',
    name_en: 'Neurology & Behavior',
    icon: 'Brain',
    colorClasses: {
      badge: 'bg-violet-50 text-violet-700 border-violet-200',
      bg: 'bg-violet-50',
      text: 'text-violet-700',
      border: 'border-violet-200',
    },
    tagPatterns: ['neurology', 'behavior'],
  },
  {
    id: 'ophthalmology',
    name_zh: '眼科',
    name_en: 'Ophthalmology',
    icon: 'Eye',
    colorClasses: {
      badge: 'bg-cyan-50 text-cyan-700 border-cyan-200',
      bg: 'bg-cyan-50',
      text: 'text-cyan-700',
      border: 'border-cyan-200',
    },
    tagPatterns: ['ophthalmology'],
  },
  {
    id: 'dermatology',
    name_zh: '皮膚科',
    name_en: 'Dermatology',
    icon: 'Palette',
    colorClasses: {
      badge: 'bg-orange-50 text-orange-700 border-orange-200',
      bg: 'bg-orange-50',
      text: 'text-orange-700',
      border: 'border-orange-200',
    },
    tagPatterns: ['dermatology', 'otology'],
  },
  {
    id: 'pathology-lab',
    name_zh: '病理與檢驗',
    name_en: 'Clinical Pathology & Lab',
    icon: 'Microscope',
    colorClasses: {
      badge: 'bg-teal-50 text-teal-700 border-teal-200',
      bg: 'bg-teal-50',
      text: 'text-teal-700',
      border: 'border-teal-200',
    },
    tagPatterns: ['laboratory', 'clinical-pathology', 'cytology', 'hematology', 'diagnostics', 'pharmacology', 'toxicology'],
  },
  {
    id: 'specialty-other',
    name_zh: '其他專科',
    name_en: 'Other Specialties',
    icon: 'ClipboardList',
    colorClasses: {
      badge: 'bg-slate-50 text-slate-700 border-slate-200',
      bg: 'bg-slate-50',
      text: 'text-slate-700',
      border: 'border-slate-200',
    },
    tagPatterns: [
      'oncology', 'infectious', 'parasitology', 'mycology', 'zoonosis', 'immunology',
      'nephrology', 'urology', 'urinary',
      'reproduction', 'reproductive',
      'rehabilitation', 'nutrition', 'palliative',
      'dental',
    ],
  },
  {
    id: 'general',
    name_zh: '一般技能',
    name_en: 'General Skills',
    icon: 'BookOpen',
    colorClasses: {
      badge: 'bg-gray-50 text-gray-700 border-gray-200',
      bg: 'bg-gray-50',
      text: 'text-gray-700',
      border: 'border-gray-200',
    },
    tagPatterns: ['basic', 'handling', 'monitoring', 'ethics'],
  },
];

// ========================================
// 反查 map：tag → department ID
// ========================================

const TAG_TO_DEPARTMENT: Record<string, string> = {};
for (const dept of DEPARTMENTS) {
  for (const tag of dept.tagPatterns) {
    TAG_TO_DEPARTMENT[tag] = dept.id;
  }
}

/**
 * 根據 tags 陣列判斷所屬科別（優先順序依 DEPARTMENTS 定義順序）
 * emergency 最優先，general 為 fallback
 */
export function getDepartmentForTags(tags: string[] | null): string {
  if (!tags || tags.length === 0) return 'general';
  for (const tag of tags) {
    const dept = TAG_TO_DEPARTMENT[tag];
    if (dept) return dept;
  }
  return 'general';
}

/**
 * 根據 ID 取得科別定義
 */
export function getDepartmentById(id: string): Department | undefined {
  return DEPARTMENTS.find(d => d.id === id);
}

/**
 * 取得「可篩選」的科別（排除 general，它只作為 fallback）
 */
export function getFilterableDepartments(): Department[] {
  return DEPARTMENTS.filter(d => d.id !== 'general');
}

// ========================================
// Tag 中文翻譯對照表
// ========================================

const TAG_ZH_MAP: Record<string, string> = {
  // 急診
  emergency: '急診', 'critical-care': '重症照護', triage: '檢傷分類',
  transfusion: '輸血', 'vascular-access': '血管通路', 'fluid-therapy': '輸液治療',
  // 外科
  surgery: '外科', reconstructive: '重建手術', 'wound-care': '傷口照護',
  'head-neck': '頭頸', perineal: '會陰', abdominal: '腹腔', thoracic: '胸腔',
  // 骨科
  orthopedics: '骨科', hip: '髖關節', elbow: '肘關節', stifle: '膝關節',
  fracture: '骨折', bandage: '繃帶固定',
  // 內科
  'internal-medicine': '內科', gastric: '胃', hepatic: '肝臟',
  hepatobiliary: '肝膽', endocrine: '內分泌', GI: '消化道',
  // 麻醉
  anesthesia: '麻醉', sedation: '鎮靜', pain: '疼痛管理',
  // 影像
  ultrasound: '超音波', radiology: '放射學', imaging: '影像',
  endoscopy: '內視鏡', MRI: 'MRI', CT: 'CT',
  // 心肺
  cardiology: '心臟科', cardiac: '心臟', respiratory: '呼吸',
  // 神經
  neurology: '神經科', behavior: '行為',
  // 眼科
  ophthalmology: '眼科',
  // 皮膚
  dermatology: '皮膚科', otology: '耳科',
  // 病理
  laboratory: '實驗室', 'clinical-pathology': '臨床病理', cytology: '細胞學',
  hematology: '血液學', diagnostics: '診斷', pharmacology: '藥理學', toxicology: '毒理學',
  // 其他專科
  oncology: '腫瘤科', infectious: '傳染病', parasitology: '寄生蟲學',
  mycology: '真菌學', zoonosis: '人畜共通', immunology: '免疫學',
  nephrology: '腎臟科', urology: '泌尿科', urinary: '泌尿',
  reproduction: '繁殖', reproductive: '繁殖',
  rehabilitation: '復健', nutrition: '營養', palliative: '安寧照護',
  dental: '牙科',
  // 一般
  basic: '基礎技能', handling: '保定', monitoring: '監測', ethics: '倫理',
  // 補充常見
  sampling: '採樣', biopsy: '切片', catheter: '導管', drainage: '引流',
  suturing: '縫合', casting: '石膏固定', splinting: '夾板固定',
};

/**
 * 將英文 tag 翻譯為中文（查無翻譯則返回原文）
 */
export function translateTag(tag: string): string {
  return TAG_ZH_MAP[tag] ?? tag;
}
