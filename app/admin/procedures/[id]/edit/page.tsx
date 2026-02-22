'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft, Save, Loader2, Eye, CheckCircle, Send,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RichTextEditor } from '@/components/editor';
import { DEPARTMENTS } from '@/lib/constants/departments';
import type { JSONContent } from '@tiptap/react';

interface ProcedureData {
  id: string;
  procedure_id: string;
  name: string;
  name_zh: string | null;
  department: string;
  category: string;
  difficulty_level: number | null;
  estimated_duration_minutes: number | null;
  tags: string[] | null;
  content_json: JSONContent | null;
  content_json_zh: JSONContent | null;
  content_status: string | null;
  illustration_url: string | null;
  flow_diagram: string | null;
  // 純文字欄位（向後相容）
  indications: string | null;
  indications_zh: string | null;
  contraindications: string | null;
  contraindications_zh: string | null;
  equipment: string | null;
  equipment_zh: string | null;
  patient_preparation: string | null;
  patient_preparation_zh: string | null;
  technique: string | null;
  technique_zh: string | null;
  procedure_steps: string | null;
  procedure_steps_zh: string | null;
  aftercare: string | null;
  aftercare_zh: string | null;
  complications: string | null;
  complications_zh: string | null;
}

/**
 * 將純文字內容欄位轉為簡易 ProseMirror JSON（向後相容用）
 */
function plainTextToJson(proc: ProcedureData, locale: 'en' | 'zh'): JSONContent | null {
  const sections: { title: string; field: string }[] = [
    { title: locale === 'zh' ? '適應症' : 'Indications', field: 'indications' },
    { title: locale === 'zh' ? '禁忌症' : 'Contraindications', field: 'contraindications' },
    { title: locale === 'zh' ? '設備' : 'Equipment', field: 'equipment' },
    { title: locale === 'zh' ? '患者準備' : 'Patient Preparation', field: 'patient_preparation' },
    { title: locale === 'zh' ? '技術' : 'Technique', field: 'technique' },
    { title: locale === 'zh' ? '程序步驟' : 'Procedure Steps', field: 'procedure_steps' },
    { title: locale === 'zh' ? '術後照護' : 'Aftercare', field: 'aftercare' },
    { title: locale === 'zh' ? '併發症' : 'Complications', field: 'complications' },
  ];

  const content: JSONContent[] = [];
  for (const sec of sections) {
    const key = locale === 'zh' ? `${sec.field}_zh` : sec.field;
    const value = (proc as unknown as Record<string, unknown>)[key] as string | null;
    if (value && value.trim()) {
      content.push({
        type: 'heading',
        attrs: { level: 3 },
        content: [{ type: 'text', text: sec.title }],
      });
      // 按段落分割
      const paragraphs = value.split('\n').filter(line => line.trim());
      for (const para of paragraphs) {
        content.push({
          type: 'paragraph',
          content: [{ type: 'text', text: para }],
        });
      }
    }
  }

  if (content.length === 0) return null;
  return { type: 'doc', content };
}

