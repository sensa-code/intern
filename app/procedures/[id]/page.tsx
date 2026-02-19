'use client';

import React, { useMemo, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft, BookOpen, AlertTriangle, FileText, Loader2, Info,
  Wrench, UserCog, Zap, ListOrdered, HeartPulse, AlertCircle,
  ChevronDown, ChevronUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProcedureContent } from '@/components/procedures/ProcedureContent';
import { ProcedureIllustration } from '@/components/procedures/ProcedureIllustration';
import { LanguageToggle } from '@/components/procedures/LanguageToggle';
import { cleanOcrText } from '@/lib/text-cleaning';
import { getProcedureQuality, isContentSafeToShow } from '@/lib/data-quality';
import { useLocalePreference } from '@/lib/hooks/useLocalePreference';
import { getDepartmentById } from '@/lib/constants/departments';
import type { Procedure, ProcedureContentField, ProcedureSection, ContentLocale } from '@/lib/types';
import { getPrimaryName, getSecondaryName } from '@/lib/utils/display-name';

/** 內容區塊設定，依顯示順序（含雙語 label） */
const SECTION_CONFIG: { key: ProcedureContentField; label_zh: string; label_en: string }[] = [
  { key: 'indications', label_zh: '適應症', label_en: 'Indications' },
  { key: 'contraindications', label_zh: '禁忌症', label_en: 'Contraindications' },
  { key: 'equipment', label_zh: '設備', label_en: 'Equipment' },
  { key: 'patient_preparation', label_zh: '患者準備', label_en: 'Patient Preparation' },
  { key: 'technique', label_zh: '技術', label_en: 'Technique' },
  { key: 'procedure_steps', label_zh: '步驟', label_en: 'Procedure Steps' },
  { key: 'aftercare', label_zh: '術後護理', label_en: 'Aftercare' },
  { key: 'complications', label_zh: '併發症', label_en: 'Complications' },
];

/** 取得 section label（根據語言） */
function getSectionLabel(config: { label_zh: string; label_en: string }, locale: ContentLocale): string {
  if (locale === 'en') return config.label_en;
  return `${config.label_zh} (${config.label_en})`;
}

