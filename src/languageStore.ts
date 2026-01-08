
import { create } from 'zustand';
import { dictionary } from './dictionary';

interface LanguageStore {
  currentLang: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

export const useLanguageStore = create<LanguageStore>((set, get) => ({
  currentLang: 'en',
  setLanguage: (lang) => set({ currentLang: lang }),
  t: (key) => {
    const lang = get().currentLang;
    return (dictionary as any)[lang]?.[key] || (dictionary as any)['en']?.[key] || key;
  },
}));
