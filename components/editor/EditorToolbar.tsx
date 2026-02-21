'use client';

import React, { useState, useCallback } from 'react';
import type { Editor } from '@tiptap/react';
import { Button } from '@/components/ui/button';
import {
  Bold, Italic, Underline, Strikethrough,
  Heading2, Heading3,
  List, ListOrdered,
  AlignLeft, AlignCenter, AlignRight,
  ImagePlus, Table as TableIcon,
  Highlighter, Undo2, Redo2,
  Quote, Minus, Code,
} from 'lucide-react';
import { ImageUploadDialog } from './ImageUploadDialog';

interface EditorToolbarProps {
  editor: Editor;
  onImageInsert: (url: string, alt?: string) => void;
}

interface ToolbarButtonProps {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
}

function ToolbarButton({ onClick, isActive, disabled, title, children }: ToolbarButtonProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className={`h-8 w-8 p-0 ${isActive ? 'bg-gray-200 text-gray-900' : 'text-gray-600'}`}
      onClick={onClick}
      disabled={disabled}
      title={title}
    >
      {children}
    </Button>
  );
}

function Separator() {
  return <div className="w-px h-6 bg-gray-200 mx-1" />;
}

export function EditorToolbar({ editor, onImageInsert }: EditorToolbarProps) {
  const [showImageDialog, setShowImageDialog] = useState(false);

  const insertTable = useCallback(() => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  }, [editor]);

  return (
    <>
      <div className="flex flex-wrap items-center gap-0.5 p-2 border-b bg-gray-50">
        {/* 復原 / 重做 */}
        <ToolbarButton onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="復原 (Ctrl+Z)">
          <Undo2 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="重做 (Ctrl+Y)">
          <Redo2 className="h-4 w-4" />
        </ToolbarButton>

        <Separator />

        {/* 標題 */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={editor.isActive('heading', { level: 2 })}
          title="標題 H2"
        >
          <Heading2 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          isActive={editor.isActive('heading', { level: 3 })}
          title="標題 H3"
        >
          <Heading3 className="h-4 w-4" />
        </ToolbarButton>

        <Separator />

        {/* 文字格式 */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
          title="粗體 (Ctrl+B)"
        >
          <Bold className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
          title="斜體 (Ctrl+I)"
        >
          <Italic className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive('underline')}
          title="底線 (Ctrl+U)"
        >
          <Underline className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive('strike')}
          title="刪除線"
        >
          <Strikethrough className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          isActive={editor.isActive('highlight')}
          title="高亮"
        >
          <Highlighter className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          isActive={editor.isActive('code')}
          title="行內程式碼"
        >
          <Code className="h-4 w-4" />
        </ToolbarButton>

        <Separator />

        {/* 列表 */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
          title="無序列表"
        >
          <List className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
          title="有序列表"
        >
          <ListOrdered className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive('blockquote')}
          title="引用"
        >
          <Quote className="h-4 w-4" />
        </ToolbarButton>

        <Separator />

        {/* 對齊 */}
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          isActive={editor.isActive({ textAlign: 'left' })}
          title="靠左"
        >
          <AlignLeft className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          isActive={editor.isActive({ textAlign: 'center' })}
          title="置中"
        >
          <AlignCenter className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          isActive={editor.isActive({ textAlign: 'right' })}
          title="靠右"
        >
          <AlignRight className="h-4 w-4" />
        </ToolbarButton>

        <Separator />

        {/* 插入 */}
        <ToolbarButton onClick={() => setShowImageDialog(true)} title="插入圖片">
          <ImagePlus className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={insertTable} title="插入表格">
          <TableIcon className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().setHorizontalRule().run()} title="分隔線">
          <Minus className="h-4 w-4" />
        </ToolbarButton>
      </div>

      <ImageUploadDialog
        open={showImageDialog}
        onClose={() => setShowImageDialog(false)}
        onInsert={onImageInsert}
      />
    </>
  );
}
