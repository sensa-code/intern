'use client';

// SEO 備註：此頁為 Client Component（互動搜尋/篩選），
// 無法 server-render。未來可遷移至 URL searchParams + Server Component。

import { useState, useEffect, useRef } from 'react';
import { ProcedureCard } from '@/components/procedures/ProcedureCard';
import { useProcedures } from '@/lib/hooks/useProcedures';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ProceduresPage() {
  const [category, setCategory] = useState<string | undefined>();
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');

  // 300ms debounce：避免每次按鍵都觸發 Supabase 查詢
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    debounceTimer.current = setTimeout(() => {
      setSearch(searchInput);
    }, 300);
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [searchInput]);

  const { procedures, loading, error } = useProcedures({ category, search });

  const categories = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">臨床程序資料庫</h1>

      <div className="mb-6">
        <Input
          placeholder="搜尋程序..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="max-w-md"
        />
      </div>

      <Tabs
        value={category || 'all'}
        onValueChange={(v) => setCategory(v === 'all' ? undefined : v)}
      >
        <TabsList className="flex-wrap h-auto">
          <TabsTrigger value="all">全部</TabsTrigger>
          {categories.map(cat => (
            <TabsTrigger key={cat} value={cat}>
              {cat}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div role="status" aria-label="載入程序列表" className="col-span-full">
            <p className="text-gray-500">載入中...</p>
          </div>
        ) : error ? (
          <p className="text-red-500 col-span-full">載入失敗：{error.message}</p>
        ) : procedures.length === 0 ? (
          <p className="text-gray-500 col-span-full">沒有找到程序</p>
        ) : (
          procedures.map(procedure => (
            <ProcedureCard
              key={procedure.id}
              procedure={procedure}
              showProgress
            />
          ))
        )}
      </div>
    </div>
  );
}
