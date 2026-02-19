// ================================================
// TypeScript 型別定義
// ================================================

export interface Procedure {
  id: string;
  procedure_id: string;
  name: string;
  name_zh: string | null;
  category: string;
  page_number: number;

  // 內容（英文）
  indications: string | null;
  contraindications: string | null;
  equipment: string | null;
  patient_preparation: string | null;
  technique: string | null;
  procedure_steps: string | null;
  aftercare: string | null;
  complications: string | null;
  references: string | null;

  // 內容（繁體中文翻譯）
  indications_zh: string | null;
  contraindications_zh: string | null;
  equipment_zh: string | null;
  patient_preparation_zh: string | null;
  technique_zh: string | null;
  procedure_steps_zh: string | null;
  aftercare_zh: string | null;
  complications_zh: string | null;

  // 元資料
  difficulty_level: number | null;
  estimated_duration_minutes: number | null;
  tags: string[] | null;
  department: string;

  // 圖片與流程圖
  illustration_url: string | null;
  flow_diagram: string | null;

  created_at: string;
  updated_at: string;
}

export interface TrainingPlan {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  color: string;
  start_date: string | null;
  end_date: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface PlanProcedure {
  id: string;
  plan_id: string;
  procedure_id: string;
  scheduled_date: string;
  scheduled_time: string | null;
  order_index: number;
  notes: string | null;
  is_completed: boolean;
  completed_at: string | null;
  recurrence_pattern: string | null;
  recurrence_end_date: string | null;
  created_at: string;
  updated_at: string;

  // 關聯資料
  procedure?: Procedure;
}

export interface ProcedureProgress {
  id: string;
  user_id: string;
  procedure_id: string;
  status: 'not_started' | 'in_progress' | 'completed' | 'mastered';
  proficiency_level: number;
  first_attempted_at: string | null;
  last_practiced_at: string | null;
  practice_count: number;
  completed_at: string | null;
  notes: string | null;
  tips: string | null;
  common_mistakes: string | null;
  self_confidence: number | null;
  supervisor_rating: number | null;
  created_at: string;
  updated_at: string;

  // 關聯資料
  procedure?: Procedure;
}

export interface PracticeSession {
  id: string;
  user_id: string;
  procedure_id: string;
  session_date: string;
  duration_minutes: number | null;
  difficulty_rating: number | null;
  success_rating: number | null;
  notes: string | null;
  complications_encountered: string | null;
  supervisor_name: string | null;
  created_at: string;
}

export interface ChecklistTemplate {
  id: string;
  procedure_id: string;
  category: 'preparation' | 'equipment' | 'steps' | 'post-procedure';
  item_text: string;
  order_index: number;
  is_critical: boolean;
  created_at: string;
}

// ================================================
// API 回應型別
// ================================================

export interface ApiResponse<T> {
  data: T | null;
  error: Error | null;
}

// ================================================
// UI 組件 Props
// ================================================

export interface ProcedureCardProps {
  procedure: Procedure;
  progress?: ProcedureProgress;
  onClick?: () => void;
  showProgress?: boolean;
}

export interface TrainingPlanCardProps {
  plan: TrainingPlan;
  procedureCount: number;
  completedCount: number;
  onClick?: () => void;
}

export interface ScheduleViewProps {
  planId: string;
  date: Date;
  onDateChange: (date: Date) => void;
}

// ================================================
// 過濾和搜尋
// ================================================

export interface ProcedureFilters {
  category?: string;
  department?: string;
  search?: string;
  difficulty?: number[];
  status?: string[];
  tags?: string[];
}

export interface ProgressStats {
  total: number;
  notStarted: number;
  inProgress: number;
  completed: number;
  mastered: number;
  averageProficiency: number;
  totalPracticeHours: number;
}

// ================================================
// 程序詳情頁用型別
// ================================================

/**
 * 內容語言切換
 */
export type ContentLocale = 'en' | 'zh';

/**
 * 程序內容欄位鍵值（對應 vt_procedures 表的 TEXT 欄位）
 */
export type ProcedureContentField =
  | 'indications'
  | 'contraindications'
  | 'equipment'
  | 'patient_preparation'
  | 'technique'
  | 'procedure_steps'
  | 'aftercare'
  | 'complications';

/**
 * 詳情頁中一個已清理的內容區塊
 */
export interface ProcedureSection {
  key: ProcedureContentField;
  label: string;
  content: string;
}

/**
 * procedures_complete.json 單筆記錄的型別
 * 注意：JSON 用 "procedure"，DB/Procedure type 用 "procedure_steps"
 */
export interface ProcedureJsonRecord {
  id: string;
  name: string;
  category: string;
  page_number: number;
  indications: string;
  contraindications: string;
  equipment: string;
  patient_preparation: string;
  technique: string;
  procedure: string;          // maps to procedure_steps in Procedure type
  aftercare: string;
  complications: string;
  references: string;
}

// ================================================
// 表單資料
// ================================================

export interface CreatePlanFormData {
  name: string;
  description: string;
  color: string;
  start_date: string;
  end_date: string;
}

export interface UpdateProgressFormData {
  status: string;
  proficiency_level: number;
  notes: string;
  self_confidence: number;
}

export interface ScheduleProcedureFormData {
  procedure_id: string;
  scheduled_date: string;
  scheduled_time?: string;
  notes?: string;
  recurrence_pattern?: string;
}
