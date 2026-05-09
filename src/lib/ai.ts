import { ChatMessage } from "./types";

/**
 * Generates an AI response using Groq via REST API
 * @param prompt The user's input message
 * @param history Previous chat messages for context
 * @returns A promise that resolves to the AI's response string
 */
export async function generateAiResponse(prompt: string, history: ChatMessage[] = []): Promise<string> {
  const isDev = import.meta.env.DEV;
  const apiKey = import.meta.env.VITE_GROQ_API_KEY?.trim();
  
  if (isDev && !apiKey) {
    console.error("[Groq AI] API Key is missing locally!");
    throw new Error("Groq API Key is missing. Please add VITE_GROQ_API_KEY to your .env file.");
  }

  console.log(`[Groq AI] Requesting response for prompt: "${prompt.substring(0, 50)}..."`);

  try {
    // In dev, use the Vite proxy. In prod, use the Vercel serverless function.
    const url = isDev ? "/api/groq/chat/completions" : "/api/chat";
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    
    if (isDev) {
      headers["Authorization"] = `Bearer ${apiKey}`;
    }

    // Convert history to OpenAI/Groq format
    const messages = history.map(msg => ({
      role: msg.role === "user" ? "user" : "assistant",
      content: msg.content,
    }));

    messages.push({
      role: "user",
      content: prompt,
    });

    const bodyPayload = isDev ? {
      model: "llama3-8b-8192",
      messages: messages,
      temperature: 0.7,
      max_tokens: 1024,
    } : { messages }; // The serverless function handles the rest in prod

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(bodyPayload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("[Groq AI] API Error:", errorData);
      throw new Error(errorData.error || errorData.error?.message || response.statusText || "Unknown API Error");
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content;

    if (!text) {
      console.error("[Groq AI] Empty response from API", data);
      throw new Error("Empty response from AI provider");
    }

    console.log("[Groq AI] Success, received response");
    return text;
  } catch (error: any) {
    console.error("[Groq AI] Request failed:", error);
    throw error;
  }
}
