export interface ChatContent {
  role: "user" | "model";
  parts: { text: string }[];
}

export async function generateChatResponse(
  contents: ChatContent[]
): Promise<string> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing VITE_GEMINI_API_KEY");
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ contents })
    }
  );

  if (!response.ok) {
    throw new Error(`Chat API request failed: ${response.status}`);
  }

  const data = (await response.json()) as {
    candidates?: { content?: { parts?: { text?: string }[] } }[];
  };

  return (
    data.candidates?.[0]?.content?.parts
      ?.map((p) => p.text)
      .join("")
      .trim() ?? ""
  );
}
