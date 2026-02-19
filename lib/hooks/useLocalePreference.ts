'use client';

import { useState, useEffect } from 'react';
import type { ContentLocale } from '@/lib/types';

const STORAGE_KEY = 'vet-trainer-content-locale';
const DEFAULT_LOCALE: ContentLocale = 'zh';

/**
 * 持久化的內容語言偏好 hook
 * 預設為中文 ('zh')，用戶切換後存入 localStorage
 */
export function useLocalePreference(): [ContentLocale, (locale: ContentLocale) => void] {
  const [locale, setLocaleState] = useState<ContentLocale>(DEFAULT_LOCALE);

  // 掛載後從 localStorage 讀取
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'en' || saved === 'zh') {
        setLocaleState(saved);
      }
    } catch {
      // localStorage 不可用（SSR、隱私模式限制）
    }
  }, []);

  const setLocale = (newLocale: ContentLocale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem(STORAGE_KEY, newLocale);
    } catch {
      // 靜默失敗
    }
  };

  return [locale, setLocale];
}
