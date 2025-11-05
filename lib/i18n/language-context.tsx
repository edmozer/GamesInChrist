'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import type { Language } from './translations';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  // Start with undefined, set on client
  const [language, setLanguage] = useState<Language | undefined>(undefined);

  useEffect(() => {
    // Only run on client
    let lang: Language = 'en';
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('language') as Language;
      if (savedLang && (savedLang === 'pt' || savedLang === 'en' || savedLang === 'es')) {
        lang = savedLang;
      } else {
        const navLang = navigator.language || navigator.languages?.[0] || '';
        if (navLang.startsWith('pt-BR') || navLang.startsWith('pt-PT') || navLang.startsWith('pt')) {
          lang = 'pt';
        } else if (navLang.startsWith('es')) {
          lang = 'es';
        } else {
          lang = 'en';
        }
        localStorage.setItem('language', lang);
      }
    }
    setLanguage(lang);
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
    }
  };

  // Don't render children until language is set (avoids hydration mismatch)
  if (!language) return null;

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}