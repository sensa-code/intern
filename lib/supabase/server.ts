// ================================================
// Supabase Server Client - 伺服器端使用（API Routes / Server Components）
// 使用 service role key 繞過 RLS，僅在伺服器端使用
// ================================================

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn(
    'Missing Supabase server environment variables. ' +
    'Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.'
  );
}

/**
 * 伺服器端 Supabase client（service role）
 * ⚠️ 僅限 API routes 和 Server Components 使用
 * ⚠️ 不要在客戶端匯入此模組
 */
export const supabaseServer = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});
