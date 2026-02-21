// ================================================
// GET /api/admin/modules — 列出所有模組（含草稿）
// POST /api/admin/modules — 新建模組
// ================================================

import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/server';
import {
  verifyAdmin, checkCSRF, sanitizeString, safeErrorResponse,
  isValidModuleType,
} from '@/lib/auth/verify-admin';

export async function GET(request: NextRequest) {
  const admin = await verifyAdmin();
  if (!admin) {
    return NextResponse.json({ error: '未授權' }, { status: 401 });
  }

  const url = new URL(request.url);
  const moduleType = url.searchParams.get('type');
  const status = url.searchParams.get('status');
  const page = Math.max(1, parseInt(url.searchParams.get('page') || '1'));
  const limit = Math.min(100, Math.max(1, parseInt(url.searchParams.get('limit') || '50')));
  const offset = (page - 1) * limit;

  // 驗證篩選參數
  if (moduleType && !isValidModuleType(moduleType)) {
    return NextResponse.json({ error: '無效的模組類型' }, { status: 400 });
  }

  if (status && !['draft', 'needs_review', 'verified'].includes(status)) {
    return NextResponse.json({ error: '無效的狀態' }, { status: 400 });
  }

  let query = supabaseServer
    .from('vt_modules')
    .select('*', { count: 'exact' })
    .is('deleted_at', null)
    .order('sort_order', { ascending: true })
    .order('updated_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (moduleType) query = query.eq('module_type', moduleType);
  if (status) query = query.eq('content_status', status);

  const { data, error, count } = await query;

  if (error) {
    return safeErrorResponse(error, '載入模組列表失敗');
  }

  return NextResponse.json({
    data: data ?? [],
    pagination: { page, limit, total: count ?? 0 },
  });
}

export async function POST(request: NextRequest) {
  if (!checkCSRF(request)) {
    return NextResponse.json({ error: '請求來源不合法' }, { status: 403 });
  }

  const admin = await verifyAdmin();
  if (!admin) {
    return NextResponse.json({ error: '未授權' }, { status: 401 });
  }

  try {
    const body = await request.json();

    // 驗證必填欄位
    const moduleType = typeof body.module_type === 'string' ? body.module_type : '';
    const title = typeof body.title === 'string' ? sanitizeString(body.title) : '';

    if (!moduleType || !title) {
      return NextResponse.json({ error: '模組類型和標題為必填' }, { status: 400 });
    }

    if (!isValidModuleType(moduleType)) {
      return NextResponse.json({ error: '無效的模組類型' }, { status: 400 });
    }

    // 產生 slug
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      + '-' + Date.now().toString(36);

    const titleZh = typeof body.title_zh === 'string' ? sanitizeString(body.title_zh) : null;
    const department = typeof body.department === 'string' ? body.department : 'general';
    const tags = Array.isArray(body.tags)
      ? body.tags.filter((t: unknown) => typeof t === 'string').slice(0, 20)
      : [];
    const sortOrder = typeof body.sort_order === 'number'
      ? Math.max(0, Math.min(9999, body.sort_order))
      : 0;

    const { data, error } = await supabaseServer
      .from('vt_modules')
      .insert({
        module_type: moduleType,
        title,
        title_zh: titleZh,
        slug,
        description: typeof body.description === 'string' ? sanitizeString(body.description) : null,
        description_zh: typeof body.description_zh === 'string' ? sanitizeString(body.description_zh) : null,
        content_json: body.content_json || null,
        content_json_zh: body.content_json_zh || null,
        metadata: body.metadata || {},
        department,
        tags,
        related_procedures: Array.isArray(body.related_procedures) ? body.related_procedures : [],
        sort_order: sortOrder,
        content_status: 'draft',
        content_source: 'manual',
        last_edited_by: admin.userId,
      })
      .select()
      .single();

    if (error) {
      return safeErrorResponse(error, '建立模組失敗');
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    return safeErrorResponse(error, '伺服器錯誤');
  }
}
