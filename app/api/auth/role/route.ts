// ================================================
// GET /api/auth/role — 取得當前用戶角色
// ================================================

import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { supabaseServer } from '@/lib/supabase/server';

export async function GET() {
  try {
    // 用 cookie-based client 取得當前用戶
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll() {
            // Server Component 中無法設定 cookie
          },
        },
      }
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: '未登入' }, { status: 401 });
    }

    // 用 service role 查詢角色（繞過 RLS）
    const { data: roleData, error: roleError } = await supabaseServer
      .from('vt_user_roles')
      .select('role, display_name')
      .eq('user_id', user.id)
      .single();

    if (roleError || !roleData) {
      return NextResponse.json({
        role: null,
        display_name: user.email?.split('@')[0] ?? null,
        email: user.email,
      });
    }

    return NextResponse.json({
      role: roleData.role,
      display_name: roleData.display_name,
      email: user.email,
    });
  } catch (error) {
    console.error('Error fetching user role:', error);
    return NextResponse.json({ error: '伺服器錯誤' }, { status: 500 });
  }
}
