-- 011: 模組系統 (vt_modules)
-- 支援 7 種獸醫知識模組類型
-- 需在 Supabase Dashboard → SQL Editor 手動執行

CREATE TABLE IF NOT EXISTS vt_modules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  module_type TEXT NOT NULL CHECK (module_type IN (
    'drug_reference',         -- 藥物參考
    'case_study',             -- 臨床案例
    'anatomy_atlas',          -- 解剖圖譜
    'emergency_protocol',     -- 急診流程
    'surgical_technique',     -- 手術技巧
    'lab_reference',          -- 檢驗參考值
    'differential_diagnosis'  -- 鑑別診斷
  )),
  title TEXT NOT NULL,
  title_zh TEXT,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  description_zh TEXT,

  -- 富文本內容
  content_json JSONB,
  content_json_zh JSONB,

  -- 模組特有的結構化資料（依 module_type 不同存不同格式）
  metadata JSONB DEFAULT '{}',

  -- 分類和標籤
  department TEXT DEFAULT 'general',
  tags TEXT[] DEFAULT '{}',
  related_procedures UUID[] DEFAULT '{}',

  -- 管理
  content_status TEXT DEFAULT 'draft' CHECK (content_status IN ('draft', 'needs_review', 'verified')),
  content_source TEXT DEFAULT 'manual' CHECK (content_source IN ('manual', 'ai_generated', 'imported')),
  last_edited_by UUID REFERENCES auth.users(id),
  sort_order INT DEFAULT 0,

  -- 時間戳
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

-- RLS
ALTER TABLE vt_modules ENABLE ROW LEVEL SECURITY;

-- 公開讀取（已發布的模組）
CREATE POLICY "vt_modules_public_read"
  ON vt_modules FOR SELECT
  USING (deleted_at IS NULL AND content_status = 'verified');

-- 管理員完整存取
CREATE POLICY "vt_modules_admin_all"
  ON vt_modules FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM vt_user_roles
      WHERE user_id = auth.uid()
      AND role IN ('super_admin', 'editor')
    )
  );

-- 索引
CREATE INDEX IF NOT EXISTS idx_vt_modules_type ON vt_modules(module_type);
CREATE INDEX IF NOT EXISTS idx_vt_modules_slug ON vt_modules(slug);
CREATE INDEX IF NOT EXISTS idx_vt_modules_dept ON vt_modules(department);
CREATE INDEX IF NOT EXISTS idx_vt_modules_status ON vt_modules(content_status);
CREATE INDEX IF NOT EXISTS idx_vt_modules_tags ON vt_modules USING gin(tags);

-- 註解
COMMENT ON TABLE vt_modules IS '獸醫知識模組：藥物參考、臨床案例、解剖圖譜、急診流程、手術技巧、檢驗參考值、鑑別診斷';
COMMENT ON COLUMN vt_modules.metadata IS '模組特有的結構化資料 JSON（如藥物的劑量表、檢驗的參考值範圍等）';
