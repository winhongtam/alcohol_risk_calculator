import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  if (!process.env.API_KEY) {
    throw new Error("API Key not found");
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const getDrAnalysis = async (dailyGrams: number): Promise<string> => {
  try {
    const ai = getClient();
    
    // Using flash model for quick advice
    const model = 'gemini-2.5-flash';
    
    const prompt = `
      你是一位專業的肝膽腸胃科醫師。
      一位使用者目前的每日純酒精攝取量為 ${dailyGrams.toFixed(1)} 公克。
      
      請給出一段約 100-150 字的專業分析與建議。
      請包含以下重點：
      1. 這個攝取量相對於台灣衛福部建議標準（男性20g/女性10g）的狀況。
      2. 對於「肝癌」、「肝硬化」的具體潛在風險倍率（如果攝取量高，請引用概略的醫學統計數據，例如風險增加幾倍）。
      3. 給予同理心但嚴肅的健康建議。
      
      語氣：專業、警示、關懷。使用繁體中文。
      格式：純文字，不要使用 Markdown 標題。
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "目前無法取得醫師分析，請稍後再試。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "連線錯誤，無法取得即時分析。請檢查您的網路連線。";
  }
};
