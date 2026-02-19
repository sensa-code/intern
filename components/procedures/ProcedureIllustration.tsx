'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GitBranch } from 'lucide-react';
import { MermaidDiagram } from './MermaidDiagram';
import type { ContentLocale } from '@/lib/types';

interface ProcedureIllustrationProps {
  illustrationUrl: string | null;
  flowDiagram: string | null;
  /** inline 模式：不包裹 Card（由父層的可摺疊 Card 管理） */
  inline?: boolean;
  locale?: ContentLocale;
}

/**
 * 程序圖解元件：
 * - 有 flow_diagram → 渲染 Mermaid 流程圖
 * - 有 illustration_url → 渲染圖片
 * - 兩者都無 → 不渲染
 *
 * inline 模式下只渲染內容區塊，不包裹 Card。
 */
export function ProcedureIllustration({
  illustrationUrl,
  flowDiagram,
  inline = false,
  locale = 'zh',
}: ProcedureIllustrationProps) {
  if (!illustrationUrl && !flowDiagram) return null;

  const imgAlt = locale === 'en' ? 'Procedure illustration' : '程序示意圖';

  const content = (
    <>
      {flowDiagram && (
        <MermaidDiagram chart={flowDiagram} className="py-2" />
      )}
      {illustrationUrl && (
        <figure className="text-center mt-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={illustrationUrl}
            alt={imgAlt}
            className="mx-auto max-h-96 rounded-lg border"
            loading="lazy"
          />
        </figure>
      )}
    </>
  );

  if (inline) return content;

  const title = locale === 'en' ? 'Procedure Flow Diagram' : '程序流程圖';

  return (
    <Card className="mb-6 overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center gap-2">
          <GitBranch className="h-4 w-4 text-indigo-600" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>{content}</CardContent>
    </Card>
  );
}
