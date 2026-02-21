// ================================================
// GET /api/admin/stats — Admin 儀表板統計數據
// ================================================

import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/server';

export async function GET() {
  try {
    // 總數
    const { count: totalProcedures } = await supabaseServer
      .from('vt_procedures')
      .select('*', { count: 'exact', head: true });

    // 按 content_status 分組（如果欄位還沒 migrate，全部算 needs_review）
    const { data: allProcs } = await supabaseServer
      .from('vt_procedures')
      .select('id, department, content_status, updated_at');

    const byStatus: Record<string, number> = {};
    const byDepartment: Record<string, number> = {};
    for (const proc of allProcs ?? []) {
      const status = proc.content_status ?? 'needs_review';
      byStatus[status] = (byStatus[status] ?? 0) + 1;
      const dept = proc.department ?? 'general';
      byDepartment[dept] = (byDepartment[dept] ?? 0) + 1;
    }

    // 最近更新的 10 筆
    const { data: recentlyUpdated } = await supabaseServer
      .from('vt_procedures')
      .select('id, name, name_zh, updated_at, department')
      .order('updated_at', { ascending: false })
      .limit(10);

    return NextResponse.json({
      totalProcedures: totalProcedures ?? 0,
      byStatus,
      byDepartment,
      recentlyUpdated: recentlyUpdated ?? [],
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json({ error: '伺服器錯誤' }, { status: 500 });
  }
}
