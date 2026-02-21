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
import { DEPARTMENTS } from '@/lib/constants/departments';
import type { JSONContent } from '@tiptap/react';

export default function NewProcedurePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'en' | 'zh'>('zh');

  // 基本欄位
  const [name, setName] = useState('');
  const [nameZh, setNameZh] = useState('');
  const [department, setDepartment] = useState('general');
  const [category, setCategory] = useState('A');
  const [difficulty, setDifficulty] = useState<number>(1);
  const [duration, setDuration] = useState<number>(30);
  const [tagsInput, setTagsInput] = useState('');

  // 富文本內容
  const [contentJson, setContentJson] = useState<JSONContent | null>(null);
  const [contentJsonZh, setContentJsonZh] = useState<JSONContent | null>(null);

  async function handleSave() {
    if (!name.trim()) {
      setError('英文名稱為必填');
      return;
    }
    setError('');
    setSaving(true);

    try {
      const tags = tagsInput
        .split(',')
        .map(t => t.trim())
        .filter(Boolean);

      const res = await fetch('/api/admin/procedures', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          name_zh: nameZh.trim() || null,
          department,
          category,
          difficulty_level: difficulty,
          estimated_duration_minutes: duration,
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
      router.push(`/admin/procedures/${data.id}/edit`);
    } catch (err) {
      setError(err instanceof Error ? err.message : '建立失敗');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* 頁首 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/procedures">
              <ArrowLeft className="h-4 w-4 mr-1" />
              返回
            </Link>
          </Button>
          <div>
            <h1 className="text-xl font-bold">新建程序</h1>
            <p className="text-sm text-muted-foreground">建立新的獸醫臨床程序</p>
          </div>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
          儲存
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-sm">{error}</div>
      )}

      {/* 基本資訊 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">基本資訊</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>英文名稱 *</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Thoracocentesis" />
          </div>
          <div className="space-y-1.5">
            <Label>中文名稱</Label>
            <Input value={nameZh} onChange={(e) => setNameZh(e.target.value)} placeholder="例：胸腔穿刺術" />
          </div>
          <div className="space-y-1.5">
            <Label>科別</Label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full border rounded-md px-3 py-2 text-sm bg-white"
            >
              {DEPARTMENTS.map(d => (
                <option key={d.id} value={d.id}>{d.name_zh}（{d.name_en}）</option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <Label>分類</Label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border rounded-md px-3 py-2 text-sm bg-white"
            >
              {['A', 'B', 'C', 'D', 'E'].map(c => (
                <option key={c} value={c}>Category {c}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <Label>難度（1-5）</Label>
            <Input type="number" min={1} max={5} value={difficulty} onChange={(e) => setDifficulty(Number(e.target.value))} />
          </div>
          <div className="space-y-1.5">
            <Label>預估時間（分鐘）</Label>
            <Input type="number" min={1} value={duration} onChange={(e) => setDuration(Number(e.target.value))} />
          </div>
          <div className="space-y-1.5 md:col-span-2">
            <Label>標籤（逗號分隔）</Label>
            <Input value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} placeholder="e.g. surgery, thoracic, emergency" />
          </div>
        </CardContent>
      </Card>

      {/* 內容編輯器 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">程序內容</CardTitle>
            <div className="flex gap-2">
              <Badge
                variant={activeTab === 'zh' ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => setActiveTab('zh')}
              >
                中文
              </Badge>
              <Badge
                variant={activeTab === 'en' ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => setActiveTab('en')}
              >
                English
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {activeTab === 'zh' ? (
            <RichTextEditor
              content={contentJsonZh}
              onChange={setContentJsonZh}
              placeholder="在此編輯中文內容⋯包括適應症、禁忌症、設備、步驟、術後照護等"
            />
          ) : (
            <RichTextEditor
              content={contentJson}
              onChange={setContentJson}
              placeholder="Edit English content here... Include indications, contraindications, equipment, steps, aftercare, etc."
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
