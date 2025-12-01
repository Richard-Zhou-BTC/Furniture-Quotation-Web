import { GoogleGenAI } from "@google/genai";
import { CartItem } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateOrderAnalysis = async (items: CartItem[]): Promise<string> => {
  if (!apiKey) {
    return "API Key 未配置。请检查环境变量以启用 AI 功能。";
  }

  if (items.length === 0) {
    return "您的选择为空。请添加一些家具以便我们为您提供定制分析。";
  }

  const itemsList = items.map(item => `- ${item.name} [${item.style} - ${item.type}] x${item.quantity}`).join('\n');
  
  const prompt = `
    你是一位专业的室内设计顾问。
    一位客户为他们的空间选择了以下家具清单：
    
    ${itemsList}
    
    请用中文（Chinese）提供 Markdown 格式的回复，包含以下内容：
    1. 礼貌且专业的选择摘要。
    2. 基于所选单品的风格分析（例如：这些单品是否风格统一？混搭是否合理？主要体现了什么氛围？）。
    3. 一到两条具体的摆放或软装搭配建议（Lighting, Color scheme, etc.）。
    4. 结束语。
    
    保持语气高端、乐于助人且简洁（200字以内）。不要提及具体价格。
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text || "暂时无法生成分析。";
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "我们暂时无法联系到 AI 设计顾问。请手动处理您的清单。";
  }
};