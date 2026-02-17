-- 004: 新增 name_zh 欄位（繁體中文程序名稱）
-- 用途：顯示格式為「中文名稱（English Name）」

ALTER TABLE vt_procedures
ADD COLUMN IF NOT EXISTS name_zh TEXT;

COMMENT ON COLUMN vt_procedures.name_zh IS '程序繁體中文名稱';
