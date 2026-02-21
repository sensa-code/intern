// ================================================
// POST /api/admin/upload — 圖片上傳到 Supabase Storage
// ================================================

import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { supabaseServer } from '@/lib/supabase/server';
import { verifyAdmin, checkCSRF } from '@/lib/auth/verify-admin';

export const runtime = 'nodejs'; // 需要 crypto 模組

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/gif'];
const ALLOWED_EXTENSIONS = ['png', 'jpg', 'jpeg', 'webp', 'gif'];
const BUCKET_NAME = 'vt-images';

// 透過 magic bytes 驗證檔案真實類型
const MAGIC_BYTES: Record<string, number[]> = {
  'image/png':  [0x89, 0x50, 0x4E, 0x47],
  'image/jpeg': [0xFF, 0xD8, 0xFF],
  'image/gif':  [0x47, 0x49, 0x46, 0x38],
  'image/webp': [0x52, 0x49, 0x46, 0x46], // RIFF header
};

function detectMimeType(buffer: ArrayBuffer): string | null {
  const bytes = new Uint8Array(buffer, 0, 12);
  for (const [mime, magic] of Object.entries(MAGIC_BYTES)) {
    if (magic.every((byte, i) => bytes[i] === byte)) {
      // WebP 需要額外檢查第 8-11 byte 是 "WEBP"
      if (mime === 'image/webp') {
        if (bytes[8] !== 0x57 || bytes[9] !== 0x45 || bytes[10] !== 0x42 || bytes[11] !== 0x50) {
          continue;
        }
      }
      return mime;
    }
  }
  return null;
}

export async function POST(request: NextRequest) {
  if (!checkCSRF(request)) {
    return NextResponse.json({ error: '請求來源不合法' }, { status: 403 });
  }

  const admin = await verifyAdmin();
  if (!admin) {
    return NextResponse.json({ error: '未授權' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const folder = (formData.get('folder') as string) || 'general';

    if (!file) {
      return NextResponse.json({ error: '未選擇檔案' }, { status: 400 });
    }

    // 1. 驗證 MIME 類型（客戶端提供，可能被偽造）
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: '不支援的檔案格式。允許：PNG, JPG, WebP, GIF' },
        { status: 400 }
      );
    }

    // 2. 驗證檔案大小
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: '檔案過大。最大允許 5MB' },
        { status: 400 }
      );
    }

    // 3. 驗證副檔名
    const ext = file.name.split('.').pop()?.toLowerCase() || '';
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return NextResponse.json(
        { error: '不允許的副檔名' },
        { status: 400 }
      );
    }

    // 4. 讀取檔案並用 magic bytes 驗證真實類型
    const buffer = await file.arrayBuffer();
    const detectedMime = detectMimeType(buffer);

    if (!detectedMime || !ALLOWED_TYPES.includes(detectedMime)) {
      return NextResponse.json(
        { error: '檔案內容不符合聲明的格式' },
        { status: 400 }
      );
    }

    // 5. 使用 crypto UUID 產生不可預測的檔名
    const safeFolder = folder.replace(/[^a-z0-9_-]/gi, '');
    const fileName = `${randomUUID()}.${ext}`;
    const filePath = `${safeFolder}/${fileName}`;

    // 上傳到 Supabase Storage
    const { data, error } = await supabaseServer.storage
      .from(BUCKET_NAME)
      .upload(filePath, buffer, {
        contentType: detectedMime,
        upsert: false,
      });

    if (error) {
      console.error('Storage upload error:', error);
      return NextResponse.json({ error: '上傳失敗，請稍後再試' }, { status: 500 });
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
