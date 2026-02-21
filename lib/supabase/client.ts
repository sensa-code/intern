// ================================================
// Supabase Client — 客戶端使用（@supabase/ssr）
// ================================================

import { createBrowserClient as createClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Missing Supabase environment variables. ' +
    'Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local'
  );
}

/**
 * 建立瀏覽器端 Supabase client
 * 每次呼叫都建立新實例（@supabase/ssr 建議模式）
 */
export function createBrowserClient() {
  return createClient(supabaseUrl, supabaseAnonKey);
}

/**
 * 共享 Supabase client 實例（向後相容既有程式碼）
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ================================================
// 輔助函數
// ================================================

/**
 * 取得當前用戶
 */
export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
}

/**
 * 登出
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

/**
 * 檢查是否已登入
 */
export async function isAuthenticated() {
  const { data: { session } } = await supabase.auth.getSession();
  return !!session;
}
