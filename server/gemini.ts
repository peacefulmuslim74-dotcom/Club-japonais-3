import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY || '';

export const ai = new GoogleGenAI({
  apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

export async function generateEcomContent(task: string, prompt: string, context?: any) {
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured on the server.');
  }

  let systemInstruction = `You are an elite e-commerce growth strategist, senior copywriter, and product merchandiser.
Provide crisp, compelling, high-converting copy without fluff.
Return structured JSON or clearly formatted output based on the user's request.`;

  if (task === 'product_description') {
    systemInstruction += ` Focus on sensory benefits, emotional appeal, key specs, and why the customer must buy now. Format with:
    {
      "headline": "Punchy hook",
      "story": "2-3 sentences of emotional positioning",
      "bulletPoints": ["Key benefit 1", "Key benefit 2", "Key benefit 3", "Key benefit 4"],
      "materialsAndCare": "Material specifications and durability notes",
      "seoSlug": "suggested-url-slug"
    }`;
  } else if (task === 'ad_copy') {
    systemInstruction += ` Generate multi-channel advertising hooks:
    {
      "metaAd": { "primaryText": "...", "headline": "...", "callToAction": "..." },
      "googleSearch": { "headline1": "...", "headline2": "...", "description": "..." },
      "instagramCaption": "Engaging caption with hashtags",
      "tiktokHook": "First 3 seconds visual/verbal hook for UGC creator"
    }`;
  } else if (task === 'seo_optimize') {
    systemInstruction += ` Generate rich SEO tags:
    {
      "metaTitle": "SEO title under 60 chars",
      "metaDescription": "Click-worthy meta description under 155 chars",
      "targetKeywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
      "schemaSnippetType": "Product"
    }`;
  } else if (task === 'pricing_strategy') {
    systemInstruction += ` Analyze pricing and recommend strategies:
    {
      "suggestedPrice": 0,
      "anchoredRetailPrice": 0,
      "grossMarginAnalysis": "...",
      "bundleIdea": "...",
      "upsellRecommendation": "..."
    }`;
  }

  const response = await ai.models.generateContent({
    model: 'gemini-3.8-flash',
    contents: `Task: ${task}
Context: ${JSON.stringify(context || {})}
Prompt: ${prompt}`,
    config: {
      systemInstruction,
      responseMimeType: 'application/json',
      temperature: 0.7,
    },
  });

  return response.text;
}
