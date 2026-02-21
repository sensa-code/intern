// ================================================
// POST /api/admin/procedures — 新建程序
// ================================================

import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/server';
import {
  verifyAdmin, checkCSRF, sanitizeString, safeErrorResponse,
} from '@/lib/auth/verify-admin';

export async function POST(request: NextRequest) {
  // CSRF 檢查
  if (!checkCSRF(request)) {
    return NextResponse.json({ error: '請求來源不合法' }, { status: 403 });
  }

  const admin = await verifyAdmin();
  if (!admin) {
    return NextResponse.json({ error: '未授權' }, { status: 401 });
  }

  try {
    const body = await request.json();

    // 基本驗證
    const name = typeof body.name === 'string' ? sanitizeString(body.name) : '';
    if (!name) {
      return NextResponse.json({ error: '程序英文名稱為必填' }, { status: 400 });
    }

    const nameZh = typeof body.name_zh === 'string' ? sanitizeString(body.name_zh) : null;
    const category = typeof body.category === 'string' && ['A', 'B', 'C', 'D'].includes(body.category)
      ? body.category : 'A';
    const department = typeof body.department === 'string' ? body.department : 'general';
    const difficultyLevel = typeof body.difficulty_level === 'number'
      && body.difficulty_level >= 1 && body.difficulty_level <= 5
      ? body.difficulty_level : null;
    const duration = typeof body.estimated_duration_minutes === 'number'
      && body.estimated_duration_minutes >= 1 && body.estimated_duration_minutes <= 600
      ? body.estimated_duration_minutes : null;
    const tags = Array.isArray(body.tags)
      ? body.tags.filter((t: unknown) => typeof t === 'string').slice(0, 20)
      : [];

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
        name_zh: nameZh,
        category,
        department,
        page_number: 0,
        difficulty_level: difficultyLevel,
        estimated_duration_minutes: duration,
        tags,
        content_json: body.content_json || null,
        content_json_zh: body.content_json_zh || null,
        illustration_url: typeof body.illustration_url === 'string' ? body.illustration_url : null,
        flow_diagram: typeof body.flow_diagram === 'string' ? body.flow_diagram : null,
        content_status: 'draft',
        content_source: 'manual',
        last_edited_by: admin.userId,
        // 純文字欄位（向後相容）
        indications: body.indications, indications_zh: body.indications_zh,
        contraindications: body.contraindications, contraindications_zh: body.contraindications_zh,
        equipment: body.equipment, equipment_zh: body.equipment_zh,
        patient_preparation: body.patient_preparation, patient_preparation_zh: body.patient_preparation_zh,
        technique: body.technique, technique_zh: body.technique_zh,
        procedure_steps: body.procedure_steps, procedure_steps_zh: body.procedure_steps_zh,
        aftercare: body.aftercare, aftercare_zh: body.aftercare_zh,
        complications: body.complications, complications_zh: body.complications_zh,
      })
      .select()
      .single();

    if (error) {
      return safeErrorResponse(error, '建立程序失敗');
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    return safeErrorResponse(error, '伺服器錯誤');
  }
}
