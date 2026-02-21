// ================================================
// Next.js Middleware — 路由保護
// 保護 /admin/* 路由，需要 editor 或 super_admin 角色
// ================================================

import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. 公開路由 — 不需要認證
  if (
    pathname === '/' ||
    pathname.startsWith('/procedures') ||
    pathname.startsWith('/training') ||
    pathname.startsWith('/modules') ||
    pathname.startsWith('/api/procedures') ||
    pathname.startsWith('/api/modules') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon')
  ) {
    const { supabaseResponse } = await updateSession(request);
    return supabaseResponse;
  }

  // 2. Auth 路由（login）— 已登入則導向 admin
  if (pathname.startsWith('/login')) {
    const { supabaseResponse, user } = await updateSession(request);
    if (user) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
    return supabaseResponse;
  }

  // 3. Admin 路由 — 需要認證 + 角色檢查
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    const { supabaseResponse, user, supabase } = await updateSession(request);

    // 未登入 → 導向登入頁
    if (!user) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // 檢查角色（用 service role 在 API 端點內處理更安全，這裡做基本檢查）
    const { data: roleData } = await supabase
      .from('vt_user_roles')
      .select('role')
      .eq('user_id', user.id)
      .single();

    const role = roleData?.role;

    // 無角色或角色不足 → 導向首頁
    if (!role || role === 'viewer') {
      return NextResponse.redirect(new URL('/?error=unauthorized', request.url));
    }

    return supabaseResponse;
  }

  // 4. 其他路由 — 正常通過
  const { supabaseResponse } = await updateSession(request);
  return supabaseResponse;
}

export const config = {
  matcher: [
    // 排除靜態資源
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
