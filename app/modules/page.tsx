import React from 'react';
import Link from 'next/link';
import { supabaseServer } from '@/lib/supabase/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const revalidate = 60;

interface Module {
  id: string;
  module_type: string;
  title: string;
  title_zh: string | null;
  slug: string;
  description: string | null;
  description_zh: string | null;
  department: string;
}

const TYPE_META: Record<string, { name_zh: string; color: string }> = {
  drug_reference: { name_zh: '藥物參考', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  case_study: { name_zh: '臨床案例', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  anatomy_atlas: { name_zh: '解剖圖譜', color: 'bg-purple-50 text-purple-700 border-purple-200' },
  emergency_protocol: { name_zh: '急診流程', color: 'bg-red-50 text-red-700 border-red-200' },
  surgical_technique: { name_zh: '手術技巧', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  lab_reference: { name_zh: '檢驗參考值', color: 'bg-teal-50 text-teal-700 border-teal-200' },
  differential_diagnosis: { name_zh: '鑑別診斷', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
};

export default async function ModulesPage() {
  const { data: modules } = await supabaseServer
    .from('vt_modules')
    .select('id, module_type, title, title_zh, slug, description, description_zh, department')
    .is('deleted_at', null)
    .eq('content_status', 'verified')
    .order('sort_order', { ascending: true })
    .order('updated_at', { ascending: false });

  // 按類型分組
  const grouped = (modules ?? []).reduce<Record<string, Module[]>>((acc, mod) => {
    const type = mod.module_type;
    if (!acc[type]) acc[type] = [];
    acc[type].push(mod);
    return acc;
  }, {});

  const hasModules = (modules ?? []).length > 0;

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">獸醫知識模組</h1>
        <p className="text-muted-foreground mt-1">
          臨床藥物參考、案例分析、急診流程、解剖圖譜等專業知識庫
        </p>
      </div>

      {!hasModules ? (
        <div className="text-center py-20 text-muted-foreground">
          <p className="text-lg">知識模組正在建置中</p>
          <p className="text-sm mt-2">敬請期待，獸醫團隊正在編撰專業內容</p>
        </div>
      ) : (
        <div className="space-y-10">
          {Object.entries(grouped).map(([type, mods]) => {
            const meta = TYPE_META[type];
            return (
              <section key={type}>
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Badge variant="outline" className={meta?.color ?? ''}>
                    {meta?.name_zh ?? type}
                  </Badge>
                  <span className="text-muted-foreground text-sm">（{mods.length}）</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mods.map(mod => (
                    <Link key={mod.id} href={`/modules/${mod.slug}`}>
                      <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">
                            {mod.title_zh ?? mod.title}
                          </CardTitle>
                          {mod.title_zh && (
                            <p className="text-xs text-muted-foreground">{mod.title}</p>
                          )}
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {mod.description_zh ?? mod.description ?? ''}
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
