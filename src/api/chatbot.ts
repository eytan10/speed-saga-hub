export async function generateChatResponse(prompt: string): Promise<string> {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error(`Chat API request failed: ${response.status}`);
    }

    const data = await response.json();
    return data.response || 'מצטער, לא הצלחתי לקבל תשובה כרגע.';
  } catch (error) {
    console.error('Error in chat API:', error);
    return 'שגיאה: לא ניתן להתחבר כעת.';
  }
}
