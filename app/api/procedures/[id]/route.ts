import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

/**
 * GET /api/procedures/:id
 * 取得單一程序詳情（支援 UUID 和 proc_XXX 格式）
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: 'Missing procedure ID' },
        { status: 400 }
      );
    }

    let query = supabaseServer.from('vt_procedures').select('*');

    if (id.startsWith('proc_')) {
      query = query.eq('procedure_id', id);
    } else {
      query = query.eq('id', id);
    }

    const { data, error } = await query.single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Procedure not found' },
          { status: 404 }
        );
      }
      console.error('Procedure detail API error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch procedure' },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error('Procedure detail API unexpected error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
