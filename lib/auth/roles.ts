// ================================================
// 角色權限工具 — Admin CMS 用
// ================================================

export type UserRole = 'super_admin' | 'editor' | 'viewer';

/** 角色中文名稱 */
export const ROLE_LABELS: Record<UserRole, string> = {
  super_admin: '超級管理員',
  editor: '內容編輯',
  viewer: '檢視者',
};

/** 可以編輯內容的角色 */
export function canEditContent(role: UserRole | null): boolean {
  return role === 'super_admin' || role === 'editor';
}

/** 可以管理用戶的角色 */
export function canManageUsers(role: UserRole | null): boolean {
  return role === 'super_admin';
}

/** 可以刪除內容的角色 */
export function canDeleteContent(role: UserRole | null): boolean {
  return role === 'super_admin';
}

/** 可以發布內容的角色 */
export function canPublishContent(role: UserRole | null): boolean {
  return role === 'super_admin' || role === 'editor';
}
