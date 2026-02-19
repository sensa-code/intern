'use client';

// SEO 備註：此頁為 Client Component（互動搜尋/篩選），
// 無法 server-render。未來可遷移至 URL searchParams + Server Component。

import { useState, useEffect, useRef } from 'react';
import {
  Siren, Scissors, Bone, Stethoscope, Wind, ScanLine,
  Heart, Brain, Eye, Palette, Microscope, ClipboardList,
  BookOpen, Search, LayoutGrid,
} from 'lucide-react';
import { ProcedureCard, ProcedureCardSkeleton } from '@/components/procedures/ProcedureCard';
import { useProcedures } from '@/lib/hooks/useProcedures';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DEPARTMENTS, type Department } from '@/lib/constants/departments';

/** lucide icon 名稱 → 元件映射 */
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Siren, Scissors, Bone, Stethoscope, Wind, ScanLine,
  Heart, Brain, Eye, Palette, Microscope, ClipboardList, BookOpen,
};

function DepartmentIcon({ name, className }: { name: string; className?: string }) {
  const Icon = ICON_MAP[name] || BookOpen;
  return <Icon className={className} />;
}

export default function ProceduresPage() {
  const [department, setDepartment] = useState<string | undefined>();
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

  const { procedures, loading, error } = useProcedures({ department, search });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">臨床程序資料庫</h1>
        <p className="text-muted-foreground">
          涵蓋 343 個犬貓臨床程序，依專科分類瀏覽，支援中英文搜尋
        </p>
      </div>

      {/* 搜尋列 */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜尋程序名稱（中文或英文）..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* 專科分類按鈕 */}
      <div className="mb-6">
        <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-thin">
          {/* 全部 */}
          <Button
            variant={!department ? 'default' : 'outline'}
            size="sm"
            onClick={() => setDepartment(undefined)}
            className="whitespace-nowrap shrink-0"
          >
            <LayoutGrid className="h-4 w-4 mr-1.5" />
            全部
          </Button>

          {/* 各科別 */}
          {DEPARTMENTS.filter(d => d.id !== 'general').map((dept) => (
            <Button
              key={dept.id}
              variant={department === dept.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setDepartment(dept.id)}
              className="whitespace-nowrap shrink-0"
            >
              <DepartmentIcon name={dept.icon} className="h-4 w-4 mr-1.5" />
              {dept.name_zh}
            </Button>
          ))}
        </div>
      </div>

      {/* 結果計數 */}
      {!loading && !error && (
        <div className="flex items-center gap-2 mb-4">
          {department && (
            <Badge variant="secondary" className="text-xs">
              {DEPARTMENTS.find(d => d.id === department)?.name_zh}
            </Badge>
          )}
          <p className="text-sm text-muted-foreground">
            {procedures.length > 0
              ? `共 ${procedures.length} 個程序`
              : null}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
