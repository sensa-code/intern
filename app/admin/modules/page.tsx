'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, Loader2, Eye, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { MODULE_TYPES, getModuleType } from '@/lib/constants/modules';

interface ModuleRow {
  id: string;
  module_type: string;
  title: string;
  title_zh: string | null;
  slug: string;
  department: string;
  content_status: string;
  updated_at: string;
}

const STATUS_MAP: Record<string, { label: string; variant: 'default' | 'secondary' | 'outline' }> = {
  draft: { label: '草稿', variant: 'secondary' },
  needs_review: { label: '待審核', variant: 'outline' },
  verified: { label: '已發布', variant: 'default' },
};

export default function AdminModulesPage() {
  const [modules, setModules] = useState<ModuleRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState('');
  const [deleting, setDeleting] = useState<string | null>(null);

  const loadModules = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (typeFilter) params.set('type', typeFilter);
      const res = await fetch(`/api/admin/modules?${params.toString()}`);
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || `HTTP ${res.status}`);
      }
      const data = await res.json();
      setModules(data.data ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : '載入模組列表失敗');
    } finally {
      setLoading(false);
    }
  }, [typeFilter]);

  useEffect(() => { loadModules(); }, [loadModules]);

  async function handleDelete(id: string, title: string) {
    if (!confirm(`確定要刪除模組「${title}」嗎？`)) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/admin/modules/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || '刪除失敗');
      }
      setModules(prev => prev.filter(m => m.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : '刪除失敗');
    } finally {
      setDeleting(null);
    }
  }

  // 按類型分組計數
  const typeCounts = modules.reduce<Record<string, number>>((acc, m) => {
    acc[m.module_type] = (acc[m.module_type] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">模組管理</h1>
          <p className="text-muted-foreground text-sm">管理獸醫知識模組（共 {modules.length} 個）</p>
        </div>
        <Button asChild>
          <Link href="/admin/modules/new">
            <Plus className="h-4 w-4 mr-2" />
            新建模組
          </Link>
        </Button>
      </div>

      {/* 類型卡片 */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {MODULE_TYPES.map(mt => (
          <Card
            key={mt.id}
            className={`cursor-pointer transition-all hover:shadow-md ${typeFilter === mt.id ? 'ring-2 ring-blue-500' : ''}`}
            onClick={() => setTypeFilter(typeFilter === mt.id ? '' : mt.id)}
          >
            <CardContent className="pt-4 pb-3 text-center">
              <Package className="h-5 w-5 mx-auto mb-1.5 text-gray-500" />
              <p className="text-xs font-medium">{mt.name_zh}</p>
              <p className="text-lg font-bold mt-1">{typeCounts[mt.id] ?? 0}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 錯誤提示 */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-between">
          <p className="text-sm text-red-700">{error}</p>
          <Button variant="ghost" size="sm" onClick={loadModules}>重試</Button>
        </div>
      )}

      {/* 列表 */}
      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : modules.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <Package className="h-12 w-12 mx-auto mb-3 text-gray-300" />
          <p>尚無模組</p>
          <Button asChild className="mt-3" variant="outline" size="sm">
            <Link href="/admin/modules/new">建立第一個模組</Link>
          </Button>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden bg-white">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-3 font-medium">模組名稱</th>
                <th className="text-left p-3 font-medium w-28">類型</th>
                <th className="text-left p-3 font-medium w-24">狀態</th>
                <th className="text-left p-3 font-medium w-32">更新時間</th>
                <th className="text-right p-3 font-medium w-28">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {modules.map(mod => {
                const mt = getModuleType(mod.module_type);
                const status = STATUS_MAP[mod.content_status] ?? STATUS_MAP.draft;
                return (
                  <tr key={mod.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-3">
                      <p className="font-medium">{mod.title_zh ?? mod.title}</p>
                      <p className="text-xs text-muted-foreground">{mod.title}</p>
                    </td>
                    <td className="p-3">
                      <Badge variant="outline" className={`text-xs ${mt?.color ?? ''}`}>
                        {mt?.name_zh ?? mod.module_type}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <Badge variant={status.variant} className="text-xs">{status.label}</Badge>
                    </td>
                    <td className="p-3 text-xs text-muted-foreground">
                      {new Date(mod.updated_at).toLocaleDateString('zh-TW')}
                    </td>
                    <td className="p-3">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
                          <Link href={`/modules/${mod.slug}`} title="預覽"><Eye className="h-4 w-4" /></Link>
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
                          <Link href={`/admin/modules/${mod.id}/edit`} title="編輯"><Edit className="h-4 w-4" /></Link>
                        </Button>
                        <Button
                          variant="ghost" size="sm"
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleDelete(mod.id, mod.title_zh ?? mod.title)}
                          disabled={deleting === mod.id}
                        >
                          {deleting === mod.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
