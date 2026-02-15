-- ================================================
-- 003: 新增繁體中文翻譯欄位
-- 為 vt_procedures 的 8 個內容欄位新增 _zh 後綴版本
-- 用途：前端 EN/中 語言切換
-- ================================================

ALTER TABLE vt_procedures ADD COLUMN IF NOT EXISTS indications_zh TEXT;
ALTER TABLE vt_procedures ADD COLUMN IF NOT EXISTS contraindications_zh TEXT;
ALTER TABLE vt_procedures ADD COLUMN IF NOT EXISTS equipment_zh TEXT;
ALTER TABLE vt_procedures ADD COLUMN IF NOT EXISTS patient_preparation_zh TEXT;
ALTER TABLE vt_procedures ADD COLUMN IF NOT EXISTS technique_zh TEXT;
ALTER TABLE vt_procedures ADD COLUMN IF NOT EXISTS procedure_steps_zh TEXT;
ALTER TABLE vt_procedures ADD COLUMN IF NOT EXISTS aftercare_zh TEXT;
ALTER TABLE vt_procedures ADD COLUMN IF NOT EXISTS complications_zh TEXT;

-- 欄位說明
COMMENT ON COLUMN vt_procedures.indications_zh IS '適應症（繁體中文翻譯）';
COMMENT ON COLUMN vt_procedures.contraindications_zh IS '禁忌症（繁體中文翻譯）';
COMMENT ON COLUMN vt_procedures.equipment_zh IS '設備（繁體中文翻譯）';
COMMENT ON COLUMN vt_procedures.patient_preparation_zh IS '患者準備（繁體中文翻譯）';
COMMENT ON COLUMN vt_procedures.technique_zh IS '技術（繁體中文翻譯）';
COMMENT ON COLUMN vt_procedures.procedure_steps_zh IS '步驟（繁體中文翻譯）';
COMMENT ON COLUMN vt_procedures.aftercare_zh IS '術後護理（繁體中文翻譯）';
COMMENT ON COLUMN vt_procedures.complications_zh IS '併發症（繁體中文翻譯）';