export default function EditProcedurePage() {
  const params = useParams();
  const procedureId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState<'en' | 'zh'>('zh');

  // 表單資料
  const [name, setName] = useState('');
  const [nameZh, setNameZh] = useState('');
  const [department, setDepartment] = useState('general');
  const [category, setCategory] = useState('A');
  const [difficulty, setDifficulty] = useState<number>(1);
  const [duration, setDuration] = useState<number>(30);
  const [tagsInput, setTagsInput] = useState('');
  const [contentStatus, setContentStatus] = useState('draft');
  const [procedureSlug, setProcedureSlug] = useState('');

  // 富文本
  const [contentJson, setContentJson] = useState<JSONContent | null>(null);
  const [contentJsonZh, setContentJsonZh] = useState<JSONContent | null>(null);

  const loadProcedure = useCallback(async () => {
    try {
      const res = await fetch(`/api/admin/procedures/${procedureId}`);
      if (!res.ok) throw new Error('載入失敗');
      const { data: proc } = await res.json();
      if (!proc) throw new Error('找不到程序');

      setName(proc.name);
      setNameZh(proc.name_zh ?? '');
      setDepartment(proc.department);
      setCategory(proc.category);
      setDifficulty(proc.difficulty_level ?? 1);
      setDuration(proc.estimated_duration_minutes ?? 30);
      setTagsInput((proc.tags ?? []).join(', '));
      setContentStatus(proc.content_status ?? 'needs_review');
      setProcedureSlug(proc.procedure_id);

      // 如果有 content_json 用它，否則從純文字轉換
      setContentJson(proc.content_json ?? plainTextToJson(proc, 'en'));
      setContentJsonZh(proc.content_json_zh ?? plainTextToJson(proc, 'zh'));
    } catch (err) {
      setError(err instanceof Error ? err.message : '載入失敗');
    } finally {
      setLoading(false);
    }
  }, [procedureId]);

  useEffect(() => {
    loadProcedure();
  }, [loadProcedure]);

  async function handleSave(newStatus?: string) {
    setError('');
    setSuccess('');
    setSaving(true);

    try {
      const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);

      const body: Record<string, unknown> = {
        name: name.trim(),
        name_zh: nameZh.trim() || null,
        department,
        category,
        difficulty_level: difficulty,
        estimated_duration_minutes: duration,
        tags,
        content_json: contentJson,
        content_json_zh: contentJsonZh,
      };

      if (newStatus) {
        body.content_status = newStatus;
      }

      const res = await fetch(`/api/admin/procedures/${procedureId}`, {
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
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* 頁首 */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/procedures">
              <ArrowLeft className="h-4 w-4 mr-1" />
              返回
            </Link>
          </Button>
          <div>
            <h1 className="text-xl font-bold">{nameZh || name}</h1>
            <p className="text-sm text-muted-foreground">{name}</p>
          </div>
          <Badge variant={contentStatus === 'verified' ? 'default' : contentStatus === 'draft' ? 'secondary' : 'outline'}>
            {contentStatus === 'verified' ? '已審核' : contentStatus === 'draft' ? '草稿' : '待審核'}
          </Badge>
        </div>
        <div className="flex gap-2">
          {procedureSlug && (
            <Button variant="outline" size="sm" asChild>
              <Link href={`/procedures/${procedureSlug}`} target="_blank">
                <Eye className="h-4 w-4 mr-1" />
                預覽
              </Link>
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={() => handleSave('needs_review')} disabled={saving}>
            <Send className="h-4 w-4 mr-1" />
            送審
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleSave('verified')} disabled={saving}>
            <CheckCircle className="h-4 w-4 mr-1" />
            通過審核
          </Button>
          <Button onClick={() => handleSave()} disabled={saving}>
            {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
            儲存
          </Button>
        </div>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-sm">{error}</div>}
      {success && <div className="bg-green-50 border border-green-200 text-green-700 p-3 rounded-lg text-sm">{success}</div>}

      {/* 基本資訊 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">基本資訊</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>英文名稱 *</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>中文名稱</Label>
            <Input value={nameZh} onChange={(e) => setNameZh(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>科別</Label>
            <select value={department} onChange={(e) => setDepartment(e.target.value)} className="w-full border rounded-md px-3 py-2 text-sm bg-white">
              {DEPARTMENTS.map(d => <option key={d.id} value={d.id}>{d.name_zh}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <Label>分類</Label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border rounded-md px-3 py-2 text-sm bg-white">
              {['A', 'B', 'C', 'D', 'E'].map(c => <option key={c} value={c}>Category {c}</option>)}
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
            <Input value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} />
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
              key="editor-zh"
              content={contentJsonZh}
              onChange={setContentJsonZh}
              placeholder="在此編輯中文內容..."
            />
          ) : (
            <RichTextEditor
              key="editor-en"
              content={contentJson}
              onChange={setContentJson}
              placeholder="Edit English content here..."
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
