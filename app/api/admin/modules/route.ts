// ================================================
// GET /api/admin/modules — 列出所有模組（含草稿）
// POST /api/admin/modules — 新建模組
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

export async function GET(request: NextRequest) {
  const admin = await verifyAdmin();
  if (!admin) {
    return NextResponse.json({ error: '未授權' }, { status: 401 });
  }

  const url = new URL(request.url);
  const moduleType = url.searchParams.get('type');
  const status = url.searchParams.get('status');

  let query = supabaseServer
    .from('vt_modules')
    .select('*')
    .is('deleted_at', null)
    .order('sort_order', { ascending: true })
    .order('updated_at', { ascending: false });

  if (moduleType) query = query.eq('module_type', moduleType);
  if (status) query = query.eq('content_status', status);

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching modules:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data: data ?? [] });
}

export async function POST(request: NextRequest) {
  const admin = await verifyAdmin();
  if (!admin) {
    return NextResponse.json({ error: '未授權' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      module_type, title, title_zh, description, description_zh,
      content_json, content_json_zh, metadata,
      department, tags, related_procedures, sort_order,
    } = body;

    if (!module_type || !title) {
      return NextResponse.json({ error: '模組類型和標題為必填' }, { status: 400 });
    }

    // 產生 slug
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      + '-' + Date.now().toString(36);

    const { data, error } = await supabaseServer
      .from('vt_modules')
      .insert({
        module_type,
        title,
        title_zh: title_zh || null,
        slug,
        description: description || null,
        description_zh: description_zh || null,
        content_json: content_json || null,
        content_json_zh: content_json_zh || null,
        metadata: metadata || {},
        department: department || 'general',
        tags: tags || [],
        related_procedures: related_procedures || [],
        sort_order: sort_order || 0,
        content_status: 'draft',
        content_source: 'manual',
        last_edited_by: admin.userId,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating module:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/admin/modules:', error);
    return NextResponse.json({ error: '伺服器錯誤' }, { status: 500 });
  }
}
