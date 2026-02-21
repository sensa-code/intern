'use client';

import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, Link as LinkIcon, Loader2, X } from 'lucide-react';

interface ImageUploadDialogProps {
  open: boolean;
  onClose: () => void;
  onInsert: (url: string, alt?: string) => void;
}

type UploadMode = 'upload' | 'url';

export function ImageUploadDialog({ open, onClose, onInsert }: ImageUploadDialogProps) {
  const [mode, setMode] = useState<UploadMode>('upload');
  const [url, setUrl] = useState('');
  const [alt, setAlt] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!open) return null;

  function reset() {
    setUrl('');
    setAlt('');
    setError('');
    setUploading(false);
    setMode('upload');
  }

  function handleClose() {
    reset();
    onClose();
  }

  async function handleFileUpload(file: File) {
    setError('');
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'procedures');

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || '上傳失敗');
      }

      const { url: imageUrl } = await res.json();
      onInsert(imageUrl, alt || file.name);
      handleClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : '上傳失敗');
    } finally {
      setUploading(false);
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  }

  function handleUrlInsert() {
    if (!url.trim()) {
      setError('請輸入圖片網址');
      return;
    }
    onInsert(url.trim(), alt || undefined);
    handleClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={handleClose}>
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 標題 */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">插入圖片</h3>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={handleClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* 模式切換 */}
        <div className="flex gap-2">
          <Button
            variant={mode === 'upload' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setMode('upload')}
            className="flex-1"
          >
            <Upload className="h-4 w-4 mr-1.5" />
            上傳檔案
          </Button>
          <Button
            variant={mode === 'url' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setMode('url')}
            className="flex-1"
          >
            <LinkIcon className="h-4 w-4 mr-1.5" />
            圖片網址
          </Button>
        </div>

        {/* 替代文字 */}
        <div className="space-y-1.5">
          <Label htmlFor="img-alt" className="text-sm">替代文字（選填）</Label>
          <Input
            id="img-alt"
            placeholder="描述圖片內容..."
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
          />
        </div>

        {/* 上傳模式 */}
        {mode === 'upload' && (
          <div className="space-y-3">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif"
              className="hidden"
              onChange={handleFileChange}
            />
            <Button
              variant="outline"
              className="w-full h-24 border-dashed flex flex-col gap-2"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
            >
              {uploading ? (
                <>
                  <Loader2 className="h-6 w-6 animate-spin" />
                  <span className="text-xs">上傳中...</span>
                </>
              ) : (
                <>
                  <Upload className="h-6 w-6 text-gray-400" />
                  <span className="text-xs text-gray-500">點擊或拖曳圖片（PNG/JPG/WebP/GIF，≤5MB）</span>
                </>
              )}
            </Button>
          </div>
        )}

        {/* URL 模式 */}
        {mode === 'url' && (
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="img-url" className="text-sm">圖片網址</Label>
              <Input
                id="img-url"
                placeholder="https://..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <Button className="w-full" onClick={handleUrlInsert}>
              插入圖片
            </Button>
          </div>
        )}

        {/* 錯誤 */}
        {error && (
          <p className="text-sm text-red-600 bg-red-50 p-2 rounded">{error}</p>
        )}
      </div>
    </div>
  );
}
