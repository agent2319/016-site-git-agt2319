
import React from 'react';
import { useLanguageStore } from './languageStore';
import { useStore } from './store';
import { Sun, Moon, Globe } from 'lucide-react';

export const LanguageSelector = () => {
  const { currentLang, setLanguage } = useLanguageStore();
  const { setCurrentLanguage, toggleSiteTheme, globalSettings } = useStore();
  const isDark = globalSettings?.['GL10']?.params?.[6]?.value === 'Dark';

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setLanguage(val);
    setCurrentLanguage(val);
    localStorage.setItem('dna-lang-pref', val);
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
      <div className="relative group">
        <div className="absolute inset-0 bg-black/20 backdrop-blur-md rounded-lg" />
        <div className="relative flex items-center px-2 py-1.5 gap-1.5">
          <Globe size={14} className="text-white/70" />
          <select 
            value={currentLang} 
            onChange={handleChange} 
            className="bg-transparent text-xs font-bold text-white outline-none appearance-none cursor-pointer uppercase w-10 text-center"
          >
            {['en', 'ru', 'uk', 'de', 'fr', 'es', 'it', 'zh', 'pl'].map(l => (
              <option key={l} value={l} className="text-black">{l.toUpperCase()}</option>
            ))}
          </select>
        </div>
      </div>
      <button onClick={toggleSiteTheme} className="p-1.5 bg-black/20 backdrop-blur-md rounded-lg text-white/80 hover:text-white transition-all">
        {isDark ? <Sun size={16} /> : <Moon size={16} />}
      </button>
    </div>
  );
};
