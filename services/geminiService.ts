import { GoogleGenAI } from "@google/genai";
import { CartItem } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateOrderAnalysis = async (items: CartItem[]): Promise<string> => {
  if (!apiKey) {
    return "API Key 未配置。请检查环境变量以启用 AI 功能。";
  }

  if (items.length === 0) {
    return "您的选择为空。请添加一些家具以便我们为您生成定制信函。";
  }

  const itemsList = items.map(item => `- ${item.name} [${item.style} - ${item.type}] x${item.quantity}`).join('\n');
  
  const prompt = `
    你代表高端家具品牌 "宁海县雅格莱顿家具有限公司"（英文名：Ninghai Accolade Furniture Ltd.）。
    一位尊贵的客户选择了以下家具清单：
    
    ${itemsList}
    
    请用中文（Chinese）写一封诚挚、优雅且专业的感谢信（Markdown格式）。
    
    内容要求：
    1. 感谢客户选择雅格家居（Accolade Furniture）。
    2. 敏锐地捕捉客户所选家具的风格（例如${items[0]?.style}等），赞美客户非凡的审美与品位。
    3. 简要表达我们对工艺细节的极致追求，承诺为客户打造理想的居住空间。
    4. 期待与客户的进一步合作。
    
    语气风格：
    - 意式轻奢、知性、温暖（莫兰迪色系的氛围感）。
    - 避免过于商业化的推销口吻，保持高雅的格调。
    - 字数控制在200-300字之间。
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text || "暂时无法生成信函。";
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "我们暂时无法联系到 AI 助理。";
  }
};