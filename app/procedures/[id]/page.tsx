'use client';

import React, { useMemo, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, BookOpen, AlertTriangle, FileText, Loader2, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProcedureContent } from '@/components/procedures/ProcedureContent';
import { cleanOcrText } from '@/lib/text-cleaning';
import { getProcedureQuality, isContentSafeToShow } from '@/lib/data-quality';
import { supabase } from '@/lib/supabase/client';
import type { Procedure, ProcedureContentField, ProcedureSection } from '@/lib/types';

/** 內容區塊設定，依顯示順序 */
const SECTION_CONFIG: { key: ProcedureContentField; label: string }[] = [
  { key: 'indications', label: '適應症 (Indications)' },
  { key: 'contraindications', label: '禁忌症 (Contraindications)' },
  { key: 'equipment', label: '設備 (Equipment)' },
  { key: 'patient_preparation', label: '患者準備 (Patient Preparation)' },
  { key: 'technique', label: '技術 (Technique)' },
  { key: 'procedure_steps', label: '步驟 (Procedure Steps)' },
  { key: 'aftercare', label: '術後護理 (Aftercare)' },
  { key: 'complications', label: '併發症 (Complications)' },
];

/** 依據 section key 取得對應圖標 */
function getSectionIcon(key: string): React.ReactNode {
  switch (key) {
    case 'indications':
      return <BookOpen className="h-4 w-4" />;
    case 'contraindications':
      return <AlertTriangle className="h-4 w-4" />;
    default:
      return <FileText className="h-4 w-4" />;
  }
}

/** Not Found 狀態 */
function NotFoundState({ message }: { message: string }) {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <p className="text-lg text-muted-foreground mb-4">{message}</p>
      <Button asChild variant="outline">
        <Link href="/procedures">
          <ArrowLeft className="h-4 w-4 mr-2" />
          返回程序列表
        </Link>
      </Button>
    </div>
  );
}

/** Loading 狀態 */
function LoadingState() {
  return (
    <div className="container mx-auto px-4 py-16 text-center" role="status" aria-label="載入程序詳情">
      <Loader2 className="mx-auto h-8 w-8 animate-spin text-muted-foreground mb-4" />
      <p className="text-muted-foreground">載入中...</p>
    </div>
  );
}

/**
 * RAG 來源提示條 — 提示使用者內容來自知識庫自動匹配
 */
function RagSourceBanner() {
  return (
    <div className="flex items-start gap-2 p-3 mb-6 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 dark:bg-blue-950/30 dark:border-blue-900 dark:text-blue-200">
      <Info className="h-4 w-4 mt-0.5 shrink-0" />
      <p className="text-sm">
        內容來自獸醫教科書知識庫自動匹配，可能存在格式瑕疵。如有疑問，請以原始教材為準。
      </p>
    </div>
  );
}

export default function ProcedureDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = typeof params?.id === 'string' ? params.id : null;

  const [loading, setLoading] = useState(true);
  const [procedure, setProcedure] = useState<Procedure | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    async function fetchProcedure() {
      if (!id) return;
      try {
        // 嘗試用 proc_XXX 格式查詢
        let query = supabase.from('vt_procedures').select('*');

        if (id.startsWith('proc_')) {
          query = query.eq('procedure_id', id);
        } else {
          // UUID 格式
          query = query.eq('id', id);
        }

        const { data, error: fetchError } = await query.single();

        if (fetchError || !data) {
          setError('找不到此程序');
          setLoading(false);
          return;
        }

        setProcedure(data as unknown as Procedure);
      } catch {
        setError('載入失敗');
      } finally {
        setLoading(false);
      }
    }

    fetchProcedure();
  }, [id]);

  // 取得品質狀態
  const quality = useMemo(() => {
    if (!procedure?.procedure_id) return { status: 'needs_review' as const };
    return getProcedureQuality(procedure.procedure_id);
  }, [procedure]);

  const safeToShow = procedure?.procedure_id
    ? isContentSafeToShow(procedure.procedure_id)
    : true; // 預設可顯示

  // 清理所有內容欄位，過濾掉空的
  const cleanedSections = useMemo((): ProcedureSection[] => {
    if (!procedure || !safeToShow) return [];

    return SECTION_CONFIG
      .map(({ key, label }) => {
        const rawValue = procedure[key] as string | null;
        if (!rawValue) return { key, label, content: '' };

        const cleaned = cleanOcrText(rawValue, procedure.name);
        return { key, label, content: cleaned };
      })
      .filter(s => s.content.length > 0);
  }, [procedure, safeToShow]);

  // Guard: 無效 ID
  if (!id) {
    return <NotFoundState message="無效的程序 ID" />;
  }

  // Loading 狀態
  if (loading) {
    return <LoadingState />;
  }

  // Error 狀態
  if (error || !procedure) {
    return <NotFoundState message={error || '找不到此程序'} />;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* 麵包屑導航 */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center gap-2 text-sm text-muted-foreground">
          <li>
            <Link href="/" className="hover:text-foreground transition-colors">
              首頁
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/procedures" className="hover:text-foreground transition-colors">
              程序資料庫
            </Link>
          </li>
          <li>/</li>
          <li className="text-foreground font-medium truncate max-w-[200px]">
            {procedure.name}
          </li>
        </ol>
      </nav>

      {/* 標題區 */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            aria-label="返回上一頁"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Badge variant="outline" className="font-mono text-sm">
            {procedure.category}
          </Badge>
          {procedure.page_number && (
            <Badge variant="secondary" className="text-xs">
              <BookOpen className="mr-1 h-3 w-3" />
              Page {procedure.page_number}
            </Badge>
          )}
        </div>
        <h1 className="text-3xl font-bold">{procedure.name}</h1>
      </div>

      {/* RAG 來源提示 */}
      {quality.status === 'needs_review' && <RagSourceBanner />}

      {/* 內容區塊 或 空狀態 */}
      {cleanedSections.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="py-12 text-center">
            <BookOpen className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
            <p className="text-lg text-muted-foreground">
              詳細內容尚未建立
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              請參考 BSAVA Manual of Canine and Feline Clinical Procedures
              {procedure.page_number ? `，第 ${procedure.page_number} 頁` : ''}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {cleanedSections.map(section => (
            <Card key={section.key}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  {getSectionIcon(section.key)}
                  {section.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ProcedureContent content={section.content} />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* 底部返回 */}
      <div className="mt-8 pt-6 border-t">
        <Button asChild variant="outline">
          <Link href="/procedures">
            <ArrowLeft className="mr-2 h-4 w-4" />
            返回程序列表
          </Link>
        </Button>
      </div>
    </div>
  );
}
