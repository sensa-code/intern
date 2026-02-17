import type { Procedure } from '@/lib/types';

/**
 * 取得程序的顯示名稱
 * 格式：「中文名稱（English Name）」
 * 如果沒有中文名稱，fallback 到英文名稱
 */
export function getDisplayName(procedure: Pick<Procedure, 'name' | 'name_zh'>): string {
  if (procedure.name_zh) {
    return `${procedure.name_zh}（${procedure.name}）`;
  }
  return procedure.name;
}

/**
 * 取得程序的主要名稱（中文優先）
 */
export function getPrimaryName(procedure: Pick<Procedure, 'name' | 'name_zh'>): string {
  return procedure.name_zh || procedure.name;
}

/**
 * 取得程序的次要名稱（英文，用於副標題）
 * 如果沒有中文名稱則回傳 null（不需要顯示副標題）
 */
export function getSecondaryName(procedure: Pick<Procedure, 'name' | 'name_zh'>): string | null {
  return procedure.name_zh ? procedure.name : null;
}
