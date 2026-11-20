import { createContext } from 'react';
import type { Language, TranslationContent } from '@/types';

export type LanguageContextValue = {
  language: Language;
  toggleLanguage: () => void;
  t: TranslationContent;
};

export const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);
