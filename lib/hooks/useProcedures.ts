'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../supabase/client';
import type { Procedure, ProcedureFilters, ProcedureProgress } from '../types';

/**
 * 取得所有程序
 */
export function useProcedures(filters?: ProcedureFilters) {
  const [procedures, setProcedures] = useState<Procedure[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchProcedures() {
      try {
        setLoading(true);
        let query = supabase
          .from('vt_procedures')
          .select('*')
          .order('name');

        // 應用過濾器
        if (filters?.category) {
          query = query.eq('category', filters.category);
        }

        if (filters?.search) {
          query = query.ilike('name', `%${filters.search}%`);
        }

        if (filters?.difficulty && filters.difficulty.length > 0) {
          query = query.in('difficulty_level', filters.difficulty);
        }

        const { data, error: fetchError } = await query;

        if (fetchError) throw fetchError;
        setProcedures((data as unknown as Procedure[]) || []);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchProcedures();
  }, [filters?.category, filters?.search, filters?.difficulty]);

  return { procedures, loading, error };
}

/**
 * 取得單一程序詳情
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

    async function fetchProcedure() {
      try {
        setLoading(true);
        const { data, error: fetchError } = await supabase
          .from('vt_procedures')
          .select('*')
          .eq('id', procedureId)
          .single();

        if (fetchError) throw fetchError;
        setProcedure(data as unknown as Procedure);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchProcedure();
  }, [procedureId]);

  return { procedure, loading, error };
}

/**
 * 取得程序進度
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
          // PGRST116 = 沒有找到資料，這是正常的
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

  // 首先取得當前進度
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
