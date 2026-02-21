/**
 * 模組類型定義
 */

export interface ModuleType {
  id: string;
  name_zh: string;
  name_en: string;
  icon: string;
  description: string;
  color: string;
}

export const MODULE_TYPES: ModuleType[] = [
  {
    id: 'drug_reference',
    name_zh: '藥物參考',
    name_en: 'Drug Reference',
    icon: 'Pill',
    description: '獸醫常用藥物劑量、適應症、副作用、交互作用',
    color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    id: 'case_study',
    name_zh: '臨床案例',
    name_en: 'Case Study',
    icon: 'FileText',
    description: '真實臨床案例分析：病史、診斷、治療計畫、預後',
    color: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  {
    id: 'anatomy_atlas',
    name_zh: '解剖圖譜',
    name_en: 'Anatomy Atlas',
    icon: 'BookImage',
    description: '犬貓解剖學圖譜、手術入路、重要結構標記',
    color: 'bg-purple-50 text-purple-700 border-purple-200',
  },
  {
    id: 'emergency_protocol',
    name_zh: '急診流程',
    name_en: 'Emergency Protocol',
    icon: 'Siren',
    description: '急診處置流程、分級檢傷、急救步驟、用藥指引',
    color: 'bg-red-50 text-red-700 border-red-200',
  },
  {
    id: 'surgical_technique',
    name_zh: '手術技巧',
    name_en: 'Surgical Technique',
    icon: 'Scissors',
    description: '手術步驟詳解、器械選擇、術中注意事項',
    color: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  {
    id: 'lab_reference',
    name_zh: '檢驗參考值',
    name_en: 'Lab Reference',
    icon: 'TestTubeDiagonal',
    description: '血液學、血液化學、尿液分析等正常參考範圍',
    color: 'bg-teal-50 text-teal-700 border-teal-200',
  },
  {
    id: 'differential_diagnosis',
    name_zh: '鑑別診斷',
    name_en: 'Differential Diagnosis',
    icon: 'GitBranch',
    description: '依症狀/檢驗異常的鑑別診斷決策樹',
    color: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  },
];

export function getModuleType(id: string): ModuleType | undefined {
  return MODULE_TYPES.find(m => m.id === id);
}
