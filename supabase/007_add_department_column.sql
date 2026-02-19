-- 007: 新增 department 欄位用於專科分類
-- 需在 Supabase Dashboard → SQL Editor 手動執行

ALTER TABLE vt_procedures ADD COLUMN IF NOT EXISTS department TEXT DEFAULT 'general';

CREATE INDEX IF NOT EXISTS idx_vt_procedures_department ON vt_procedures(department);

COMMENT ON COLUMN vt_procedures.department IS '獸醫專科分類：emergency, soft-tissue-surgery, orthopedics, internal-medicine, anesthesia, imaging, cardio-respiratory, neuro-behavior, ophthalmology, dermatology, pathology-lab, specialty-other, general';
