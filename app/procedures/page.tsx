'use client';

// SEO 備註：此頁為 Client Component（互動搜尋/篩選），
// 無法 server-render。未來可遷移至 URL searchParams + Server Component。

import { useState, useEffect, useRef } from 'react';
import { ProcedureCard, ProcedureCardSkeleton } from '@/components/procedures/ProcedureCard';
import { useProcedures } from '@/lib/hooks/useProcedures';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, BookOpen } from 'lucide-react';

export default function ProceduresPage() {
  const [category, setCategory] = useState<string | undefined>();
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');

  // 300ms debounce：避免每次按鍵都觸發查詢
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
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">臨床程序資料庫</h1>
        <p className="text-muted-foreground">
          涵蓋 62 個 BSAVA 臨床程序，支援 A-Z 分類瀏覽與關鍵字搜尋
        </p>
      </div>

      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜尋程序名稱..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Tabs
        value={category || 'all'}
        onValueChange={(v) => setCategory(v === 'all' ? undefined : v)}
      >
        <TabsList className="flex-wrap h-auto gap-0.5">
          <TabsTrigger value="all">全部</TabsTrigger>
          {categories.map(cat => (
            <TabsTrigger key={cat} value={cat} className="min-w-[2rem]">
              {cat}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* 結果計數 */}
      {!loading && !error && (
        <p className="mt-4 text-sm text-muted-foreground">
          {procedures.length > 0
            ? `共 ${procedures.length} 個程序`
            : null}
        </p>
      )}

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          // Skeleton loading
          Array.from({ length: 6 }).map((_, i) => (
            <ProcedureCardSkeleton key={i} />
          ))
        ) : error ? (
          <div className="col-span-full text-center py-12">
            <p className="text-red-500 mb-2">載入失敗</p>
            <p className="text-sm text-muted-foreground">{error.message}</p>
          </div>
        ) : procedures.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <BookOpen className="mx-auto h-12 w-12 text-muted-foreground/30 mb-4" />
            <p className="text-lg text-muted-foreground mb-2">沒有找到符合條件的程序</p>
            <p className="text-sm text-muted-foreground">
              {search
                ? `找不到包含「${search}」的程序，請嘗試其他關鍵字`
                : '此分類下沒有程序'}
            </p>
          </div>
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
