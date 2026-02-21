'use client';

import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import type { JSONContent } from '@tiptap/react';

interface RichTextRendererProps {
  content: JSONContent;
  className?: string;
}

/**
 * 唯讀富文本渲染器
 * 使用和 RichTextEditor 相同的 extension 確保格式一致
 */
export function RichTextRenderer({ content, className = '' }: RichTextRendererProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
      }),
      Image.configure({
        HTMLAttributes: { class: 'rounded-lg max-w-full mx-auto my-4' },
      }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Highlight,
      Table.configure({
        HTMLAttributes: { class: 'border-collapse w-full my-4' },
      }),
      TableRow,
      TableCell.configure({
        HTMLAttributes: { class: 'border border-gray-300 p-2' },
      }),
      TableHeader.configure({
        HTMLAttributes: { class: 'border border-gray-300 p-2 bg-gray-50 font-semibold' },
      }),
    ],
    content,
    editable: false,
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none',
      },
    },
  });

  if (!editor) {
    return <div className="animate-pulse h-20 bg-gray-100 rounded" />;
  }

  return (
    <div className={className}>
      <EditorContent editor={editor} />
    </div>
  );
}
