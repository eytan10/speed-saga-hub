export async function generateChatResponse(prompt: string): Promise<string> {
  try {
    const response = await fetch('https://wapbeuabngeeevjabadu.supabase.co/functions/v1/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndhcGJldWFibmdlZWV2amFiYWR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxMDU4NjAsImV4cCI6MjA3MTY4MTg2MH0.Y7buQ7pZ5FKz_PRxNPBHffit-avPbCc8fZm78uSfIlg`,
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
