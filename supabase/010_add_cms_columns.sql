-- 010: 新增 CMS 管理欄位 + 富文本 JSONB
-- 需在 Supabase Dashboard → SQL Editor 手動執行

-- 中文名稱（可能已在 004 加過，IF NOT EXISTS 保護）
ALTER TABLE vt_procedures ADD COLUMN IF NOT EXISTS name_zh TEXT;

-- 富文本 ProseMirror JSON 欄位
ALTER TABLE vt_procedures ADD COLUMN IF NOT EXISTS content_json JSONB;
ALTER TABLE vt_procedures ADD COLUMN IF NOT EXISTS content_json_zh JSONB;

-- 內容管理欄位
ALTER TABLE vt_procedures ADD COLUMN IF NOT EXISTS content_status TEXT DEFAULT 'needs_review'
  CHECK (content_status IN ('draft', 'needs_review', 'verified'));
ALTER TABLE vt_procedures ADD COLUMN IF NOT EXISTS content_source TEXT DEFAULT 'ai_generated'
  CHECK (content_source IN ('manual', 'ai_generated', 'imported'));
ALTER TABLE vt_procedures ADD COLUMN IF NOT EXISTS last_edited_by UUID REFERENCES auth.users(id);
ALTER TABLE vt_procedures ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;

-- 註解
COMMENT ON COLUMN vt_procedures.content_json IS 'ProseMirror JSON 格式的英文富文本內容';
COMMENT ON COLUMN vt_procedures.content_json_zh IS 'ProseMirror JSON 格式的中文富文本內容';
COMMENT ON COLUMN vt_procedures.content_status IS '內容審核狀態：draft / needs_review / verified';
COMMENT ON COLUMN vt_procedures.content_source IS '內容來源：manual / ai_generated / imported';
COMMENT ON COLUMN vt_procedures.last_edited_by IS '最後編輯者的 user ID';
COMMENT ON COLUMN vt_procedures.deleted_at IS '軟刪除時間戳';

-- 為 content_status 建立索引（方便後台篩選）
CREATE INDEX IF NOT EXISTS idx_vt_procedures_content_status ON vt_procedures(content_status);
