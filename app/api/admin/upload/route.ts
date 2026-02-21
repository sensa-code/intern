// ================================================
// POST /api/admin/upload — 圖片上傳到 Supabase Storage
// ================================================

import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/gif'];
const BUCKET_NAME = 'vt-images';

async function verifyAdmin(): Promise<boolean> {
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
    if (!user) return false;

    const { data: roleData } = await supabaseServer
      .from('vt_user_roles')
      .select('role')
      .eq('user_id', user.id)
      .single();

    return !!roleData && ['super_admin', 'editor'].includes(roleData.role);
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: '未授權' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const folder = (formData.get('folder') as string) || 'general';

    if (!file) {
      return NextResponse.json({ error: '未選擇檔案' }, { status: 400 });
    }

    // 驗證檔案類型
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: `不支援的檔案格式。允許：PNG, JPG, WebP, GIF` },
        { status: 400 }
      );
    }

    // 驗證檔案大小
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `檔案過大。最大允許 5MB` },
        { status: 400 }
      );
    }

    // 產生檔案路徑
    const ext = file.name.split('.').pop()?.toLowerCase() || 'png';
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const filePath = `${folder}/${fileName}`;

    // 上傳到 Supabase Storage
    const buffer = await file.arrayBuffer();
    const { data, error } = await supabaseServer.storage
      .from(BUCKET_NAME)
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      console.error('Storage upload error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // 取得公開 URL
    const { data: urlData } = supabaseServer.storage
      .from(BUCKET_NAME)
      .getPublicUrl(data.path);

    return NextResponse.json({
      url: urlData.publicUrl,
      path: data.path,
    });
  } catch (error) {
    console.error('Error in upload:', error);
    return NextResponse.json({ error: '上傳失敗' }, { status: 500 });
  }
}
