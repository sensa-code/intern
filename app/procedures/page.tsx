'use client';

import { useState } from 'react';
import { ProcedureCard } from '@/components/procedures/ProcedureCard';
import { useProcedures } from '@/lib/hooks/useProcedures';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ProceduresPage() {
  const [category, setCategory] = useState<string | undefined>();
  const [search, setSearch] = useState('');

  const { procedures, loading, error } = useProcedures({ category, search });

  const categories = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">臨床程序資料庫</h1>

      <div className="mb-6">
        <Input
          placeholder="搜尋程序..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-md"
        />
      </div>

      <Tabs value={category || 'all'} onValueChange={(v) => setCategory(v === 'all' ? undefined : v)}>
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
          <p className="text-gray-500">載入中...</p>
        ) : error ? (
          <p className="text-red-500">載入失敗：{error.message}</p>
        ) : procedures.length === 0 ? (
          <p className="text-gray-500">沒有找到程序</p>
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
