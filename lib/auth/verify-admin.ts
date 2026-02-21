// ================================================
// 共用 Admin 驗證 + 安全工具
// DRY 化 — 所有 admin API 共用同一個驗證函式
// ================================================

import { NextResponse, type NextRequest } from 'next/server';
import { supabaseServer } from '@/lib/supabase/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export interface AdminUser {
  userId: string;
  role: string;
}

/** 驗證管理員身份（需 editor 或 super_admin） */
export async function verifyAdmin(): Promise<AdminUser | null> {
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return cookieStore.getAll(); },
          setAll() { /* Server Component — no-op */ },
        },
      }
    );

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    // 使用 service role 做權限檢查（不受 RLS 影響）
    const { data: roleData } = await supabaseServer
      .from('vt_user_roles')
      .select('role')
      .eq('user_id', user.id)
      .single();

    if (!roleData || !['super_admin', 'editor'].includes(roleData.role)) return null;

    return { userId: user.id, role: roleData.role };
  } catch {
    return null;
  }
}

/** UUID 格式驗證 */
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isValidUUID(id: string): boolean {
  return UUID_REGEX.test(id);
}

/** 安全錯誤回應 — 不洩漏內部實作細節 */
export function safeErrorResponse(error: unknown, fallbackMessage: string, statusCode = 500): NextResponse {
  // 記錄完整錯誤到 server log
  console.error(fallbackMessage, error);

  // 辨識可以安全回傳的 Supabase 錯誤
  const supaErr = error as { code?: string; message?: string };
  let clientMessage = fallbackMessage;

  if (supaErr?.code === '23505') {
    clientMessage = '資料重複，該項目已存在';
  } else if (supaErr?.code === '23503') {
    clientMessage = '關聯資料不存在';
  } else if (supaErr?.code === '23514') {
    clientMessage = '資料格式不符合規範';
  }

  return NextResponse.json({ error: clientMessage }, { status: statusCode });
}

/** CSRF 保護 — 檢查 Origin/Referer */
export function checkCSRF(request: NextRequest): boolean {
  // GET 請求不需要 CSRF 檢查
  if (request.method === 'GET') return true;

  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');
  const host = request.headers.get('host');

  // 如果有 origin header，驗證是否匹配
  if (origin) {
    try {
      const originHost = new URL(origin).host;
      return originHost === host;
    } catch {
      return false;
    }
  }

  // 如果有 referer header，驗證是否匹配
  if (referer) {
    try {
      const refererHost = new URL(referer).host;
      return refererHost === host;
    } catch {
      return false;
    }
  }

  // 無 origin 也無 referer — 可能是 API 直接呼叫，允許（auth 已經驗證）
  return true;
}

/** 驗證 module_type 是否合法 */
export const VALID_MODULE_TYPES = [
  'drug_reference', 'case_study', 'anatomy_atlas', 'emergency_protocol',
  'surgical_technique', 'lab_reference', 'differential_diagnosis',
] as const;

export function isValidModuleType(type: string): boolean {
  return (VALID_MODULE_TYPES as readonly string[]).includes(type);
}

/** 清理字串輸入 — 移除潛在 XSS 標籤 */
export function sanitizeString(input: string): string {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .trim();
}
