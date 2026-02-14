'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../supabase/client';
import type { TrainingPlan, PlanProcedure } from '../types';

/**
 * 取得用戶的所有訓練計劃
 *
 * Realtime 訂閱只在用戶已驗證時啟用，避免未登入時的 WebSocket 重試風暴。
 */
export function useTrainingPlans() {
  const [plans, setPlans] = useState<TrainingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let channelRef: ReturnType<typeof supabase.channel> | null = null;

    async function init() {
      // 1. 先確認用戶是否已登入
      const { data: { session } } = await supabase.auth.getSession();

      // 2. 未登入 → 直接完成載入，不查詢也不訂閱
      if (!session) {
        setLoading(false);
        return;
      }

      // 3. 已登入 → 載入資料
      try {
        const { data, error: fetchError } = await supabase
          .from('vt_training_plans')
          .select('*')
          .order('created_at', { ascending: false });

        if (fetchError) throw fetchError;
        setPlans((data as unknown as TrainingPlan[]) || []);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }

      // 4. 已登入 → 訂閱即時更新（Realtime 連線失敗不影響基本功能）
      channelRef = supabase
        .channel('training_plans_changes')
        .on('postgres_changes',
          { event: '*', schema: 'public', table: 'vt_training_plans' },
          (payload) => {
            if (payload.eventType === 'INSERT') {
              setPlans(prev => [payload.new as TrainingPlan, ...prev]);
            } else if (payload.eventType === 'UPDATE') {
              setPlans(prev => prev.map(p =>
                p.id === (payload.new as TrainingPlan).id ? payload.new as TrainingPlan : p
              ));
            } else if (payload.eventType === 'DELETE') {
              setPlans(prev => prev.filter(p => p.id !== (payload.old as TrainingPlan).id));
            }
          }
        )
        .subscribe();
    }

    init();

    return () => {
      if (channelRef) {
        supabase.removeChannel(channelRef);
      }
    };
  }, []);

  return { plans, loading, error, setPlans };
}

/**
 * 取得單一訓練計劃
 */
export function useTrainingPlan(planId: string | null) {
  const [plan, setPlan] = useState<TrainingPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!planId) {
      setLoading(false);
      return;
    }

    async function fetchPlan() {
      try {
        setLoading(true);
        const { data, error: fetchError } = await supabase
          .from('vt_training_plans')
          .select('*')
          .eq('id', planId)
          .single();

        if (fetchError) throw fetchError;
        setPlan(data as unknown as TrainingPlan);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchPlan();
  }, [planId]);

  return { plan, loading, error };
}

/**
 * 取得計劃中的程序排程
 *
 * Realtime 訂閱只在用戶已驗證時啟用。
 */
export function usePlanProcedures(planId: string | null, date?: Date) {
  const [procedures, setProcedures] = useState<PlanProcedure[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!planId) {
      setLoading(false);
      return;
    }

    let channelRef: ReturnType<typeof supabase.channel> | null = null;

    async function fetchProcedures() {
      try {
        setLoading(true);
        let query = supabase
          .from('vt_plan_procedures')
          .select(`
            *,
            procedure:vt_procedures(*)
          `)
          .eq('plan_id', planId)
          .order('order_index');

        // 如果有指定日期，只取該日期的程序
        if (date) {
          const dateStr = date.toISOString().split('T')[0];
          query = query.eq('scheduled_date', dateStr);
        }

        const { data, error: fetchError } = await query;

        if (fetchError) throw fetchError;
        setProcedures((data as unknown as PlanProcedure[]) || []);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    async function init() {
      await fetchProcedures();

      // 只在已登入時訂閱 Realtime
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      channelRef = supabase
        .channel(`plan_${planId}_procedures`)
        .on('postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'vt_plan_procedures',
            filter: `plan_id=eq.${planId}`
          },
          () => {
            fetchProcedures();
          }
        )
        .subscribe();
    }

    init();

    return () => {
      if (channelRef) {
        supabase.removeChannel(channelRef);
      }
    };
  }, [planId, date]);

  return { procedures, loading, error, setProcedures };
}

/**
 * 建立訓練計劃
 */
export async function createTrainingPlan(plan: Omit<TrainingPlan, 'id' | 'user_id' | 'created_at' | 'updated_at'>) {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Not authenticated');
  }

  const { data, error } = await supabase
    .from('vt_training_plans')
    .insert({
      ...plan,
      user_id: user.id,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * 更新訓練計劃
 */
export async function updateTrainingPlan(
  planId: string,
  updates: Partial<TrainingPlan>
) {
  const { data, error } = await supabase
    .from('vt_training_plans')
    .update(updates)
    .eq('id', planId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * 刪除訓練計劃
 */
export async function deleteTrainingPlan(planId: string) {
  const { error } = await supabase
    .from('vt_training_plans')
    .delete()
    .eq('id', planId);

  if (error) throw error;
}

/**
 * 添加程序到計劃
 */
export async function addProcedureToPlan(
  planId: string,
  procedureId: string,
  scheduledDate: string,
  options?: {
    scheduled_time?: string;
    notes?: string;
    order_index?: number;
  }
) {
  const { data, error } = await supabase
    .from('vt_plan_procedures')
    .insert({
      plan_id: planId,
      procedure_id: procedureId,
      scheduled_date: scheduledDate,
      ...options,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * 更新排程程序
 */
export async function updatePlanProcedure(
  procedureId: string,
  updates: Partial<PlanProcedure>
) {
  const { data, error } = await supabase
    .from('vt_plan_procedures')
    .update(updates)
    .eq('id', procedureId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * 從計劃中移除程序
 */
export async function removeProcedureFromPlan(planProcedureId: string) {
  const { error } = await supabase
    .from('vt_plan_procedures')
    .delete()
    .eq('id', planProcedureId);

  if (error) throw error;
}

/**
 * 標記程序為完成
 */
export async function markProcedureComplete(planProcedureId: string) {
  const { data, error } = await supabase
    .from('vt_plan_procedures')
    .update({
      is_completed: true,
      completed_at: new Date().toISOString(),
    })
    .eq('id', planProcedureId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * 取得計劃統計資訊
 */
export async function getPlanStats(planId: string) {
  const { data, error } = await supabase
    .from('vt_plan_procedures')
    .select('is_completed')
    .eq('plan_id', planId);

  if (error) throw error;

  const total = data?.length || 0;
  const completed = data?.filter(p => p.is_completed).length || 0;
  const remaining = total - completed;
  const completionRate = total > 0 ? (completed / total) * 100 : 0;

  return {
    total,
    completed,
    remaining,
    completionRate,
  };
}
