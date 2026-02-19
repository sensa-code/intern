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
  Siren, Scissors, Bone, Wind, ScanLine, Heart,
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
                <Link href="/training">學習進度追蹤</Link>
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
              <p className="text-3xl font-bold text-purple-600">12+</p>
              <p className="text-sm text-gray-600 mt-1">專科分類</p>
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
            <h3 className="font-semibold mb-2">學習進度追蹤</h3>
            <p className="text-sm text-gray-600">
              自動記錄瀏覽過的程序，標記學習狀態，追蹤複習進度。無須登入，資料存於本機。
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

      {/* 科別預覽 Section (P2-4) */}
      <section className="bg-gray-50/50">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <h2 className="text-xl md:text-2xl font-bold text-center mb-8">
            涵蓋 12 個獸醫專科
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 max-w-4xl mx-auto">
            {[
              { icon: Siren, name: '急診與重症', color: 'text-red-600 bg-red-50' },
              { icon: Scissors, name: '軟組織外科', color: 'text-blue-600 bg-blue-50' },
              { icon: Bone, name: '骨科', color: 'text-amber-600 bg-amber-50' },
              { icon: Stethoscope, name: '內科', color: 'text-green-600 bg-green-50' },
              { icon: Wind, name: '麻醉與疼痛', color: 'text-purple-600 bg-purple-50' },
              { icon: Heart, name: '心肺科', color: 'text-rose-600 bg-rose-50' },
            ].map(({ icon: Icon, name, color }) => (
              <Link
                key={name}
                href="/procedures"
                className="flex flex-col items-center gap-2 p-4 rounded-lg border bg-white hover:shadow-md transition-shadow text-center"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-medium text-gray-700">{name}</span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-6">
            <Button asChild variant="link" className="text-sm">
              <Link href="/procedures">
                查看全部科別
                <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
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
