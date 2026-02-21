'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RichTextEditor } from '@/components/editor';
import { MODULE_TYPES } from '@/lib/constants/modules';
import { DEPARTMENTS } from '@/lib/constants/departments';
import type { JSONContent } from '@tiptap/react';

export default function NewModulePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'en' | 'zh'>('zh');

  const [moduleType, setModuleType] = useState('drug_reference');
  const [title, setTitle] = useState('');
  const [titleZh, setTitleZh] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionZh, setDescriptionZh] = useState('');
  const [department, setDepartment] = useState('general');
  const [tagsInput, setTagsInput] = useState('');

  const [contentJson, setContentJson] = useState<JSONContent | null>(null);
  const [contentJsonZh, setContentJsonZh] = useState<JSONContent | null>(null);

  async function handleSave() {
    if (!title.trim()) {
      setError('英文標題為必填');
      return;
    }
    setError('');
    setSaving(true);

    try {
      const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);
      const res = await fetch('/api/admin/modules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          module_type: moduleType,
          title: title.trim(),
          title_zh: titleZh.trim() || null,
          description: description.trim() || null,
          description_zh: descriptionZh.trim() || null,
          department,
          tags,
          content_json: contentJson,
          content_json_zh: contentJsonZh,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || '建立失敗');
      }

      const { data } = await res.json();
      router.push(`/admin/modules/${data.id}/edit`);
    } catch (err) {
      setError(err instanceof Error ? err.message : '建立失敗');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/modules"><ArrowLeft className="h-4 w-4 mr-1" />返回</Link>
          </Button>
          <div>
            <h1 className="text-xl font-bold">新建模組</h1>
            <p className="text-sm text-muted-foreground">建立新的獸醫知識模組</p>
          </div>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
          儲存
        </Button>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-sm">{error}</div>}

      <Card>
        <CardHeader><CardTitle className="text-base">基本資訊</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>模組類型 *</Label>
            <select value={moduleType} onChange={e => setModuleType(e.target.value)} className="w-full border rounded-md px-3 py-2 text-sm bg-white">
              {MODULE_TYPES.map(mt => <option key={mt.id} value={mt.id}>{mt.name_zh}（{mt.name_en}）</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <Label>科別</Label>
            <select value={department} onChange={e => setDepartment(e.target.value)} className="w-full border rounded-md px-3 py-2 text-sm bg-white">
              {DEPARTMENTS.map(d => <option key={d.id} value={d.id}>{d.name_zh}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <Label>英文標題 *</Label>
            <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Common Emergency Drugs" />
          </div>
          <div className="space-y-1.5">
            <Label>中文標題</Label>
            <Input value={titleZh} onChange={e => setTitleZh(e.target.value)} placeholder="例：常用急診藥物" />
          </div>
          <div className="space-y-1.5">
            <Label>英文描述</Label>
            <Input value={description} onChange={e => setDescription(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>中文描述</Label>
            <Input value={descriptionZh} onChange={e => setDescriptionZh(e.target.value)} />
          </div>
          <div className="space-y-1.5 md:col-span-2">
            <Label>標籤（逗號分隔）</Label>
            <Input value={tagsInput} onChange={e => setTagsInput(e.target.value)} placeholder="e.g. emergency, drugs, dosage" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">模組內容</CardTitle>
            <div className="flex gap-2">
              <Badge variant={activeTab === 'zh' ? 'default' : 'outline'} className="cursor-pointer" onClick={() => setActiveTab('zh')}>中文</Badge>
              <Badge variant={activeTab === 'en' ? 'default' : 'outline'} className="cursor-pointer" onClick={() => setActiveTab('en')}>English</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {activeTab === 'zh' ? (
            <RichTextEditor content={contentJsonZh} onChange={setContentJsonZh} placeholder="在此編輯中文內容..." />
          ) : (
            <RichTextEditor content={contentJson} onChange={setContentJson} placeholder="Edit English content here..." />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
