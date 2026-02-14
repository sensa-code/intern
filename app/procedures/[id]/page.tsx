'use client';

import React, { useMemo, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, BookOpen, AlertTriangle, FileText, Loader2, ShieldAlert, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProcedureContent } from '@/components/procedures/ProcedureContent';
import { cleanOcrText } from '@/lib/text-cleaning';
import { getProcedureQuality, isContentSafeToShow, type DataQualityStatus } from '@/lib/data-quality';
import { supabase } from '@/lib/supabase/client';
import type { ProcedureContentField, ProcedureSection, ProcedureJsonRecord } from '@/lib/types';

// procedures_complete.json (~238KB) 用於 OCR 內容完整文字
import proceduresData from '@/data/procedures_complete.json';

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
 * 內容準備中佔位提示（Modified Option C）
 *
 * 對於 corrupted / empty 的程序，不顯示錯誤的 OCR 內容，
 * 改為顯示友善的佔位提示，引導使用者查閱原始教材。
 */
function ContentPendingPlaceholder({
  procedureName,
  pageNumber,
  status,
}: {
  procedureName: string;
  pageNumber?: number;
  status: DataQualityStatus;
}) {
  return (
    <Card className="border-dashed border-amber-200 bg-amber-50/50 dark:border-amber-900 dark:bg-amber-950/20">
      <CardContent className="py-12 text-center">
        <ShieldAlert className="mx-auto h-12 w-12 text-amber-500/70 mb-4" />
        <p className="text-lg font-medium text-foreground mb-2">
          內容整理中
        </p>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          {status === 'empty'
            ? `「${procedureName}」的詳細內容尚未建入系統。`
            : `「${procedureName}」的內容正在進行品質校對，暫不顯示以確保正確性。`
          }
        </p>
        <div className="mt-4 p-3 bg-background rounded-lg border max-w-sm mx-auto">
          <p className="text-sm text-muted-foreground">
            <BookOpen className="inline-block h-4 w-4 mr-1 -mt-0.5" />
            請參閱 <span className="font-medium">BSAVA Manual of Canine and Feline Clinical Procedures</span>
            {pageNumber
              ? <span>，第 <span className="font-mono font-medium">{pageNumber}</span> 頁</span>
              : null
            }
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * needs_review 狀態提示條
 */
function NeedsReviewBanner() {
  return (
    <div className="flex items-start gap-2 p-3 mb-6 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 dark:bg-blue-950/30 dark:border-blue-900 dark:text-blue-200">
      <Info className="h-4 w-4 mt-0.5 shrink-0" />
      <p className="text-sm">
        此內容已通過初步驗證，但可能存在 OCR 轉錄的格式瑕疵。如有疑問，請以原始教材為準。
      </p>
    </div>
  );
}

/**
 * 從 JSON 中查找程序（用 proc_XXX 格式的 procedure_id）
 */
function findInJson(procedureId: string): ProcedureJsonRecord | null {
  const allData = proceduresData as ProcedureJsonRecord[];
  return allData.find(p => p.id === procedureId) ?? null;
}

export default function ProcedureDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = typeof params?.id === 'string' ? params.id : null;

  const [loading, setLoading] = useState(true);
  const [procedure, setProcedure] = useState<ProcedureJsonRecord | null>(null);
  /** 解析後的 proc_XXX 格式 ID，用於品質查找 */
  const [resolvedProcId, setResolvedProcId] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    // 先嘗試直接從 JSON 查找（proc_XXX 格式）
    const jsonMatch = findInJson(id);
    if (jsonMatch) {
      setProcedure(jsonMatch);
      setResolvedProcId(id);
      setLoading(false);
      return;
    }

    // JSON 找不到 → 可能是 UUID，從 Supabase 查 procedure_id 再匹配 JSON
    async function fetchFromSupabase() {
      try {
        const { data, error } = await supabase
          .from('vt_procedures')
          .select('procedure_id')
          .eq('id', id)
          .single();

        if (error || !data) {
          setLoading(false);
          return;
        }

        // 用 Supabase 回傳的 procedure_id 去 JSON 找完整內容
        const jsonData = findInJson(data.procedure_id);
        if (jsonData) {
          setProcedure(jsonData);
          setResolvedProcId(data.procedure_id);
        }
      } catch {
        // Supabase 查詢失敗，維持 not found 狀態
      } finally {
        setLoading(false);
      }
    }

    fetchFromSupabase();
  }, [id]);

  // 取得品質狀態
  const quality = useMemo(() => {
    if (!resolvedProcId) return { status: 'corrupted' as const };
    return getProcedureQuality(resolvedProcId);
  }, [resolvedProcId]);

  const safeToShow = resolvedProcId ? isContentSafeToShow(resolvedProcId) : false;

  // 清理所有內容欄位，過濾掉空的（只在安全可顯示時執行）
  const cleanedSections = useMemo((): ProcedureSection[] => {
    if (!procedure || !safeToShow) return [];

    return SECTION_CONFIG
      .map(({ key, label }) => {
        // JSON 用 "procedure"，型別用 "procedure_steps"
        const rawValue = key === 'procedure_steps'
          ? procedure.procedure
          : procedure[key as keyof ProcedureJsonRecord] as string;

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

  // Guard: 找不到程序
  if (!procedure) {
    return <NotFoundState message="找不到此程序" />;
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

      {/* Modified Option C: 根據品質狀態決定顯示內容或佔位提示 */}
      {!safeToShow ? (
        /* corrupted 或 empty：顯示佔位提示 */
        <ContentPendingPlaceholder
          procedureName={procedure.name}
          pageNumber={procedure.page_number}
          status={quality.status}
        />
      ) : (
        <>
          {/* needs_review：顯示提示條 */}
          {quality.status === 'needs_review' && <NeedsReviewBanner />}

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
                  {procedure.page_number
                    ? `，第 ${procedure.page_number} 頁`
                    : ''}
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
        </>
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
