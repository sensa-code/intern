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

/**
 * 解析內聯格式：**bold**、Note:/Warning: callout
 */
function parseInlineFormatting(text: string): React.ReactNode {
  // 先處理 **bold** 標記
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>;
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}

/**
 * 檢查是否為小標題行（以 : 或 ： 結尾的短行）
 */
function isSubheading(line: string): boolean {
  const trimmed = line.trim();
  return (trimmed.endsWith(':') || trimmed.endsWith('：')) && trimmed.length < 80;
}

/**
 * 檢查是否為注意/警告行
 */
function getCalloutType(line: string): 'note' | 'warning' | null {
  const trimmed = line.trim().toLowerCase();
  if (trimmed.startsWith('note:') || trimmed.startsWith('注意：') || trimmed.startsWith('注意:') || trimmed.startsWith('備註：') || trimmed.startsWith('備註:')) return 'note';
  if (trimmed.startsWith('warning:') || trimmed.startsWith('警告：') || trimmed.startsWith('警告:') || trimmed.startsWith('⚠')) return 'warning';
  return null;
}

/**
 * 渲染段落，支援小標題和 callout
 */
function renderParagraphLines(content: string): React.ReactNode {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) {
      elements.push(<br key={`br-${i}`} />);
      continue;
    }

    const callout = getCalloutType(line);
    if (callout) {
      const bgClass = callout === 'warning'
        ? 'bg-amber-50 border-amber-200 text-amber-800'
        : 'bg-blue-50 border-blue-200 text-blue-800';
      elements.push(
        <div key={i} className={`p-2.5 rounded-md border text-xs my-2 ${bgClass}`}>
          {parseInlineFormatting(line.trim())}
        </div>
      );
    } else if (isSubheading(line)) {
      elements.push(
        <p key={i} className="font-semibold text-foreground mt-3 mb-1">
          {parseInlineFormatting(line.trim())}
        </p>
      );
    } else {
      elements.push(
        <span key={i}>
          {parseInlineFormatting(line)}
          {i < lines.length - 1 ? '\n' : ''}
        </span>
      );
    }
  }

  return elements;
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
              <span>{parseInlineFormatting(item)}</span>
            </li>
          ))}
        </ul>
      );
    }
    case 'numbered': {
      const items = splitNumberedItems(content);
      return (
        <ol className="space-y-3 text-sm leading-relaxed">
          {items.map((item, i) => {
            const stepNum = item.match(/^(\d{1,2})\./)?.[1] || String(i + 1);
            const itemText = item.replace(/^\d{1,2}\.\s*/, '');
            return (
              <li key={i} className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-semibold mt-0.5">
                  {stepNum}
                </span>
                <span className="flex-1">{parseInlineFormatting(itemText)}</span>
              </li>
            );
          })}
        </ol>
      );
    }
    default:
      return (
        <div className="text-sm leading-relaxed whitespace-pre-line">
          {renderParagraphLines(content)}
        </div>
      );
  }
}
