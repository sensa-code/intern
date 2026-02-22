-- 012: 啟用 vt_checklist_templates 的 Row Level Security
-- 此表在 001_initial_schema.sql 建立時遺漏了 RLS 設定
-- 需在 Supabase Dashboard → SQL Editor 手動執行

-- 啟用 RLS
ALTER TABLE vt_checklist_templates ENABLE ROW LEVEL SECURITY;

-- 公開讀取（檢查清單模板是程序的附屬資料，與程序同級公開）
CREATE POLICY "vt_checklist_templates_public_read"
  ON vt_checklist_templates FOR SELECT
  USING (true);

-- 僅管理員可寫入（透過 vt_user_roles 驗證）
CREATE POLICY "vt_checklist_templates_admin_write"
  ON vt_checklist_templates FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM vt_user_roles
      WHERE vt_user_roles.user_id = auth.uid()
      AND vt_user_roles.role IN ('super_admin', 'editor')
    )
  );

CREATE POLICY "vt_checklist_templates_admin_update"
  ON vt_checklist_templates FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM vt_user_roles
      WHERE vt_user_roles.user_id = auth.uid()
      AND vt_user_roles.role IN ('super_admin', 'editor')
    )
  );

CREATE POLICY "vt_checklist_templates_admin_delete"
  ON vt_checklist_templates FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM vt_user_roles
      WHERE vt_user_roles.user_id = auth.uid()
      AND vt_user_roles.role = 'super_admin'
    )
  );
