// ================================================
// Next.js Middleware — 路由保護 + CSRF + 安全標頭
// 保護 /admin/* 路由，需要 editor 或 super_admin 角色
// ================================================

import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 0. CSRF 保護 — admin API 的 mutation 請求
  if (pathname.startsWith('/api/admin') && request.method !== 'GET') {
    const origin = request.headers.get('origin');
    const host = request.headers.get('host');

    if (origin) {
      try {
        const originHost = new URL(origin).host;
        if (originHost !== host) {
          return NextResponse.json({ error: 'CSRF: 請求來源不合法' }, { status: 403 });
        }
      } catch {
        return NextResponse.json({ error: 'CSRF: 無效的來源' }, { status: 403 });
      }
    }
  }

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
    return addSecurityHeaders(supabaseResponse);
  }

  // 2. Auth 路由（login）— 已登入則導向 admin
  if (pathname.startsWith('/login')) {
    const { supabaseResponse, user } = await updateSession(request);
    if (user) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
    return addSecurityHeaders(supabaseResponse);
  }

  // 3. Admin 路由 — 需要認證 + 角色檢查
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    const { supabaseResponse, user, supabase } = await updateSession(request);

    // 未登入 → 導向登入頁
    if (!user) {
      if (pathname.startsWith('/api/admin')) {
        return NextResponse.json({ error: '未登入' }, { status: 401 });
      }
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // 檢查角色（API 端點內有更嚴格的 service role 檢查）
    const { data: roleData } = await supabase
      .from('vt_user_roles')
      .select('role')
      .eq('user_id', user.id)
      .single();

    const role = roleData?.role;

    // 無角色或角色不足
    if (!role || role === 'viewer') {
      if (pathname.startsWith('/api/admin')) {
        return NextResponse.json({ error: '權限不足' }, { status: 403 });
      }
      return NextResponse.redirect(new URL('/?error=unauthorized', request.url));
    }

    return addSecurityHeaders(supabaseResponse);
  }

  // 4. 其他路由 — 正常通過
  const { supabaseResponse } = await updateSession(request);
  return addSecurityHeaders(supabaseResponse);
}

/** 為回應加上安全標頭（含 CSP, HSTS, Permissions-Policy） */
function addSecurityHeaders(response: NextResponse): NextResponse {
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
    "style-src 'self' 'unsafe-inline'; img-src 'self' https: data:; " +
    "font-src 'self'; connect-src 'self' https://*.supabase.co"
  );
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  return response;
}

export const config = {
  matcher: [
    // 排除靜態資源
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