/** 依據 section key 取得對應圖標（含顏色） */
function getSectionIcon(key: string): React.ReactNode {
  switch (key) {
    case 'indications':
      return <BookOpen className="h-4 w-4 text-green-600" />;
    case 'contraindications':
      return <AlertTriangle className="h-4 w-4 text-red-500" />;
    case 'equipment':
      return <Wrench className="h-4 w-4 text-gray-600" />;
    case 'patient_preparation':
      return <UserCog className="h-4 w-4 text-blue-600" />;
    case 'technique':
      return <Zap className="h-4 w-4 text-purple-600" />;
    case 'procedure_steps':
      return <ListOrdered className="h-4 w-4 text-indigo-600" />;
    case 'aftercare':
      return <HeartPulse className="h-4 w-4 text-pink-600" />;
    case 'complications':
      return <AlertCircle className="h-4 w-4 text-orange-500" />;
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
function RagSourceBanner({ locale }: { locale: ContentLocale }) {
  return (
    <div className="flex items-start gap-2 p-3 mb-6 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 dark:bg-blue-950/30 dark:border-blue-900 dark:text-blue-200">
      <Info className="h-4 w-4 mt-0.5 shrink-0" />
      <p className="text-sm">
        {locale === 'en'
          ? 'Content auto-matched from veterinary textbook knowledge base. Minor formatting issues may exist. Refer to the original textbook if in doubt.'
          : '內容來自獸醫教科書知識庫自動匹配，可能存在格式瑕疵。如有疑問，請以原始教材為準。'}
      </p>
    </div>
  );
}

/**
 * Section 快速跳轉 TOC
 */
function TableOfContents({
  sections,
  locale,
}: {
  sections: ProcedureSection[];
  locale: ContentLocale;
}) {
  if (sections.length <= 2) return null;

  return (
    <nav className="mb-6 p-3 rounded-lg bg-gray-50 border" aria-label="目錄">
      <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
        {locale === 'en' ? 'Contents' : '目錄'}
      </p>
      <div className="flex flex-wrap gap-2">
        {sections.map(s => {
          const config = SECTION_CONFIG.find(c => c.key === s.key);
          const shortLabel = locale === 'en'
            ? (config?.label_en ?? s.key)
            : (config?.label_zh ?? s.key);
          return (
            <a
              key={s.key}
              href={`#section-${s.key}`}
              className="text-xs px-2.5 py-1 rounded-full bg-white border hover:bg-blue-50 hover:border-blue-200 transition-colors text-muted-foreground hover:text-blue-700"
            >
              {shortLabel}
            </a>
          );
        })}
      </div>
    </nav>
  );
}

export default function ProcedureDetailPage() {
  const params = useParams();
  const id = typeof params?.id === 'string' ? params.id : null;

  const [loading, setLoading] = useState(true);
  const [procedure, setProcedure] = useState<Procedure | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [locale, setLocale] = useLocalePreference();
  const [diagramOpen, setDiagramOpen] = useState(false);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    async function fetchProcedure() {
      if (!id) return;
      try {
        const res = await fetch(`/api/procedures/${id}`);

        if (!res.ok) {
          setError(res.status === 404 ? '找不到此程序' : '載入失敗');
          setLoading(false);
          return;
        }

        const data: Procedure = await res.json();
        setProcedure(data);
      } catch {
        setError('載入失敗');
      } finally {
        setLoading(false);
      }
    }

    fetchProcedure();
  }, [id]);

  // 記錄瀏覽行為到 localStorage（供 /training 頁面使用）
  useEffect(() => {
    if (!procedure) return;
    try {
      const STORAGE_KEY = 'vettrainer_progress';
      const raw = localStorage.getItem(STORAGE_KEY);
      const store: Record<string, {
        id: string; name: string; name_zh: string | null;
        department: string; status: string; lastViewed: string; viewCount: number;
      }> = raw ? JSON.parse(raw) : {};
      const existing = store[procedure.id];
      store[procedure.id] = {
        id: procedure.id,
        name: procedure.name,
        name_zh: procedure.name_zh ?? null,
        department: procedure.department ?? 'general',
        status: existing?.status ?? 'reading',
        lastViewed: new Date().toISOString(),
        viewCount: (existing?.viewCount ?? 0) + 1,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    } catch {
      // localStorage 不可用 — 靜默失敗
    }
  }, [procedure]);

  // 取得品質狀態
  const quality = useMemo(() => {
    if (!procedure?.procedure_id) return { status: 'needs_review' as const };
    return getProcedureQuality(procedure.procedure_id);
  }, [procedure]);

  const safeToShow = procedure?.procedure_id
    ? isContentSafeToShow(procedure.procedure_id)
    : true; // 預設可顯示

  // 清理所有內容欄位，過濾掉空的（支援中英文切換）
  const cleanedSections = useMemo((): ProcedureSection[] => {
    if (!procedure || !safeToShow) return [];

    return SECTION_CONFIG
      .map(({ key, label_zh, label_en }) => {
        let rawValue: string | null;

        if (locale === 'zh') {
          // 中文模式：優先使用 _zh 欄位，fallback 到英文
          const zhKey = `${key}_zh` as keyof Procedure;
          rawValue = (procedure[zhKey] as string | null) || (procedure[key] as string | null);
        } else {
          rawValue = procedure[key] as string | null;
        }

        if (!rawValue) return { key, label: getSectionLabel({ label_zh, label_en }, locale), content: '' };

        // 中文內容是 AI 翻譯（乾淨的），不需要 OCR 清理
        // 英文內容需要 OCR 清理
        const zhKey = `${key}_zh` as keyof Procedure;
        const isUsingZhContent = locale === 'zh' && Boolean(procedure[zhKey]);
        const content = isUsingZhContent
          ? rawValue.replace(/[^\S\n]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim()
          : cleanOcrText(rawValue, procedure.name);

        return { key, label: getSectionLabel({ label_zh, label_en }, locale), content };
      })
      .filter(s => s.content.length > 0);
  }, [procedure, safeToShow, locale]);

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

  const hasFlowDiagram = Boolean(procedure.flow_diagram);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* 麵包屑導航 */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center gap-2 text-sm text-muted-foreground">
          <li>
            <Link href="/" className="hover:text-foreground transition-colors">
              {locale === 'en' ? 'Home' : '首頁'}
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/procedures" className="hover:text-foreground transition-colors">
              {locale === 'en' ? 'Procedures' : '程序資料庫'}
            </Link>
          </li>
          <li>/</li>
          <li className="text-foreground font-medium truncate max-w-[200px]">
            {getPrimaryName(procedure, locale)}
          </li>
        </ol>
      </nav>

      {/* 標題區 */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <Button
            variant="ghost"
            size="sm"
            asChild
            aria-label={locale === 'en' ? 'Back to procedures' : '返回程序列表'}
          >
            <Link href="/procedures">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          {(() => {
            const dept = getDepartmentById(procedure.department);
            return dept ? (
              <Badge variant="outline" className={`text-sm ${dept.colorClasses.badge}`}>
                {dept.name_zh}
              </Badge>
            ) : (
              <Badge variant="outline" className="font-mono text-sm">
                {procedure.category}
              </Badge>
            );
          })()}
          {procedure.page_number != null && procedure.page_number > 0 && (
            <Badge variant="secondary" className="text-xs">
              <BookOpen className="mr-1 h-3 w-3" />
              Page {procedure.page_number}
            </Badge>
          )}
          {/* 語言切換 */}
          <div className="ml-auto">
            <LanguageToggle locale={locale} onLocaleChange={setLocale} />
          </div>
        </div>
        <h1 className="text-3xl font-bold">{getPrimaryName(procedure, locale)}</h1>
        {getSecondaryName(procedure, locale) && (
          <p className="text-lg text-muted-foreground mt-1">{getSecondaryName(procedure, locale)}</p>
        )}
      </div>

      {/* RAG 來源提示 */}
      {quality.status === 'needs_review' && <RagSourceBanner locale={locale} />}

      {/* 流程圖 / 圖解（可摺疊） */}
      {hasFlowDiagram && (
        <Card className="mb-6 overflow-hidden">
          <button
            onClick={() => setDiagramOpen(!diagramOpen)}
            className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors text-left"
            aria-expanded={diagramOpen}
          >
            <CardTitle className="text-base flex items-center gap-2">
              <ListOrdered className="h-4 w-4 text-indigo-600" />
              {locale === 'en' ? 'Procedure Flow Diagram' : '程序流程圖'}
            </CardTitle>
            {diagramOpen ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
          {diagramOpen && (
            <CardContent className="pt-0">
              <ProcedureIllustration
                illustrationUrl={procedure.illustration_url ?? null}
                flowDiagram={procedure.flow_diagram ?? null}
                inline
              />
            </CardContent>
          )}
        </Card>
      )}

      {/* 非流程圖的插圖 */}
      {!hasFlowDiagram && procedure.illustration_url && (
        <ProcedureIllustration
          illustrationUrl={procedure.illustration_url}
          flowDiagram={null}
          locale={locale}
        />
      )}

      {/* TOC 目錄 */}
      <TableOfContents sections={cleanedSections} locale={locale} />

      {/* 內容區塊 或 空狀態 */}
      {cleanedSections.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="py-12 text-center">
            <BookOpen className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
            <p className="text-lg text-muted-foreground">
              {locale === 'en' ? 'Content not yet available' : '詳細內容尚未建立'}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              {locale === 'en'
                ? `Please refer to BSAVA Manual of Canine and Feline Clinical Procedures${procedure.page_number ? `, page ${procedure.page_number}` : ''}`
                : `請參考 BSAVA Manual of Canine and Feline Clinical Procedures${procedure.page_number ? `，第 ${procedure.page_number} 頁` : ''}`}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {cleanedSections.map(section => (
            <Card key={section.key} id={`section-${section.key}`}>
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
            {locale === 'en' ? 'Back to Procedures' : '返回程序列表'}
          </Link>
        </Button>
      </div>
    </div>
  );
}
