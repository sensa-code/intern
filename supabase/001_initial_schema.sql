-- ================================================
-- 獸醫住院醫師訓練計劃系統 - 資料庫 Schema
-- 所有表名使用 vt_ 前綴，避免與同一 Supabase 專案中
-- 既有的 RAG / plumbform 資料發生衝突
-- ================================================

-- 啟用 UUID 擴展（如果已存在會跳過）
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ================================================
-- 1. 程序表 (vt_procedures)
-- ================================================
CREATE TABLE IF NOT EXISTS vt_procedures (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  procedure_id TEXT UNIQUE NOT NULL,  -- 例如: proc_001
  name TEXT NOT NULL,
  category CHAR(1) NOT NULL CHECK (category IN ('A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z')),
  page_number INT,

  -- 內容欄位
  indications TEXT,
  contraindications TEXT,
  equipment TEXT,
  patient_preparation TEXT,
  technique TEXT,
  procedure_steps TEXT,
  aftercare TEXT,
  complications TEXT,
  "references" TEXT,

  -- 元資料
  difficulty_level INT CHECK (difficulty_level BETWEEN 1 AND 5),
  estimated_duration_minutes INT,
  tags TEXT[],

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 程序表對所有人可讀（公開資料）
ALTER TABLE vt_procedures ENABLE ROW LEVEL SECURITY;

CREATE POLICY "vt_procedures_public_read"
  ON vt_procedures FOR SELECT
  USING (true);

-- 索引
CREATE INDEX idx_vt_procedures_category ON vt_procedures(category);
CREATE INDEX idx_vt_procedures_name ON vt_procedures USING gin(to_tsvector('english', name));
CREATE INDEX idx_vt_procedures_tags ON vt_procedures USING gin(tags);

-- ================================================
-- 2. 訓練計劃表 (vt_training_plans)
-- ================================================
CREATE TABLE IF NOT EXISTS vt_training_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,

  name TEXT NOT NULL,
  description TEXT,
  color TEXT DEFAULT '#3b82f6',

  start_date DATE,
  end_date DATE,
  is_active BOOLEAN DEFAULT true,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS 政策
ALTER TABLE vt_training_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "vt_training_plans_select_own"
  ON vt_training_plans FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "vt_training_plans_insert_own"
  ON vt_training_plans FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "vt_training_plans_update_own"
  ON vt_training_plans FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "vt_training_plans_delete_own"
  ON vt_training_plans FOR DELETE
  USING (auth.uid() = user_id);

-- 索引
CREATE INDEX idx_vt_training_plans_user ON vt_training_plans(user_id);
CREATE INDEX idx_vt_training_plans_active ON vt_training_plans(is_active) WHERE is_active = true;

-- ================================================
-- 3. 計劃程序排程表 (vt_plan_procedures)
-- ================================================
CREATE TABLE IF NOT EXISTS vt_plan_procedures (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  plan_id UUID REFERENCES vt_training_plans(id) ON DELETE CASCADE NOT NULL,
  procedure_id UUID REFERENCES vt_procedures(id) NOT NULL,

  scheduled_date DATE NOT NULL,
  scheduled_time TIME,
  order_index INT DEFAULT 0,

  notes TEXT,
  is_completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ,

  -- 重複設定
  recurrence_pattern TEXT, -- 'daily', 'weekly', 'monthly', 'custom'
  recurrence_end_date DATE,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS 政策（透過 plan_id 關聯到 user）
ALTER TABLE vt_plan_procedures ENABLE ROW LEVEL SECURITY;

CREATE POLICY "vt_plan_procedures_manage_own"
  ON vt_plan_procedures FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM vt_training_plans
      WHERE vt_training_plans.id = vt_plan_procedures.plan_id
      AND vt_training_plans.user_id = auth.uid()
    )
  );

-- 索引
CREATE INDEX idx_vt_plan_procedures_plan ON vt_plan_procedures(plan_id);
CREATE INDEX idx_vt_plan_procedures_date ON vt_plan_procedures(scheduled_date);
CREATE INDEX idx_vt_plan_procedures_procedure ON vt_plan_procedures(procedure_id);

-- ================================================
-- 4. 程序學習進度表 (vt_procedure_progress)
-- ================================================
CREATE TABLE IF NOT EXISTS vt_procedure_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  procedure_id UUID REFERENCES vt_procedures(id) NOT NULL,

  -- 狀態
  status TEXT DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed', 'mastered')),
  proficiency_level INT DEFAULT 0 CHECK (proficiency_level BETWEEN 0 AND 5),

  -- 學習記錄
  first_attempted_at TIMESTAMPTZ,
  last_practiced_at TIMESTAMPTZ,
  practice_count INT DEFAULT 0,
  completed_at TIMESTAMPTZ,

  -- 筆記
  notes TEXT,
  tips TEXT,
  common_mistakes TEXT,

  -- 評估
  self_confidence INT CHECK (self_confidence BETWEEN 1 AND 5),
  supervisor_rating INT CHECK (supervisor_rating BETWEEN 1 AND 5),

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(user_id, procedure_id)
);

