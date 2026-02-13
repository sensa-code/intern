// ================================================
// Supabase Client - 客戶端使用
// ================================================

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});

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
