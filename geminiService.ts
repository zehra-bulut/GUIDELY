
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getCareerAdvice(answers: string[]) {
  const prompt = `Based on these personality quiz responses: "${answers.join(', ')}", provide a personalized career analysis. 
  Include: 
  1. Top 3 recommended careers.
  2. Core personality strengths.
  3. Potential sectors for success.
  Keep it in Turkish as the platform is in Turkish.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Analiz sırasında bir hata oluştu. Lütfen tekrar deneyin.";
  }
}

export async function getSectorCompatibility(sectorName: string, personalityResult: string) {
  const prompt = `
    Kullanıcının kişilik analiz sonucu: "${personalityResult}"
    İncelenen Sektör: "${sectorName}"
    
    Lütfen bu sektörün kullanıcının kişilik özellikleriyle ne kadar uyumlu olduğunu analiz et.
    Cevabının İLK SATIRI mutlaka şu formatta olsun: "UYUM_ORANI: %[Sayı]" (Örn: UYUM_ORANI: %85)
    
    Ardından şu detayları ekle:
    1. Güçlü Yönlerin Uyumu: Kullanıcının hangi özellikleri bu sektörde avantaj sağlar?
    2. Potansiyel Zorluklar: Hangi alanlarda gelişim gerekebilir?
    3. Tavsiye: Sektöre giriş için ilk adım ne olmalı?
    
    Dili profesyonel, analitik ve cesaretlendirici tut. Türkçe cevap ver.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: { thinkingConfig: { thinkingBudget: 0 } }
    });
    return response.text;
  } catch (error) {
    console.error("Compatibility Analysis Error:", error);
    return "Sektör uyumluluk analizi şu an yapılamıyor.";
  }
}
