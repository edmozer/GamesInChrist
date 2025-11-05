'use client';

import { translations } from './translations';
import { useLanguage } from './language-context';
import type { TranslationKey } from './translations';

function interpolate(str: string, vars?: Record<string, string | number>) {
  if (!vars) return str;
  return str.replace(/\{(\w+)\}/g, (_, k) => vars[k] !== undefined ? String(vars[k]) : `{${k}}`);
}

export function useTranslation() {
  const { language } = useLanguage();

  const t = (key: TranslationKey, vars?: Record<string, string | number>) => {
    const str = translations[language][key];
    return interpolate(str, vars);
  };

  return { t };
}