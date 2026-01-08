
import React, { useEffect } from 'react';
import { Viewer } from './components/Viewer';
import { LanguageSelector } from './LanguageSelector';
import { useStore } from './store';
import { useLanguageStore } from './languageStore';

export default function App() {
  const { globalSettings, currentLanguage, setCurrentLanguage } = useStore();
  const { setLanguage } = useLanguageStore();

  useEffect(() => {
    const saved = localStorage.getItem('dna-lang-pref');
    if (saved) {
        setCurrentLanguage(saved);
        setLanguage(saved);
    }
  }, []);

  useEffect(() => {
    const isDark = globalSettings['GL10']?.params?.[6]?.value === 'Dark';
    if (isDark) { 
      document.documentElement.classList.add('dark'); 
      document.body.style.backgroundColor = '#0F172A';
    } else { 
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#FFFFFF';
    }
  }, [globalSettings]);

  return (
    <div className="relative min-h-screen w-full">
      <LanguageSelector />
      <Viewer key={currentLanguage} />
    </div>
  );
}
