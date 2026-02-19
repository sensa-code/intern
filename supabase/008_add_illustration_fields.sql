-- 008: 新增圖解和流程圖欄位
-- 需在 Supabase Dashboard → SQL Editor 手動執行（與 007 一起）

ALTER TABLE vt_procedures ADD COLUMN IF NOT EXISTS illustration_url TEXT;
ALTER TABLE vt_procedures ADD COLUMN IF NOT EXISTS flow_diagram TEXT;

COMMENT ON COLUMN vt_procedures.illustration_url IS '圖解 URL（Supabase Storage 或外部連結）';
COMMENT ON COLUMN vt_procedures.flow_diagram IS 'Mermaid.js 流程圖語法';
