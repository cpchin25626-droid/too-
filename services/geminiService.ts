import { GoogleGenAI } from "@google/genai";

// Initialize Gemini Client
// NOTE: The API key is strictly obtained from process.env.API_KEY as per guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getFinancialAdvice = async (
  monthlyAmount: number,
  totalAtEnd: number,
  years: number = 30 // Default to 30 for backward compatibility if needed
): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    
    const prompt = `
      User is using a compound interest calculator.
      They plan to invest ${monthlyAmount} monthly.
      At a 6% annual return (average market performance), after ${years} years, they will have accumulated ${totalAtEnd}.
      
      Please provide a short, encouraging, and financially wise paragraph (max 150 words) in Traditional Chinese.
      Focus on the power of time and consistency (Dollar Cost Averaging).
      Do not give specific stock advice.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "無法取得 AI 建議，請稍後再試。";
  } catch (error) {
    console.error("Error fetching Gemini advice:", error);
    return "目前無法連接至 AI 顧問，請檢查網路或 API 金鑰設定。";
  }
};
