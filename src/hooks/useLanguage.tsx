import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Language, TranslationContent } from '@/types';
import { translations } from '@i18n/translations';

type LanguageContextValue = {
  language: Language;
  toggleLanguage: () => void;
  t: TranslationContent;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const getInitialLanguage = (): Language => {
  const stored = localStorage.getItem('language') as Language | null;
  if (stored === 'es' || stored === 'en') return stored;
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith('es')) return 'es';
  return 'en';
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => setLanguage(prev => (prev === 'es' ? 'en' : 'es'));

  const value = useMemo<LanguageContextValue>(() => ({
    language,
    toggleLanguage,
    t: translations[language],
  }), [language]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
};


