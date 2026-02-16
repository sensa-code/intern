import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <main className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          找不到此頁面
        </h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          您所尋找的頁面不存在或已被移動。請確認網址是否正確，或返回首頁繼續瀏覽。
        </p>
        <div className="flex gap-3 justify-center">
          <Button asChild>
            <Link href="/">返回首頁</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/procedures">瀏覽程序</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
