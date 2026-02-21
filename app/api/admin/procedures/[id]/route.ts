// ================================================
// PUT/DELETE /api/admin/procedures/[id] — 更新/刪除程序
// ================================================

import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

async function verifyAdmin(): Promise<{ userId: string; role: string } | null> {
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return cookieStore.getAll(); },
          setAll() { /* no-op */ },
        },
      }
    );
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

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

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await verifyAdmin();
  if (!admin) {
    return NextResponse.json({ error: '未授權' }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = await request.json();

    // 移除不該直接更新的欄位
    const { id: _id, created_at: _ca, procedure_id: _pid, ...updateData } = body;

    // 設定編輯者
    updateData.last_edited_by = admin.userId;
    updateData.updated_at = new Date().toISOString();

    const { data, error } = await supabaseServer
      .from('vt_procedures')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating procedure:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error in PUT:', error);
    return NextResponse.json({ error: '伺服器錯誤' }, { status: 500 });
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

  try {
    // 軟刪除
    const { error } = await supabaseServer
      .from('vt_procedures')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) {
      console.error('Error deleting procedure:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in DELETE:', error);
    return NextResponse.json({ error: '伺服器錯誤' }, { status: 500 });
  }
}
