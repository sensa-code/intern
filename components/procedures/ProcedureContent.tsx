'use client';

import React from 'react';

interface ProcedureContentProps {
  /** 已清理的文字內容 */
  content: string;
}

/**
 * 偵測內容類型：bullet list、numbered list、或一般段落
 *
 * numbered list 偵測要求 "1." 出現在文字開頭附近，
 * 避免將劑量如 "0.25 mg" 誤判為列表項目。
 */
function detectContentType(text: string): 'bullet' | 'numbered' | 'paragraph' {
  const bulletCount = (text.match(/•/g) || []).length;
  if (bulletCount >= 2) return 'bullet';

  const trimmed = text.trimStart();
  const hasNumberedStart = /^1\.\s/.test(trimmed) || /^[A-Z]\s+1\.\s/.test(trimmed);
  const numberedCount = (text.match(/\b\d{1,2}\.\s/g) || []).length;
  if (hasNumberedStart && numberedCount >= 2) return 'numbered';

  return 'paragraph';
}

function splitBulletItems(text: string): string[] {
  return text
    .split('•')
    .map(item => item.trim())
    .filter(item => item.length > 0);
}

function splitNumberedItems(text: string): string[] {
  return text
    .split(/(?=\b\d{1,2}\.\s)/)
    .map(item => item.trim())
    .filter(item => item.length > 0);
}

export function ProcedureContent({ content }: ProcedureContentProps) {
  if (!content || content.trim().length === 0) return null;

  const contentType = detectContentType(content);

  switch (contentType) {
    case 'bullet': {
      const items = splitBulletItems(content);
      return (
        <ul className="space-y-1.5 text-sm leading-relaxed">
          {items.map((item, i) => (
            <li key={i} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/50" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    }
    case 'numbered': {
      const items = splitNumberedItems(content);
      return (
        <ol className="space-y-2 text-sm leading-relaxed">
          {items.map((item, i) => (
            <li key={i} className="flex gap-2">
              <span className="font-mono text-muted-foreground shrink-0 mt-0.5">
                {item.match(/^(\d{1,2})\./)?.[1] || (i + 1)}.
              </span>
              <span>{item.replace(/^\d{1,2}\.\s*/, '')}</span>
            </li>
          ))}
        </ol>
      );
    }
    default:
      return (
        <p className="text-sm leading-relaxed whitespace-pre-line">
          {content}
        </p>
      );
  }
}
