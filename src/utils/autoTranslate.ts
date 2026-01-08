
/**
 * DNA Auto-Translate Engine (Neuro-link)
 */
export const translateText = async (text: string, targetLang: string): Promise<string> => {
  if (!text || !targetLang || targetLang === 'en') return text;
  
  try {
    // Public Google Translate API (gtx client)
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
    const response = await fetch(url);
    const data = await response.json();
    
    // Google Translate API returns segments in data[0]. We need to join them all to avoid truncation.
    if (data && data[0]) {
      return data[0].map((segment: any) => segment[0]).join('');
    }
    return text;
  } catch (err) {
    console.warn('Neuro-translation failed', err);
    return text;
  }
};
