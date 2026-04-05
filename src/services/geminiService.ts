import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { LiveBenchmarks } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

const parseRawNumeric = (val: string, multiplier: number = 1): number => {
  if (!val) return 0;
  const clean = String(val).replace(/[^0-9.]/g, '');
  return (parseFloat(clean) || 0) * multiplier;
};

export async function fetchLiveNetflixBenchmarks(): Promise<LiveBenchmarks | null> {
  try {
    const prompt = `
      Search for the most recent official Netflix earnings report (Q3 2024 or Q4 2024) and current trending content. 
      Extract exactly these values:
      1. Total Quarterly Revenue (e.g., $9.8B)
      2. Total Global Paid Members (e.g., 282.7M)
      3. Average Revenue per Member (ARM) (e.g., $11.60)
      4. Average Monthly Churn rate.
      5. Top 20 Trending Shows on Netflix globally for the current month (April 2026).
      6. Top 20 Trending Movies on Netflix globally for the current month (April 2026).
      7. Top 20 Trending Anime on Netflix globally for the current month (April 2026).
      
      For each show/movie/anime, provide:
      - title, description, genres (array of strings, e.g., ["Sci-Fi", "Drama"]), overall rating (0-10).
      - For shows/anime: episode-wise ratings for the latest season (at least 5 episodes).
      - Popularity by region (at least 3 regions with popularity score 0-100).
      - Trend data (last 7 days of popularity scores).
      
      Return the result ONLY as a JSON object with these keys: 
      "revenue", "subscribers", "arm", "churn", 
      "trendingShows" (array of DetailedContent),
      "trendingMovies" (array of DetailedContent),
      "trendingAnime" (array of DetailedContent).
      
      DetailedContent structure: { "id", "title", "description", "genres": [], "type", "rating", "episodes": [{ "episode", "rating", "title" }], "popularityByRegion": [{ "region", "popularity" }], "trendData": [{ "date", "value" }] }
      
      Do not include markdown or extra text.
    `;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.1,
        tools: [{ googleSearch: {} }]
      }
    });

    const text = response.text || "";
    const cleanJson = text.replace(/```json|```/gi, "").trim();
    const data = JSON.parse(cleanJson);
    
    return {
      ...data,
      lastUpdated: new Date().toLocaleTimeString(),
      rawRevenue: parseRawNumeric(data.revenue, 1000000000),
      rawSubscribers: parseRawNumeric(data.subscribers, 1000000),
      rawArm: parseRawNumeric(data.arm, 1),
      rawChurn: parseRawNumeric(data.churn, 1),
      trendingShows: data.trendingShows || [],
      trendingMovies: data.trendingMovies || [],
      trendingAnime: data.trendingAnime || []
    };
  } catch (error) {
    console.error("Failed to fetch live benchmarks:", error);
    return null;
  }
}
