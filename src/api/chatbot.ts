export async function generateChatResponse(prompt: string): Promise<string> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const response = await fetch(
 codex/fix-advanced-search-functionality-9hfhgg
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }]
      })

    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
 main
    }
  );

  if (!response.ok) {
    throw new Error(`Chat API request failed: ${response.status}`);
  }

  const data = (await response.json()) as {
    candidates?: { content?: { parts?: { text?: string }[] } }[];
  };
 codex/fix-advanced-search-functionality-9hfhgg
  return (
    data.candidates?.[0]?.content?.parts
      ?.map((p) => p.text)
      .join("")
      .trim() ?? ""
  );

  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
 main
}
