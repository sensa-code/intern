'use client';

import { useEffect, useState } from 'react';
import type { Procedure, ProcedureFilters, ProcedureProgress, PaginationInfo } from '../types';
import { supabase } from '../supabase/client';

/**
 * 取得程序列表（分頁） — 透過 API Route 查詢（繞過 RLS）
 */
export function useProcedures(filters?: ProcedureFilters) {
  const [procedures, setProcedures] = useState<Procedure[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchProcedures() {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams();
        if (filters?.category) params.set('category', filters.category);
        if (filters?.department) params.set('department', filters.department);
        if (filters?.search) params.set('search', filters.search);
        if (filters?.page) params.set('page', String(filters.page));
        if (filters?.pageSize) params.set('pageSize', String(filters.pageSize));

        const url = `/api/procedures${params.toString() ? `?${params}` : ''}`;
        const res = await fetch(url, { signal: controller.signal });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }

        const json = await res.json();
        // 支援新格式 { data, pagination } 和舊格式（直接陣列）
        if (Array.isArray(json)) {
          setProcedures(json);
          setPagination(null);
        } else {
          setProcedures(json.data ?? []);
          setPagination(json.pagination ?? null);
        }
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          setError(err as Error);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchProcedures();

    return () => controller.abort();
  }, [filters?.category, filters?.department, filters?.search, filters?.page, filters?.pageSize]);

  return { procedures, pagination, loading, error };
}

/**
 * 取得單一程序詳情 — 透過 API Route
 */
export function useProcedure(procedureId: string | null) {
  const [procedure, setProcedure] = useState<Procedure | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!procedureId) {
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    async function fetchProcedure() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`/api/procedures/${procedureId}`, {
          signal: controller.signal,
        });

        if (!res.ok) {
          if (res.status === 404) {
            setError(new Error('找不到此程序'));
          } else {
            throw new Error(`HTTP ${res.status}: ${res.statusText}`);
          }
          return;
        }

        const data: Procedure = await res.json();
        setProcedure(data);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          setError(err as Error);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchProcedure();

    return () => controller.abort();
  }, [procedureId]);

  return { procedure, loading, error };
}

/**
 * 取得程序進度（仍使用 client-side Supabase，因為需要 auth）
 */
export function useProcedureProgress(procedureId: string | null) {
  const [progress, setProgress] = useState<ProcedureProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!procedureId) {
      setLoading(false);
      return;
    }

    async function fetchProgress() {
      try {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          setLoading(false);
          return;
        }

        const { data, error: fetchError } = await supabase
          .from('vt_procedure_progress')
          .select('*')
          .eq('procedure_id', procedureId)
          .eq('user_id', user.id)
          .single();

        if (fetchError && fetchError.code !== 'PGRST116') {
          throw fetchError;
        }

        setProgress(data as unknown as ProcedureProgress);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchProgress();
  }, [procedureId]);

  return { progress, loading, error, setProgress };
}

/**
 * 更新程序進度
 */
export async function updateProcedureProgress(
  procedureId: string,
  updates: Partial<ProcedureProgress>
) {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Not authenticated');
  }

  const { data, error } = await supabase
    .from('vt_procedure_progress')
    .upsert({
      user_id: user.id,
      procedure_id: procedureId,
      ...updates,
    }, {
      onConflict: 'user_id,procedure_id'
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * 記錄練習次數
 */
export async function incrementPracticeCount(procedureId: string) {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Not authenticated');
  }

  const { data: currentProgress } = await supabase
    .from('vt_procedure_progress')
    .select('practice_count')
    .eq('user_id', user.id)
    .eq('procedure_id', procedureId)
    .single();

  const newCount = (currentProgress?.practice_count || 0) + 1;

  const { data, error } = await supabase
    .from('vt_procedure_progress')
    .upsert({
      user_id: user.id,
      procedure_id: procedureId,
      practice_count: newCount,
      last_practiced_at: new Date().toISOString(),
    }, {
      onConflict: 'user_id,procedure_id'
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * 依分類分組程序
 */
export function groupProceduresByCategory(procedures: Procedure[]) {
  const grouped: Record<string, Procedure[]> = {};

  procedures.forEach(proc => {
    if (!grouped[proc.category]) {
      grouped[proc.category] = [];
    }
    grouped[proc.category].push(proc);
  });

  return grouped;
}
