'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  BookOpen, ArrowRight, CheckCircle2, Circle, RotateCcw,
  BarChart3, Clock, Trash2,
} from 'lucide-react';
import { getDepartmentById } from '@/lib/constants/departments';

// ============================================================
// localStorage 學習進度系統（無須登入）
// ============================================================

const STORAGE_KEY = 'vettrainer_progress';

interface ProcedureRecord {
  id: string;
  name: string;
  name_zh: string | null;
  department: string;
  /** 'not_started' | 'reading' | 'reviewed' */
  status: 'not_started' | 'reading' | 'reviewed';
  /** 最後瀏覽時間 ISO string */
  lastViewed: string;
  /** 瀏覽次數 */
  viewCount: number;
}

type ProgressStore = Record<string, ProcedureRecord>;

function loadProgress(): ProgressStore {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ProgressStore) : {};
  } catch {
    return {};
  }
}

function saveProgress(store: ProgressStore) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    // localStorage quota exceeded — 靜默失敗
  }
}

// ============================================================
// Page Component
// ============================================================

export default function TrainingPage() {
  const [progress, setProgress] = useState<ProgressStore>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setProgress(loadProgress());
    setMounted(true);
  }, []);

  const records = Object.values(progress).sort(
    (a, b) => new Date(b.lastViewed).getTime() - new Date(a.lastViewed).getTime(),
  );

  const reviewedCount = records.filter(r => r.status === 'reviewed').length;
  const readingCount = records.filter(r => r.status === 'reading').length;
  const totalViewed = records.length;

  /** 切換單一記錄的狀態 */
  function toggleStatus(id: string) {
    setProgress(prev => {
      const record = prev[id];
      if (!record) return prev;
      const next: ProcedureRecord['status'] =
        record.status === 'not_started' ? 'reading'
          : record.status === 'reading' ? 'reviewed'
            : 'reading';
      const updated = { ...prev, [id]: { ...record, status: next } };
      saveProgress(updated);
      return updated;
    });
  }

  /** 清除所有進度 */
  function clearAll() {
    setProgress({});
    saveProgress({});
  }

  // SSR guard
  if (!mounted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">學習進度追蹤</h1>
        <p className="text-muted-foreground">載入中...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* 標題 */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">學習進度追蹤</h1>
        <p className="text-muted-foreground">
          瀏覽程序時自動記錄，標記已複習的項目來追蹤學習進度。無須登入，資料存於本機。
        </p>
      </div>

      {/* 統計卡片 */}
      {totalViewed > 0 && (
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card className="text-center">
            <CardContent className="pt-6">
              <BookOpen className="h-6 w-6 text-blue-600 mx-auto mb-1" />
              <p className="text-2xl font-bold text-blue-600">{totalViewed}</p>
              <p className="text-xs text-muted-foreground">已瀏覽</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Clock className="h-6 w-6 text-amber-600 mx-auto mb-1" />
              <p className="text-2xl font-bold text-amber-600">{readingCount}</p>
              <p className="text-xs text-muted-foreground">學習中</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <CheckCircle2 className="h-6 w-6 text-green-600 mx-auto mb-1" />
              <p className="text-2xl font-bold text-green-600">{reviewedCount}</p>
              <p className="text-xs text-muted-foreground">已複習</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 進度條 */}
      {totalViewed > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>學習進度</span>
            <span>{reviewedCount} / 343 程序已複習（{Math.round((reviewedCount / 343) * 100)}%）</span>
          </div>
          <Progress value={(reviewedCount / 343) * 100} className="h-2" />
        </div>
      )}

      {/* 記錄列表 或 空狀態 */}
      {records.length === 0 ? (
        <div className="text-center py-16">
          <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground/30 mb-4" />
          <p className="text-lg text-muted-foreground mb-2">尚無學習紀錄</p>
          <p className="text-sm text-muted-foreground mb-6">
            瀏覽任意程序後，會自動出現在這裡。您可以標記為「學習中」或「已複習」來追蹤進度。
          </p>
          <Button asChild>
            <Link href="/procedures">
              瀏覽程序資料庫
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {records.map(record => {
              const dept = getDepartmentById(record.department);
              const statusIcon = record.status === 'reviewed'
                ? <CheckCircle2 className="h-4 w-4 text-green-500" />
                : record.status === 'reading'
                  ? <RotateCcw className="h-4 w-4 text-amber-500" />
                  : <Circle className="h-4 w-4 text-gray-300" />;
              const statusLabel = record.status === 'reviewed' ? '已複習'
                : record.status === 'reading' ? '學習中' : '未開始';

              return (
                <div
                  key={record.id}
                  className="flex items-center gap-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                >
                  {/* 狀態切換按鈕 */}
                  <button
                    onClick={() => toggleStatus(record.id)}
                    className="shrink-0"
                    aria-label={`切換狀態：${statusLabel}`}
                    title={`點擊切換狀態（目前：${statusLabel}）`}
                  >
                    {statusIcon}
                  </button>

                  {/* 名稱 */}
                  <Link
                    href={`/procedures/${record.id}`}
                    className="flex-1 min-w-0"
                  >
                    <p className="font-medium truncate hover:text-blue-600 transition-colors">
                      {record.name_zh || record.name}
                    </p>
                    {record.name_zh && (
                      <p className="text-xs text-muted-foreground truncate">{record.name}</p>
                    )}
                  </Link>

                  {/* 科別 badge */}
                  {dept && (
                    <Badge variant="outline" className={`text-xs shrink-0 hidden sm:inline-flex ${dept.colorClasses.badge}`}>
                      {dept.name_zh}
                    </Badge>
                  )}

                  {/* 瀏覽次數 */}
                  <span className="text-xs text-muted-foreground shrink-0">
                    {record.viewCount}次
                  </span>
                </div>
              );
            })}
          </div>

          {/* 底部操作 */}
          <div className="mt-8 pt-6 border-t flex items-center justify-between">
            <Button asChild variant="outline">
              <Link href="/procedures">
                <BookOpen className="mr-2 h-4 w-4" />
                瀏覽更多程序
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-red-600"
              onClick={clearAll}
            >
              <Trash2 className="mr-1 h-3 w-3" />
              清除紀錄
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
