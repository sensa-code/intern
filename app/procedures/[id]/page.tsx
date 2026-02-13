'use client';

import React, { useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, BookOpen, AlertTriangle, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProcedureContent } from '@/components/procedures/ProcedureContent';
import { cleanOcrText } from '@/lib/text-cleaning';
import type { ProcedureContentField, ProcedureSection, ProcedureJsonRecord } from '@/lib/types';

// WARNING: procedures_complete.json (~238KB) 會包含在 client bundle。
// 62 筆記錄在 Phase 1 可接受。未來可改為 Server Component + Supabase 查詢。
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

/** Loading skeleton（含 ARIA 無障礙屬性） */
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

export default function ProcedureDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = typeof params?.id === 'string' ? params.id : null;

  // 從 JSON 查找程序
  const procedure = useMemo(() => {
    if (!id) return null;
    return (proceduresData as ProcedureJsonRecord[]).find(p => p.id === id) ?? null;
  }, [id]);

  // 清理所有內容欄位，過濾掉空的
  const cleanedSections = useMemo((): ProcedureSection[] => {
    if (!procedure) return [];

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
  }, [procedure]);

  // Guard: 無效 ID
  if (!id) {
    return <NotFoundState message="無效的程序 ID" />;
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
