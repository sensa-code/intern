// ================================================
// GET /api/modules — 公開 API：取得已發布的模組
// ================================================

import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const moduleType = url.searchParams.get('type');
  const slug = url.searchParams.get('slug');

  try {
    let query = supabaseServer
      .from('vt_modules')
      .select('*')
      .is('deleted_at', null)
      .eq('content_status', 'verified')
      .order('sort_order', { ascending: true })
      .order('updated_at', { ascending: false });

    if (moduleType) query = query.eq('module_type', moduleType);
    if (slug) query = query.eq('slug', slug);

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching modules:', error);
      return NextResponse.json({ error: '載入模組失敗' }, { status: 500 });
    }

    return NextResponse.json({ data: data ?? [] });
  } catch (error) {
    console.error('Error in GET /api/modules:', error);
    return NextResponse.json({ error: '伺服器錯誤' }, { status: 500 });
  }
}
