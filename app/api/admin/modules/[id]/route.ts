// ================================================
// GET/PUT/DELETE /api/admin/modules/[id]
// ================================================

import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/server';
import {
  verifyAdmin, isValidUUID, checkCSRF, safeErrorResponse,
  isValidModuleType, sanitizeString,
} from '@/lib/auth/verify-admin';

// P1 #7: 單筆讀取 — 後台編輯頁直接取得
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await verifyAdmin();
  if (!admin) {
    return NextResponse.json({ error: '未授權' }, { status: 401 });
  }

  const { id } = await params;

  if (!isValidUUID(id)) {
    return NextResponse.json({ error: '無效的 ID 格式' }, { status: 400 });
  }

  const { data, error } = await supabaseServer
    .from('vt_modules')
    .select('*')
    .eq('id', id)
    .is('deleted_at', null)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: '找不到該模組' }, { status: 404 });
  }

  return NextResponse.json({ data });
}

// P1 #6: PUT 使用欄位白名單，防止 mass assignment
const ALLOWED_MODULE_FIELDS = new Set([
  'module_type', 'title', 'title_zh',
  'description', 'description_zh',
  'department', 'tags', 'related_procedures',
  'content_json', 'content_json_zh',
  'metadata', 'content_status', 'sort_order',
]);

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkCSRF(request)) {
    return NextResponse.json({ error: '請求來源不合法' }, { status: 403 });
  }

  const admin = await verifyAdmin();
  if (!admin) {
    return NextResponse.json({ error: '未授權' }, { status: 401 });
  }

  const { id } = await params;

  if (!isValidUUID(id)) {
    return NextResponse.json({ error: '無效的 ID 格式' }, { status: 400 });
  }

  try {
    // 確認記錄存在且未刪除
    const { data: existing } = await supabaseServer
      .from('vt_modules')
      .select('id')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (!existing) {
      return NextResponse.json({ error: '找不到該模組' }, { status: 404 });
    }

    const body = await request.json();

    // P1 #6: 只允許白名單欄位通過
    const updateData: Record<string, unknown> = {};
    for (const key of Object.keys(body)) {
      if (ALLOWED_MODULE_FIELDS.has(key)) {
        const value = body[key];
        // 驗證 module_type 合法性
        if (key === 'module_type' && typeof value === 'string' && !isValidModuleType(value)) {
          return NextResponse.json({ error: '無效的模組類型' }, { status: 400 });
        }
        // 對字串欄位做 sanitize
        if (typeof value === 'string') {
          updateData[key] = sanitizeString(value);
        } else {
          updateData[key] = value;
        }
      }
    }

    // sort_order 範圍驗證
    if ('sort_order' in updateData && typeof updateData.sort_order === 'number') {
      updateData.sort_order = Math.max(0, Math.min(9999, updateData.sort_order));
    }

    // 系統欄位
    updateData.last_edited_by = admin.userId;
    updateData.updated_at = new Date().toISOString();

    const { data, error } = await supabaseServer
      .from('vt_modules')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return safeErrorResponse(error, '更新模組失敗');
    }

    return NextResponse.json({ data });
  } catch (error) {
    return safeErrorResponse(error, '伺服器錯誤');
  }
}

// P1 #3: DELETE 限制只有 super_admin 可刪除
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkCSRF(request)) {
    return NextResponse.json({ error: '請求來源不合法' }, { status: 403 });
  }

  const admin = await verifyAdmin();
  if (!admin) {
    return NextResponse.json({ error: '未授權' }, { status: 401 });
  }

  // 只有 super_admin 可以刪除
  if (admin.role !== 'super_admin') {
    return NextResponse.json({ error: '只有超級管理員可以刪除模組' }, { status: 403 });
  }

  const { id } = await params;

  if (!isValidUUID(id)) {
    return NextResponse.json({ error: '無效的 ID 格式' }, { status: 400 });
  }

  try {
    const { data: existing } = await supabaseServer
      .from('vt_modules')
      .select('id')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (!existing) {
      return NextResponse.json({ error: '找不到該模組' }, { status: 404 });
    }

    const { error } = await supabaseServer
      .from('vt_modules')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) {
      return safeErrorResponse(error, '刪除模組失敗');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return safeErrorResponse(error, '伺服器錯誤');
  }
}
