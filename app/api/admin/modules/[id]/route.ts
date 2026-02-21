// ================================================
// PUT/DELETE /api/admin/modules/[id]
// ================================================

import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/server';
import {
  verifyAdmin, isValidUUID, checkCSRF, safeErrorResponse,
} from '@/lib/auth/verify-admin';

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
    const { id: _id, created_at: _ca, slug: _slug, ...updateData } = body;

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

export async function DELETE(
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

  try {
    // 確認記錄存在
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
