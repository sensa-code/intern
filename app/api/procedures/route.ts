import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

const DEFAULT_PAGE_SIZE = 30;
const MAX_PAGE_SIZE = 100;

/**
 * GET /api/procedures
 * 伺服器端查詢程序列表（使用 service role 繞過 RLS）
 *
 * Query params:
 *   category   - 單字母分類篩選
 *   department - 專科分類篩選
 *   search     - 名稱 / 中文名 / tags 模糊搜尋
 *   page       - 頁碼（從 1 開始，預設 1）
 *   pageSize   - 每頁筆數（預設 30，最大 100）
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const department = searchParams.get('department');
    const search = searchParams.get('search');
    const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10) || 1);
    const pageSize = Math.min(
      MAX_PAGE_SIZE,
      Math.max(1, parseInt(searchParams.get('pageSize') ?? String(DEFAULT_PAGE_SIZE), 10) || DEFAULT_PAGE_SIZE),
    );

    // 計算 offset
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    let query = supabaseServer
      .from('vt_procedures')
      .select('*', { count: 'exact' })
      .order('name')
      .range(from, to);

    if (category) {
      query = query.eq('category', category);
    }

    if (department) {
      query = query.eq('department', department);
    }

    if (search) {
      // 搜尋範圍：英文名 + 中文名（P2-6: 未來可加 tags）
      query = query.or(`name.ilike.%${search}%,name_zh.ilike.%${search}%`);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error('Procedures API error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch procedures' },
        { status: 500 }
      );
    }

    const totalCount = count ?? 0;
    const totalPages = Math.ceil(totalCount / pageSize);

    return NextResponse.json({
      data: data ?? [],
      pagination: {
        page,
        pageSize,
        totalCount,
        totalPages,
      },
    });
  } catch (err) {
    console.error('Procedures API unexpected error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
