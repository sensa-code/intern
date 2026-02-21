'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Loader2, Eye, CheckCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RichTextEditor } from '@/components/editor';
import { MODULE_TYPES } from '@/lib/constants/modules';
import { DEPARTMENTS } from '@/lib/constants/departments';
import type { JSONContent } from '@tiptap/react';

export default function EditModulePage() {
  const router = useRouter();
  const params = useParams();
  const moduleId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState<'en' | 'zh'>('zh');

  const [moduleType, setModuleType] = useState('');
  const [title, setTitle] = useState('');
  const [titleZh, setTitleZh] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionZh, setDescriptionZh] = useState('');
  const [department, setDepartment] = useState('general');
  const [tagsInput, setTagsInput] = useState('');
  const [contentStatus, setContentStatus] = useState('draft');
  const [slug, setSlug] = useState('');

  const [contentJson, setContentJson] = useState<JSONContent | null>(null);
  const [contentJsonZh, setContentJsonZh] = useState<JSONContent | null>(null);

  const loadModule = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/modules');
      if (!res.ok) throw new Error('載入失敗');
      const { data } = await res.json();
      const mod = data?.find((m: { id: string }) => m.id === moduleId);
      if (!mod) throw new Error('找不到模組');

      setModuleType(mod.module_type);
      setTitle(mod.title);
      setTitleZh(mod.title_zh ?? '');
      setDescription(mod.description ?? '');
      setDescriptionZh(mod.description_zh ?? '');
      setDepartment(mod.department);
      setTagsInput((mod.tags ?? []).join(', '));
      setContentStatus(mod.content_status);
      setSlug(mod.slug);
      setContentJson(mod.content_json);
      setContentJsonZh(mod.content_json_zh);
    } catch (err) {
      setError(err instanceof Error ? err.message : '載入失敗');
    } finally {
      setLoading(false);
    }
  }, [moduleId]);

  useEffect(() => { loadModule(); }, [loadModule]);

  async function handleSave(newStatus?: string) {
    setError('');
    setSuccess('');
    setSaving(true);
    try {
      const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);
      const body: Record<string, unknown> = {
        title: title.trim(),
        title_zh: titleZh.trim() || null,
        description: description.trim() || null,
        description_zh: descriptionZh.trim() || null,
        department,
        tags,
        content_json: contentJson,
        content_json_zh: contentJsonZh,
      };
      if (newStatus) body.content_status = newStatus;

      const res = await fetch(`/api/admin/modules/${moduleId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || '儲存失敗');
      }

      if (newStatus) setContentStatus(newStatus);
      setSuccess('儲存成功！');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : '儲存失敗');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/modules"><ArrowLeft className="h-4 w-4 mr-1" />返回</Link>
          </Button>
          <div>
            <h1 className="text-xl font-bold">{titleZh || title}</h1>
            <p className="text-sm text-muted-foreground">{title}</p>
          </div>
          <Badge variant={contentStatus === 'verified' ? 'default' : contentStatus === 'draft' ? 'secondary' : 'outline'}>
            {contentStatus === 'verified' ? '已發布' : contentStatus === 'draft' ? '草稿' : '待審核'}
          </Badge>
        </div>
        <div className="flex gap-2">
          {slug && (
            <Button variant="outline" size="sm" asChild>
              <Link href={`/modules/${slug}`} target="_blank"><Eye className="h-4 w-4 mr-1" />預覽</Link>
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={() => handleSave('needs_review')} disabled={saving}>
            <Send className="h-4 w-4 mr-1" />送審
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleSave('verified')} disabled={saving}>
            <CheckCircle className="h-4 w-4 mr-1" />發布
          </Button>
          <Button onClick={() => handleSave()} disabled={saving}>
            {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
            儲存
          </Button>
        </div>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-sm">{error}</div>}
      {success && <div className="bg-green-50 border border-green-200 text-green-700 p-3 rounded-lg text-sm">{success}</div>}

      <Card>
        <CardHeader><CardTitle className="text-base">基本資訊</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>模組類型</Label>
            <Input value={MODULE_TYPES.find(mt => mt.id === moduleType)?.name_zh ?? moduleType} disabled />
          </div>
          <div className="space-y-1.5">
            <Label>科別</Label>
            <select value={department} onChange={e => setDepartment(e.target.value)} className="w-full border rounded-md px-3 py-2 text-sm bg-white">
              {DEPARTMENTS.map(d => <option key={d.id} value={d.id}>{d.name_zh}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <Label>英文標題</Label>
            <Input value={title} onChange={e => setTitle(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>中文標題</Label>
            <Input value={titleZh} onChange={e => setTitleZh(e.target.value)} />
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
            <Label>標籤</Label>
            <Input value={tagsInput} onChange={e => setTagsInput(e.target.value)} />
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
            <RichTextEditor key="mod-zh" content={contentJsonZh} onChange={setContentJsonZh} placeholder="在此編輯中文內容..." />
          ) : (
            <RichTextEditor key="mod-en" content={contentJson} onChange={setContentJson} placeholder="Edit English content here..." />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
