
import { useStore } from '@/store';
import { translateText } from './autoTranslate';

/**
 * CORE SMART TRANSLATION UTILITY
 */
export const translateData = (data: any, lang: string) => {
  if (!data) return {};
  if (!lang || lang === 'en') return data;

  const { translationCache, setTranslation } = useStore.getState();
  const translated: any = Array.isArray(data) ? [] : {};

  Object.keys(data).forEach(key => {
    const value = data[key];
    
    // Глубокая рекурсия для объектов и массивов
    if (value !== null && typeof value === 'object') {
      translated[key] = translateData(value, lang);
      return;
    }

    if (typeof value !== 'string') {
      translated[key] = value;
      return;
    }

    const langKey = `${key}_${lang}`;
    const cacheKey = `${lang}:${value}`;
    
    // 1. Проверяем ручной перевод
    if (data[langKey] !== undefined) {
      translated[key] = data[langKey];
    } 
    // 2. Проверяем кеш нейросети
    else if (translationCache[cacheKey]) {
      translated[key] = translationCache[cacheKey];
    }
    // 3. Запускаем фоновый перевод (без блокировки UI)
    else {
      translated[key] = value; 
      
      translateText(value, lang).then(result => {
        if (result && result !== value) {
          setTranslation(cacheKey, result);
        }
      });
    }
  });

  return translated;
};
