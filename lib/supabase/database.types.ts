// ================================================
// Supabase Database Types (placeholder)
// 使用 `npx supabase gen types typescript` 生成完整型別
// ================================================

// Row types (inline to avoid circular references)
type ProceduresRow = {
  id: string;
  procedure_id: string;
  name: string;
  category: string;
  page_number: number | null;
  indications: string | null;
  contraindications: string | null;
  equipment: string | null;
  patient_preparation: string | null;
  technique: string | null;
  procedure_steps: string | null;
  aftercare: string | null;
  complications: string | null;
  references: string | null;
  difficulty_level: number | null;
  estimated_duration_minutes: number | null;
  tags: string[] | null;
  created_at: string;
  updated_at: string;
};

type TrainingPlansRow = {
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
};

type PlanProceduresRow = {
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
};

type ProcedureProgressRow = {
  id: string;
  user_id: string;
  procedure_id: string;
  status: string;
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
};

type PracticeSessionsRow = {
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
};

type ChecklistTemplatesRow = {
  id: string;
  procedure_id: string;
  category: string;
  item_text: string;
  order_index: number;
  is_critical: boolean;
  created_at: string;
};

export type Database = {
  public: {
    Tables: {
      vt_procedures: {
        Row: ProceduresRow;
        Insert: Partial<ProceduresRow> & {
          name: string;
          procedure_id: string;
          category: string;
        };
        Update: Partial<ProceduresRow>;
      };
      vt_training_plans: {
        Row: TrainingPlansRow;
        Insert: Partial<TrainingPlansRow> & {
          user_id: string;
          name: string;
        };
        Update: Partial<TrainingPlansRow>;
      };
      vt_plan_procedures: {
        Row: PlanProceduresRow;
        Insert: Partial<PlanProceduresRow> & {
          plan_id: string;
          procedure_id: string;
          scheduled_date: string;
        };
        Update: Partial<PlanProceduresRow>;
      };
      vt_procedure_progress: {
        Row: ProcedureProgressRow;
        Insert: Partial<ProcedureProgressRow> & {
          user_id: string;
          procedure_id: string;
        };
        Update: Partial<ProcedureProgressRow>;
      };
      vt_practice_sessions: {
        Row: PracticeSessionsRow;
        Insert: Partial<PracticeSessionsRow> & {
          user_id: string;
          procedure_id: string;
        };
        Update: Partial<PracticeSessionsRow>;
      };
      vt_checklist_templates: {
        Row: ChecklistTemplatesRow;
        Insert: Partial<ChecklistTemplatesRow> & {
          procedure_id: string;
          item_text: string;
        };
        Update: Partial<ChecklistTemplatesRow>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
};
