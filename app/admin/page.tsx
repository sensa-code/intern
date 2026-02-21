'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ClipboardList, Package, CheckCircle, AlertTriangle, Clock, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface DashboardStats {
  totalProcedures: number;
  byStatus: Record<string, number>;
  byDepartment: Record<string, number>;
  recentlyUpdated: { id: string; name: string; name_zh: string | null; updated_at: string; department: string }[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetch('/api/admin/stats');
        if (res.ok) {
          setStats(await res.json());
        }
      } catch {
        // silent
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  if (loading) {
    return <div className="animate-pulse space-y-4">
      <div className="h-8 bg-gray-200 rounded w-48" />
      <div className="grid grid-cols-4 gap-4">
        {[1,2,3,4].map(i => <div key={i} className="h-28 bg-gray-200 rounded-lg" />)}
      </div>
    </div>;
  }

  const verified = stats?.byStatus?.verified ?? 0;
  const needsReview = stats?.byStatus?.needs_review ?? 0;
  const draft = stats?.byStatus?.draft ?? 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">管理後台</h1>
          <p className="text-muted-foreground text-sm">VetTrainer 內容管理系統</p>
        </div>
        <Button asChild>
          <Link href="/admin/procedures/new">
            <Plus className="h-4 w-4 mr-2" />
            新建程序
          </Link>
        </Button>
      </div>

      {/* 統計卡片 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <ClipboardList className="h-6 w-6 mx-auto mb-2 text-blue-600" />
            <p className="text-2xl font-bold">{stats?.totalProcedures ?? 0}</p>
            <p className="text-xs text-muted-foreground">總程序數</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <CheckCircle className="h-6 w-6 mx-auto mb-2 text-green-600" />
            <p className="text-2xl font-bold">{verified}</p>
            <p className="text-xs text-muted-foreground">已審核</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <AlertTriangle className="h-6 w-6 mx-auto mb-2 text-amber-500" />
            <p className="text-2xl font-bold">{needsReview}</p>
            <p className="text-xs text-muted-foreground">待審核</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <Clock className="h-6 w-6 mx-auto mb-2 text-gray-400" />
            <p className="text-2xl font-bold">{draft}</p>
            <p className="text-xs text-muted-foreground">草稿</p>
          </CardContent>
        </Card>
      </div>

      {/* 快速操作 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <ClipboardList className="h-4 w-4" />
              程序管理
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" size="sm" className="w-full justify-start" asChild>
              <Link href="/admin/procedures">瀏覽全部程序（{stats?.totalProcedures ?? 0}）</Link>
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start" asChild>
              <Link href="/admin/procedures?status=needs_review">待審核佇列（{needsReview}）</Link>
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start" asChild>
              <Link href="/admin/procedures/new">新建程序</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Package className="h-4 w-4" />
              模組管理
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" size="sm" className="w-full justify-start" asChild>
              <Link href="/admin/modules">瀏覽全部模組</Link>
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start" asChild>
              <Link href="/admin/modules?type=drug_reference">藥物參考</Link>
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start" asChild>
              <Link href="/admin/modules?type=emergency_protocol">急診流程</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* 最近更新 */}
      {stats?.recentlyUpdated && stats.recentlyUpdated.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">最近更新</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {stats.recentlyUpdated.map(proc => (
                <Link
                  key={proc.id}
                  href={`/admin/procedures/${proc.id}/edit`}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium">{proc.name_zh ?? proc.name}</p>
                    <p className="text-xs text-muted-foreground">{proc.name}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {proc.department}
                  </Badge>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