-- RLS 政策
ALTER TABLE vt_procedure_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "vt_procedure_progress_select_own"
  ON vt_procedure_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "vt_procedure_progress_insert_own"
  ON vt_procedure_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "vt_procedure_progress_update_own"
  ON vt_procedure_progress FOR UPDATE
  USING (auth.uid() = user_id);

-- 索引
CREATE INDEX idx_vt_procedure_progress_user ON vt_procedure_progress(user_id);
CREATE INDEX idx_vt_procedure_progress_procedure ON vt_procedure_progress(procedure_id);
CREATE INDEX idx_vt_procedure_progress_status ON vt_procedure_progress(status);

-- ================================================
-- 5. 練習記錄表 (vt_practice_sessions)
-- ================================================
CREATE TABLE IF NOT EXISTS vt_practice_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  procedure_id UUID REFERENCES vt_procedures(id) NOT NULL,

  session_date TIMESTAMPTZ DEFAULT NOW(),
  duration_minutes INT,

  -- 評估
  difficulty_rating INT CHECK (difficulty_rating BETWEEN 1 AND 5),
  success_rating INT CHECK (success_rating BETWEEN 1 AND 5),

  notes TEXT,
  complications_encountered TEXT,
  supervisor_name TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS 政策
ALTER TABLE vt_practice_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "vt_practice_sessions_manage_own"
  ON vt_practice_sessions FOR ALL
  USING (auth.uid() = user_id);

-- 索引
CREATE INDEX idx_vt_practice_sessions_user ON vt_practice_sessions(user_id);
CREATE INDEX idx_vt_practice_sessions_procedure ON vt_practice_sessions(procedure_id);
CREATE INDEX idx_vt_practice_sessions_date ON vt_practice_sessions(session_date);

-- ================================================
-- 6. 檢查清單項目表 (vt_checklist_templates)
-- ================================================
CREATE TABLE IF NOT EXISTS vt_checklist_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  procedure_id UUID REFERENCES vt_procedures(id) NOT NULL,

  category TEXT NOT NULL, -- 'preparation', 'equipment', 'steps', 'post-procedure'
  item_text TEXT NOT NULL,
  order_index INT DEFAULT 0,
  is_critical BOOLEAN DEFAULT false,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 索引
CREATE INDEX idx_vt_checklist_procedure ON vt_checklist_templates(procedure_id);

-- ================================================
-- 更新時間戳記觸發器（使用 vt_ 前綴避免與既有 trigger 衝突）
-- ================================================
CREATE OR REPLACE FUNCTION vt_update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER vt_update_procedures_updated_at BEFORE UPDATE ON vt_procedures
  FOR EACH ROW EXECUTE FUNCTION vt_update_updated_at_column();

CREATE TRIGGER vt_update_training_plans_updated_at BEFORE UPDATE ON vt_training_plans
  FOR EACH ROW EXECUTE FUNCTION vt_update_updated_at_column();

CREATE TRIGGER vt_update_plan_procedures_updated_at BEFORE UPDATE ON vt_plan_procedures
  FOR EACH ROW EXECUTE FUNCTION vt_update_updated_at_column();

CREATE TRIGGER vt_update_procedure_progress_updated_at BEFORE UPDATE ON vt_procedure_progress
  FOR EACH ROW EXECUTE FUNCTION vt_update_updated_at_column();

-- ================================================
-- Views（使用 vt_ 前綴）
-- ================================================

-- 用戶進度總覽
CREATE OR REPLACE VIEW vt_user_progress_summary AS
SELECT
  user_id,
  COUNT(*) as total_procedures_tracked,
  SUM(CASE WHEN status = 'completed' OR status = 'mastered' THEN 1 ELSE 0 END) as completed_count,
  SUM(CASE WHEN status = 'in_progress' THEN 1 ELSE 0 END) as in_progress_count,
  AVG(proficiency_level) as avg_proficiency,
  SUM(practice_count) as total_practice_sessions
FROM vt_procedure_progress
GROUP BY user_id;

-- 今日排程
CREATE OR REPLACE VIEW vt_todays_schedule AS
SELECT
  pp.*,
  p.name as procedure_name,
  p.category,
  p.difficulty_level,
  tp.name as plan_name,
  tp.user_id
FROM vt_plan_procedures pp
JOIN vt_procedures p ON pp.procedure_id = p.id
JOIN vt_training_plans tp ON pp.plan_id = tp.id
WHERE pp.scheduled_date = CURRENT_DATE
AND pp.is_completed = false;

-- ================================================
-- 表說明
-- ================================================
COMMENT ON TABLE vt_procedures IS '獸醫臨床程序資料庫（vet_training 系統）';
COMMENT ON TABLE vt_training_plans IS '用戶訓練計劃（vet_training 系統）';
COMMENT ON TABLE vt_plan_procedures IS '計劃中的程序排程（vet_training 系統）';
COMMENT ON TABLE vt_procedure_progress IS '用戶對各程序的學習進度（vet_training 系統）';
COMMENT ON TABLE vt_practice_sessions IS '練習記錄（vet_training 系統）';
COMMENT ON TABLE vt_checklist_templates IS '程序檢查清單模板（vet_training 系統）';
