
import { GoogleGenAI } from "@google/genai";

export async function getAIInsights(data: any) {
  const apiKey = process.env.API_KEY;
  if (!apiKey) return "API Key not configured for insights.";

  const ai = new GoogleGenAI({ apiKey });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analiza estos datos de ventas de un restaurante y proporciona 2 insights cortos: ${JSON.stringify(data)}. Formato: Español, conciso.`,
      config: {
        systemInstruction: "Eres un consultor experto en optimización de restaurantes llamado 'Tayta AI'.",
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("AI Insights error:", error);
    return "No se pudieron generar insights en este momento.";
  }
}
