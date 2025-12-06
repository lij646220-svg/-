import { GoogleGenAI } from "@google/genai";
import { AiAnalysisResult } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateSongVibe = async (title: string, genre: string): Promise<AiAnalysisResult> => {
  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
      I have written a song titled "${title}" which is in the "${genre}" genre.
      Please provide a creative, poetic, and inviting description (liner notes) for this song in Chinese (Simpified).
      Also, provide a short prompt that could be used to generate an image for this song.
      
      Return the response in JSON format with the following structure:
      {
        "description": "The poetic description in Chinese...",
        "visualPrompt": "A short English description for an image..."
      }
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from Gemini");
    }

    const result = JSON.parse(text) as AiAnalysisResult;
    return result;

  } catch (error) {
    console.error("Error generating song vibe:", error);
    return {
      description: "暂时无法生成 AI 乐评，请稍后再试。",
      visualPrompt: "Abstract music visualization"
    };
  }
};
