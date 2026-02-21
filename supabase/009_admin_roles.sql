-- ================================================
-- 009: Admin 角色系統
-- 用途：為後台 CMS 建立角色權限控制
-- ================================================

-- 1. 用戶角色表
CREATE TABLE IF NOT EXISTS vt_user_roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  role TEXT NOT NULL DEFAULT 'viewer'
    CHECK (role IN ('super_admin', 'editor', 'viewer')),
  display_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE vt_user_roles ENABLE ROW LEVEL SECURITY;

-- 用戶可讀取自己的角色
CREATE POLICY "vt_user_roles_select_own" ON vt_user_roles
  FOR SELECT USING (auth.uid() = user_id);

-- 索引
CREATE INDEX IF NOT EXISTS idx_vt_user_roles_user ON vt_user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_vt_user_roles_role ON vt_user_roles(role);

-- 更新 updated_at trigger
CREATE TRIGGER vt_update_user_roles_updated_at
  BEFORE UPDATE ON vt_user_roles
  FOR EACH ROW EXECUTE FUNCTION vt_update_updated_at_column();

-- 2. 角色查詢輔助函式（SECURITY DEFINER 避免 RLS 遞迴）
CREATE OR REPLACE FUNCTION vt_get_user_role(check_user_id UUID)
RETURNS TEXT
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT role FROM vt_user_roles WHERE user_id = check_user_id LIMIT 1;
$$;

-- 3. 為 vt_procedures 新增管理員寫入 Policy
CREATE POLICY "vt_procedures_admin_write" ON vt_procedures
  FOR ALL
  USING (
    vt_get_user_role(auth.uid()) IN ('super_admin', 'editor')
  )
  WITH CHECK (
    vt_get_user_role(auth.uid()) IN ('super_admin', 'editor')
  );

-- ================================================
-- 手動步驟：在 Supabase Dashboard 執行此 SQL
-- 然後建立第一個 admin 帳號後，執行：
-- INSERT INTO vt_user_roles (user_id, role, display_name)
-- VALUES ('<your-user-uuid>', 'super_admin', '管理員');
-- ================================================
