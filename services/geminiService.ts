
import { GoogleGenAI } from "@google/genai";

// Creating instance right before use to ensure freshness
export async function askUstadAI(query: string, language: string) {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are an expert Kushti Ustad (coach) from Maharashtra. 
                 Answer the following user query about wrestling training, diet, or culture. 
                 Answer strictly in ${language}.
                 Keep your answer short, encouraging, and authoritative (max 100 words).
                 Query: ${query}`,
    });
    
    if (!response.text) {
      throw new Error("Empty response");
    }
    
    return response.text;
  } catch (error: any) {
    console.error("Gemini Error:", error);
    
    // Handling Rate Limit (Error 429) specifically
    if (error?.status === 429 || error?.message?.includes('429')) {
      return "क्षमा करा, सध्या खूप पैलवान मार्गदर्शन घेत आहेत. उस्ताद थोड्या वेळाने उपलब्ध होतील. (API Limit Reached)";
    }
    
    return "क्षमस्व, उस्ताद सध्या ध्यानधारणेत आहेत. कृपया थोड्या वेळाने विचारा.";
  }
}
