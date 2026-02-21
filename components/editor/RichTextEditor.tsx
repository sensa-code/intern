'use client';

import React, { useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import { EditorToolbar } from './EditorToolbar';
import type { JSONContent } from '@tiptap/react';

interface RichTextEditorProps {
  content: JSONContent | null;
  onChange: (json: JSONContent) => void;
  placeholder?: string;
  editable?: boolean;
  className?: string;
}

/**
 * Tiptap 富文本編輯器
 * 支援：標題、粗斜體、列表、表格、圖片、對齊、高亮
 */
export function RichTextEditor({
  content,
  onChange,
  placeholder = '開始編輯內容...',
  editable = true,
  className = '',
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
        bulletList: { keepMarks: true },
        orderedList: { keepMarks: true },
      }),
      Image.configure({
        HTMLAttributes: { class: 'rounded-lg max-w-full mx-auto my-4' },
      }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Highlight.configure({
        multicolor: false,
      }),
      Placeholder.configure({
        placeholder,
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: { class: 'border-collapse w-full my-4' },
      }),
      TableRow,
      TableCell.configure({
        HTMLAttributes: { class: 'border border-gray-300 p-2 min-w-[80px]' },
      }),
      TableHeader.configure({
        HTMLAttributes: { class: 'border border-gray-300 p-2 bg-gray-50 font-semibold' },
      }),
    ],
    content: content ?? undefined,
    editable,
    onUpdate: ({ editor: ed }) => {
      onChange(ed.getJSON());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none focus:outline-none min-h-[200px] p-4',
      },
    },
  });

  const handleImageInsert = useCallback(
    (url: string, alt?: string) => {
      if (editor) {
        editor.chain().focus().setImage({ src: url, alt: alt || '' }).run();
      }
    },
    [editor]
  );

  if (!editor) {
    return (
      <div className="border rounded-lg bg-gray-50 animate-pulse h-[300px]" />
    );
  }

  return (
    <div className={`border rounded-lg overflow-hidden bg-white ${className}`}>
      {editable && (
        <EditorToolbar editor={editor} onImageInsert={handleImageInsert} />
      )}
      <EditorContent editor={editor} />
    </div>
  );
}
