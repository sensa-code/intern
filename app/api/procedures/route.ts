import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

/**
 * GET /api/procedures
 * 伺服器端查詢程序列表（使用 service role 繞過 RLS）
 *
 * Query params:
 *   category - 單字母分類篩選
 *   search   - 名稱模糊搜尋
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    let query = supabaseServer
      .from('vt_procedures')
      .select('*')
      .order('name');

    if (category) {
      query = query.eq('category', category);
    }

    if (search) {
      query = query.or(`name.ilike.%${search}%,name_zh.ilike.%${search}%`);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Procedures API error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch procedures' },
        { status: 500 }
      );
    }

    return NextResponse.json(data ?? []);
  } catch (err) {
    console.error('Procedures API unexpected error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
