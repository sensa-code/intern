import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { supabaseServer } from '@/lib/supabase/server';
import {
  BookOpen,
  GraduationCap,
  BarChart3,
  ArrowRight,
  Stethoscope,
  Languages,
} from 'lucide-react';

export const revalidate = 300; // ISR: revalidate every 5 minutes

/** 從資料庫取得統計數據 */
async function getStats() {
  try {
    const { count } = await supabaseServer
      .from('vt_procedures')
      .select('*', { count: 'exact', head: true });

    const { data: categories } = await supabaseServer
      .from('vt_procedures')
      .select('category');

    const uniqueCategories = new Set(
      categories?.map((c: { category: string }) => c.category) ?? []
    );

    return {
      procedureCount: count ?? 0,
      categoryCount: uniqueCategories.size,
    };
  } catch {
    return { procedureCount: 343, categoryCount: 26 };
  }
}

export default async function Home() {
  const stats = await getStats();

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm text-blue-700 bg-blue-50 mb-6">
              <Stethoscope className="h-4 w-4" />
              獸醫住院醫師訓練平台
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
              系統化學習<br className="sm:hidden" /> BSAVA 臨床程序
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              涵蓋 {stats.procedureCount} 個臨床程序，支援中英雙語切換，
              幫助獸醫住院醫師建立完整的臨床技能體系。
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg">
                <Link href="/procedures">
                  瀏覽程序資料庫
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/training">我的訓練計劃</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <Card className="text-center">
            <CardContent className="pt-6">
              <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-3xl font-bold text-blue-600">{stats.procedureCount}</p>
              <p className="text-sm text-gray-600 mt-1">臨床程序</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Languages className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-3xl font-bold text-green-600">中英雙語</p>
              <p className="text-sm text-gray-600 mt-1">一鍵切換</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <BarChart3 className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="text-3xl font-bold text-purple-600">A–Z</p>
              <p className="text-sm text-gray-600 mt-1">分類瀏覽</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          為什麼選擇 VetTrainer？
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">完整程序資料庫</h3>
            <p className="text-sm text-gray-600">
              收錄 {stats.procedureCount} 個犬貓臨床程序，
              包含適應症、禁忌症、設備、步驟等完整資訊。
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold mb-2">個人化訓練計劃</h3>
            <p className="text-sm text-gray-600">
              依據學習需求建立專屬訓練計劃，排程練習日程，追蹤每個程序的精通程度。
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mx-auto mb-4">
              <Languages className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold mb-2">中英雙語支援</h3>
            <p className="text-sm text-gray-600">
              所有程序內容支援繁體中文與英文切換，方便對照原文與翻譯內容。
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50">
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-xl md:text-2xl font-bold mb-4">
            準備好開始學習了嗎？
          </h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            立即瀏覽程序資料庫，開始您的臨床程序學習之旅。
          </p>
          <Button asChild size="lg">
            <Link href="/procedures">
              開始瀏覽
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
