// ================================================
// GET /api/admin/stats — Admin 儀表板統計數據
// ================================================

import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/server';
import { verifyAdmin } from '@/lib/auth/verify-admin';

export async function GET() {
  // P0 修復：認證檢查 — 此 API 僅限 admin 存取
  const admin = await verifyAdmin();
  if (!admin) {
    return NextResponse.json({ error: '未授權' }, { status: 401 });
  }

  try {
    // 總數
    const { count: totalProcedures } = await supabaseServer
      .from('vt_procedures')
      .select('*', { count: 'exact', head: true })
      .is('deleted_at', null);

    // 按 content_status 分組
    const { data: allProcs } = await supabaseServer
      .from('vt_procedures')
      .select('id, department, content_status, updated_at')
      .is('deleted_at', null);

    const byStatus: Record<string, number> = {};
    const byDepartment: Record<string, number> = {};
    for (const proc of allProcs ?? []) {
      const status = proc.content_status ?? 'needs_review';
      byStatus[status] = (byStatus[status] ?? 0) + 1;
      const dept = proc.department ?? 'general';
      byDepartment[dept] = (byDepartment[dept] ?? 0) + 1;
    }

    // 模組統計
    const { count: totalModules } = await supabaseServer
      .from('vt_modules')
      .select('*', { count: 'exact', head: true })
      .is('deleted_at', null);

    // 最近更新的 10 筆
    const { data: recentlyUpdated } = await supabaseServer
      .from('vt_procedures')
      .select('id, name, name_zh, updated_at, department')
      .is('deleted_at', null)
      .order('updated_at', { ascending: false })
      .limit(10);

    return NextResponse.json({
      totalProcedures: totalProcedures ?? 0,
      totalModules: totalModules ?? 0,
      byStatus,
      byDepartment,
      recentlyUpdated: recentlyUpdated ?? [],
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json({ error: '伺服器錯誤' }, { status: 500 });
  }
}
