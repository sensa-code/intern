'use client';

import React, { useEffect, useRef, useState } from 'react';

interface MermaidDiagramProps {
  /** Mermaid 語法字串 */
  chart: string;
  className?: string;
}

/**
 * Mermaid.js 流程圖渲染元件（client-side only）
 * 使用 dynamic import 避免 SSR 問題和減小初始 bundle
 */
export function MermaidDiagram({ chart, className }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!containerRef.current || !chart) return;

    let cancelled = false;

    async function renderChart() {
      try {
        const mermaid = (await import('mermaid')).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: 'neutral',
          flowchart: {
            useMaxWidth: true,
            htmlLabels: true,
            curve: 'basis',
          },
          securityLevel: 'strict',
        });

        const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`;
        const { svg } = await mermaid.render(id, chart);

        if (!cancelled && containerRef.current) {
          containerRef.current.innerHTML = svg;
          setLoading(false);
        }
      } catch {
        if (!cancelled) {
          setError(true);
          setLoading(false);
        }
      }
    }

    renderChart();

    return () => {
      cancelled = true;
    };
  }, [chart]);

  if (error || !chart) return null;

  return (
    <div className={`relative ${className || ''}`}>
      {loading && (
        <div className="h-32 flex items-center justify-center text-sm text-muted-foreground">
          載入流程圖...
        </div>
      )}
      <div
        ref={containerRef}
        className="overflow-x-auto"
        aria-label="程序流程圖"
      />
    </div>
  );
}
