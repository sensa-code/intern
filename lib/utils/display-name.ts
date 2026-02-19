import type { Procedure, ContentLocale } from '@/lib/types';

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
 * 取得程序的主要名稱（根據語言偏好）
 * - zh: 中文優先，fallback 英文
 * - en: 英文
 */
export function getPrimaryName(
  procedure: Pick<Procedure, 'name' | 'name_zh'>,
  locale?: ContentLocale,
): string {
  if (locale === 'en') return procedure.name;
  return procedure.name_zh || procedure.name;
}

/**
 * 取得程序的次要名稱（副標題用）
 * - zh 模式：回傳英文名
 * - en 模式：回傳中文名
 */
export function getSecondaryName(
  procedure: Pick<Procedure, 'name' | 'name_zh'>,
  locale?: ContentLocale,
): string | null {
  if (!procedure.name_zh) return null;
  if (locale === 'en') return procedure.name_zh;
  return procedure.name;
}
