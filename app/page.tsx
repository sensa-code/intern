import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 text-gray-900">
            獸醫住院醫師訓練系統
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            基於 BSAVA 臨床程序指南的個人化訓練計劃管理
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/procedures">
                瀏覽程序
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/training">
                我的訓練計劃
              </Link>
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold text-blue-600 mb-2">62+</h3>
              <p className="text-gray-600">臨床程序</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold text-green-600 mb-2">A-Z</h3>
              <p className="text-gray-600">分類瀏覽</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold text-purple-600 mb-2">100%</h3>
              <p className="text-gray-600">進度追蹤</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
