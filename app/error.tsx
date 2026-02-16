'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <main className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-5xl font-bold text-red-200 mb-4">錯誤</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          頁面載入時發生問題
        </h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          很抱歉，系統在處理您的請求時遇到錯誤。請嘗試重新載入頁面。
        </p>
        <div className="flex gap-3 justify-center">
          <Button onClick={reset}>重新載入</Button>
          <Button variant="outline" onClick={() => window.location.href = '/'}>
            返回首頁
          </Button>
        </div>
      </div>
    </main>
  );
}
