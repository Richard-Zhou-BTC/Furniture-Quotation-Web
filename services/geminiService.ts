import { GoogleGenAI } from "@google/genai";
import { CartItem, Language } from "../types";

export const generateOrderAnalysis = async (items: CartItem[], lang: Language = Language.ZH): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const languageNames: Record<string, string> = {
    zh: "Chinese",
    en: "English",
    fr: "French",
    es: "Spanish",
    ja: "Japanese"
  };

  const targetLang = languageNames[lang] || "Chinese";
  
  const prompt = `
    You are a professional customer service manager for "Ninghai Accolade Furniture Ltd." (宁海县雅格莱顿家具有限公司).
    A high-end customer has selected some luxury furniture items. 
    Please write a sophisticated, warm, and professional thank-you letter in ${targetLang}.
    
    The letter should:
    1. Thank them for choosing Accolade Furniture.
    2. Praise their taste for selecting high-quality pieces.
    3. Mention that Accolade focuses on "Extreme Craftsmanship" and "Ideal Living Spaces".
    4. End with a professional closing.
    
    Keep the tone elegant and upscale. Respond ONLY with the text of the letter in ${targetLang}. Use Markdown for formatting.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        temperature: 0.7,
        topP: 0.95,
      }
    });

    return response.text || "Letter generation failed.";
  } catch (error) {
    console.error("AI Generation Error:", error);
    // Fallback if AI fails
    return lang === Language.ZH 
      ? "非常感谢您选择雅格莱顿家具。我们致力于为您打造极致的居住空间。" 
      : "Thank you for choosing Accolade Furniture. We are committed to creating the ultimate living space for you.";
  }
};