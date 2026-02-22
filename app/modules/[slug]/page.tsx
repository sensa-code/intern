import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supabaseServer } from '@/lib/supabase/server';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export const revalidate = 60;

const TYPE_META: Record<string, { name_zh: string; color: string }> = {
  drug_reference: { name_zh: '藥物參考', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  case_study: { name_zh: '臨床案例', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  anatomy_atlas: { name_zh: '解剖圖譜', color: 'bg-purple-50 text-purple-700 border-purple-200' },
  emergency_protocol: { name_zh: '急診流程', color: 'bg-red-50 text-red-700 border-red-200' },
  surgical_technique: { name_zh: '手術技巧', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  lab_reference: { name_zh: '檢驗參考值', color: 'bg-teal-50 text-teal-700 border-teal-200' },
  differential_diagnosis: { name_zh: '鑑別診斷', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
};

/**
 * HTML 實體轉義 — 防止 XSS 注入
 */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * 渲染 ProseMirror text 節點（含 marks：bold / italic / code）
 * 所有文字先 escapeHtml() 再包裝 mark 標籤
 */
function renderTextNode(child: Record<string, unknown>): string {
  if (child.type !== 'text') return '';
  let html = escapeHtml(child.text as string);
  const marks = child.marks as Array<Record<string, unknown>> | undefined;
  if (marks) {
    for (const mark of marks) {
      if (mark.type === 'bold') html = `<strong>${html}</strong>`;
      else if (mark.type === 'italic') html = `<em>${html}</em>`;
      else if (mark.type === 'code') html = `<code class="bg-gray-100 px-1 rounded text-sm">${html}</code>`;
    }
  }
  return html;
}

/** 渲染一組 inline children → HTML */
function renderInlineContent(children: Array<Record<string, unknown>> | undefined): string {
  return children?.map(renderTextNode).join('') ?? '';
}

/**
 * ProseMirror JSON → HTML 伺服器端渲染
 * 支援 heading / paragraph / bulletList / orderedList / blockquote / hr
 * 文字支援 bold / italic / code marks
 * 所有文字經過 escapeHtml() 轉義，防止 XSS
 */
function renderJsonToHtml(json: Record<string, unknown>): string {
  if (!json || !json.content) return '';

  const nodes = json.content as Array<Record<string, unknown>>;
  return nodes.map(node => {
    const type = node.type as string;
    const inlineHtml = renderInlineContent(
      node.content as Array<Record<string, unknown>> | undefined
    );

    switch (type) {
      case 'heading': {
        const rawLevel = (node.attrs as Record<string, unknown>)?.level;
        const lvl = Number(rawLevel);
        const level = Number.isInteger(lvl) && lvl >= 1 && lvl <= 6 ? lvl : 2;
        return `<h${level} class="text-lg font-semibold mt-6 mb-2">${inlineHtml}</h${level}>`;
      }
      case 'paragraph':
        return `<p class="mb-3 leading-relaxed">${inlineHtml}</p>`;
      case 'bulletList':
        return `<ul class="list-disc pl-5 mb-3 space-y-1">${(node.content as Array<Record<string, unknown>>)?.map(li => {
          const liHtml = (li.content as Array<Record<string, unknown>>)
            ?.map(p => renderInlineContent(p.content as Array<Record<string, unknown>>))
            .join('') ?? '';
          return `<li>${liHtml}</li>`;
        }).join('')}</ul>`;
      case 'orderedList':
        return `<ol class="list-decimal pl-5 mb-3 space-y-1">${(node.content as Array<Record<string, unknown>>)?.map(li => {
          const liHtml = (li.content as Array<Record<string, unknown>>)
            ?.map(p => renderInlineContent(p.content as Array<Record<string, unknown>>))
            .join('') ?? '';
          return `<li>${liHtml}</li>`;
        }).join('')}</ol>`;
      case 'blockquote':
        return `<blockquote class="border-l-4 border-gray-300 pl-4 italic my-3 text-gray-600">${inlineHtml}</blockquote>`;
      case 'horizontalRule':
        return '<hr class="my-6 border-gray-200" />';
      default:
        return inlineHtml ? `<p class="mb-3">${inlineHtml}</p>` : '';
    }
  }).join('\n');
}

export default async function ModuleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: modules } = await supabaseServer
    .from('vt_modules')
    .select('*')
    .eq('slug', slug)
    .eq('content_status', 'verified')
    .is('deleted_at', null)
    .limit(1);

  const mod = modules?.[0];
  if (!mod) notFound();

  const meta = TYPE_META[mod.module_type];

  // 優先中文，fallback 英文
  const contentHtml = mod.content_json_zh
    ? renderJsonToHtml(mod.content_json_zh)
    : mod.content_json
      ? renderJsonToHtml(mod.content_json)
      : null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* 導航 */}
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/modules">
            <ArrowLeft className="h-4 w-4 mr-1" />
            返回模組列表
          </Link>
        </Button>
      </div>

      {/* 標題 */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline" className={meta?.color ?? ''}>
            {meta?.name_zh ?? mod.module_type}
          </Badge>
        </div>
        <h1 className="text-2xl font-bold">
          {mod.title_zh ?? mod.title}
        </h1>
        {mod.title_zh && (
          <p className="text-muted-foreground mt-1">{mod.title}</p>
        )}
        {(mod.description_zh || mod.description) && (
          <p className="text-muted-foreground mt-2">
            {mod.description_zh ?? mod.description}
          </p>
        )}
      </div>

      {/* 內容 */}
      {contentHtml ? (
        <article
          className="prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          <p>此模組內容正在編寫中</p>
        </div>
      )}
    </div>
  );
}
