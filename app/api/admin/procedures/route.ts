// ================================================
// POST /api/admin/procedures — 新建程序
// ================================================

import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

/** 驗證管理員身份 */
async function verifyAdmin(): Promise<{ userId: string; role: string } | null> {
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return cookieStore.getAll(); },
          setAll() { /* Server Component */ },
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

export async function POST(request: NextRequest) {
  const admin = await verifyAdmin();
  if (!admin) {
    return NextResponse.json({ error: '未授權' }, { status: 401 });
  }

  try {
    const body = await request.json();

    const {
      name, name_zh, category, department, difficulty_level,
      estimated_duration_minutes, tags,
      content_json, content_json_zh,
      illustration_url, flow_diagram,
      // 純文字欄位（向後相容）
      indications, indications_zh, contraindications, contraindications_zh,
      equipment, equipment_zh, patient_preparation, patient_preparation_zh,
      technique, technique_zh, procedure_steps, procedure_steps_zh,
      aftercare, aftercare_zh, complications, complications_zh,
    } = body;

    if (!name) {
      return NextResponse.json({ error: '程序名稱為必填' }, { status: 400 });
    }

    // 產生 procedure_id
    const { count } = await supabaseServer
      .from('vt_procedures')
      .select('*', { count: 'exact', head: true });
    const nextId = `proc_${String((count ?? 0) + 1).padStart(3, '0')}`;

    const { data, error } = await supabaseServer
      .from('vt_procedures')
      .insert({
        procedure_id: nextId,
        name,
        name_zh: name_zh || null,
        category: category || 'A',
        department: department || 'general',
        page_number: 0,
        difficulty_level: difficulty_level || null,
        estimated_duration_minutes: estimated_duration_minutes || null,
        tags: tags || [],
        content_json: content_json || null,
        content_json_zh: content_json_zh || null,
        illustration_url: illustration_url || null,
        flow_diagram: flow_diagram || null,
        content_status: 'draft',
        content_source: 'manual',
        last_edited_by: admin.userId,
        // 純文字欄位
        indications, indications_zh,
        contraindications, contraindications_zh,
        equipment, equipment_zh,
        patient_preparation, patient_preparation_zh,
        technique, technique_zh,
        procedure_steps, procedure_steps_zh,
        aftercare, aftercare_zh,
        complications, complications_zh,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating procedure:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/admin/procedures:', error);
    return NextResponse.json({ error: '伺服器錯誤' }, { status: 500 });
  }
}
