/**
 * Utility helper to make requests to our secure server-side Gemini proxy endpoint.
 */
export async function generateAIContent(prompt: string, systemInstruction?: string): Promise<string> {
  try {
    const response = await fetch("/api/gemini/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt, systemInstruction }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error || `Server returned status ${response.status}`);
    }

    const data = await response.json();
    return data.text || "";
  } catch (error: any) {
    console.error("Error generating AI content:", error);
    throw error;
  }
}
