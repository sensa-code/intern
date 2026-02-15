'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import type { ContentLocale } from '@/lib/types';

interface LanguageToggleProps {
  locale: ContentLocale;
  onLocaleChange: (locale: ContentLocale) => void;
}

/**
 * EN/中 語言切換按鈕
 * 用於程序詳情頁，切換 8 個內容欄位的顯示語言
 */
export function LanguageToggle({ locale, onLocaleChange }: LanguageToggleProps) {
  return (
    <div className="flex items-center gap-1 rounded-lg border p-1">
      <Button
        variant={locale === 'en' ? 'default' : 'ghost'}
        size="sm"
        className="h-7 px-3 text-xs font-medium"
        onClick={() => onLocaleChange('en')}
        aria-label="Switch to English"
        aria-pressed={locale === 'en'}
      >
        EN
      </Button>
      <Button
        variant={locale === 'zh' ? 'default' : 'ghost'}
        size="sm"
        className="h-7 px-3 text-xs font-medium"
        onClick={() => onLocaleChange('zh')}
        aria-label="切換為中文"
        aria-pressed={locale === 'zh'}
      >
        中
      </Button>
    </div>
  );
}
