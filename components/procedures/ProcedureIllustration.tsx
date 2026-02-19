'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GitBranch } from 'lucide-react';
import { MermaidDiagram } from './MermaidDiagram';

interface ProcedureIllustrationProps {
  illustrationUrl: string | null;
  flowDiagram: string | null;
}

/**
 * 程序圖解元件：
 * - 有 flow_diagram → 渲染 Mermaid 流程圖
 * - 有 illustration_url → 渲染圖片
 * - 兩者都無 → 不渲染
 */
export function ProcedureIllustration({
  illustrationUrl,
  flowDiagram,
}: ProcedureIllustrationProps) {
  if (!illustrationUrl && !flowDiagram) return null;

  return (
    <Card className="mb-6 overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center gap-2">
          <GitBranch className="h-4 w-4 text-indigo-600" />
          程序流程圖
        </CardTitle>
      </CardHeader>
      <CardContent>
        {flowDiagram && (
          <MermaidDiagram chart={flowDiagram} className="py-2" />
        )}
        {illustrationUrl && (
          <figure className="text-center mt-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={illustrationUrl}
              alt="程序示意圖"
              className="mx-auto max-h-96 rounded-lg border"
              loading="lazy"
            />
          </figure>
        )}
      </CardContent>
    </Card>
  );
}
