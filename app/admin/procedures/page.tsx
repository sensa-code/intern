'use client';

import React, { useEffect, useState, useCallback, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Plus, Search, Filter, Edit, Trash2, Loader2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { DEPARTMENTS, getDepartmentById } from '@/lib/constants/departments';

interface ProcedureRow {
  id: string;
  procedure_id: string;
  name: string;
  name_zh: string | null;
  department: string;
  category: string;
  difficulty_level: number | null;
  content_status: string | null;
  updated_at: string;
  tags: string[] | null;
}

const STATUS_MAP: Record<string, { label: string; variant: 'default' | 'secondary' | 'outline' | 'destructive' }> = {
  draft: { label: '草稿', variant: 'secondary' },
  needs_review: { label: '待審核', variant: 'outline' },
  verified: { label: '已審核', variant: 'default' },
};

export default function AdminProceduresPage() {
  return (
    <Suspense fallback={<div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>}>
      <AdminProceduresList />
    </Suspense>
  );
}

function AdminProceduresList() {
  const searchParams = useSearchParams();
  const statusFilter = searchParams.get('status') ?? '';

  const [procedures, setProcedures] = useState<ProcedureRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('');
  const [currentStatus, setCurrentStatus] = useState(statusFilter);
  const [deleting, setDeleting] = useState<string | null>(null);

  const loadProcedures = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (deptFilter) params.set('department', deptFilter);
      if (currentStatus) params.set('status', currentStatus);
      params.set('pageSize', '500');

      const res = await fetch(`/api/procedures?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setProcedures(data.data ?? []);
      }
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, [search, deptFilter, currentStatus]);

  useEffect(() => {
    loadProcedures();
  }, [loadProcedures]);

  async function handleDelete(id: string, name: string) {
    if (!confirm(`確定要刪除「${name}」嗎？此操作為軟刪除，可恢復。`)) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/admin/procedures/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProcedures(prev => prev.filter(p => p.id !== id));
      }
    } catch {
      alert('刪除失敗');
    } finally {
      setDeleting(null);
    }
  }

  return (
    <div className="space-y-6">
      {/* 頁首 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">程序管理</h1>
          <p className="text-muted-foreground text-sm">管理所有獸醫臨床程序（共 {procedures.length} 筆）</p>
        </div>
        <Button asChild>
          <Link href="/admin/procedures/new">
            <Plus className="h-4 w-4 mr-2" />
            新建程序
          </Link>
        </Button>
      </div>

      {/* 篩選列 */}
      <Card>
        <CardContent className="pt-4 pb-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="搜尋程序名稱..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="border rounded-md px-3 py-2 text-sm bg-white"
            >
              <option value="">全部科別</option>
              {DEPARTMENTS.map(d => (
                <option key={d.id} value={d.id}>{d.name_zh}</option>
              ))}
            </select>
            <select
              value={currentStatus}
              onChange={(e) => setCurrentStatus(e.target.value)}
              className="border rounded-md px-3 py-2 text-sm bg-white"
            >
              <option value="">全部狀態</option>
              <option value="draft">草稿</option>
              <option value="needs_review">待審核</option>
              <option value="verified">已審核</option>
            </select>
            <Button variant="outline" size="sm" onClick={loadProcedures}>
              <Filter className="h-4 w-4 mr-1" />
              篩選
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 列表 */}
      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : procedures.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p>沒有找到符合條件的程序</p>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden bg-white">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-3 font-medium">名稱</th>
                <th className="text-left p-3 font-medium w-28">科別</th>
                <th className="text-left p-3 font-medium w-24">狀態</th>
                <th className="text-left p-3 font-medium w-32">更新時間</th>
                <th className="text-right p-3 font-medium w-32">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {procedures.map((proc) => {
                const dept = getDepartmentById(proc.department);
                const status = STATUS_MAP[proc.content_status ?? 'needs_review'] ?? STATUS_MAP.needs_review;
                return (
                  <tr key={proc.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-3">
                      <div>
                        <p className="font-medium">{proc.name_zh ?? proc.name}</p>
                        <p className="text-xs text-muted-foreground">{proc.name}</p>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge variant="outline" className={`text-xs ${dept?.colorClasses.badge ?? ''}`}>
                        {dept?.name_zh ?? proc.department}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <Badge variant={status.variant} className="text-xs">
                        {status.label}
                      </Badge>
                    </td>
                    <td className="p-3 text-xs text-muted-foreground">
                      {new Date(proc.updated_at).toLocaleDateString('zh-TW')}
                    </td>
                    <td className="p-3">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
                          <Link href={`/procedures/${proc.procedure_id}`} title="前台預覽">
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
                          <Link href={`/admin/procedures/${proc.id}/edit`} title="編輯">
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleDelete(proc.id, proc.name_zh ?? proc.name)}
                          disabled={deleting === proc.id}
                          title="刪除"
                        >
                          {deleting === proc.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
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
