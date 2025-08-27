import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'שלום! אני עוזר הלקוחות הדיגיטלי שלכם. איך אני יכול לעזור לכם היום?',
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simple chatbot responses based on keywords
  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('מחיר') || input.includes('כמה עולה')) {
      return 'המחירים שלנו מתעדכנים בזמן אמת ותלויים במודל הרכב. אתם יכולים לראות את המחירים המדויקים בדף הרכב או לפנות לנציג מכירות בטלפון 03-555-0123.';
    }
    
    if (input.includes('השוואה') || input.includes('השווה')) {
      return 'אתם יכולים להשתמש בכלי השוואת הרכבים שלנו! פשוט לחצו על "השוואת רכבים מתקדמת" בתפריט העליון ובחרו עד 2 רכבים להשוואה מפורטת.';
    }
    
    if (input.includes('חשמלי') || input.includes('חשמליים')) {
      return 'יש לנו מגוון רחב של רכבים חשמליים מחברות מובילות כמו טסלה, BMW, מרצדס, אאודי ועוד. המערכת שלנו מאפשרת לסנן רכבים חשמליים בקטגוריות השונות.';
    }
    
    if (input.includes('בדיקת דרכים') || input.includes('נהיגת מבחן')) {
      return 'כדי לתאם נהיגת מבחן, אנא פנו למוקד הלקוחות שלנו בטלפון 03-555-0123 או השאירו פרטים באתר ונציג יחזור אליכם תוך 24 שעות.';
    }
    
    if (input.includes('מימון') || input.includes('לואינג') || input.includes('ליסינג')) {
      return 'אנחנו מציעים מגוון פתרונות מימון: ליסינג פרטי, ליסינג מסחרי, מימון בנקאי ותשלומים. לפרטים מלאים פנו לנציג המכירות שלנו.';
    }
    
    if (input.includes('אחריות') || input.includes('שירות')) {
      return 'כל הרכבים שלנו מגיעים עם אחריות יצרן מלאה. יש לנו רשת שירות רחבה בכל הארץ עם טכנאים מוסמכים ומלאי חלפים זמין.';
    }
    
    if (input.includes('תודה') || input.includes('שלום')) {
      return 'תודה שפניתם אלינו! אשמח לעזור בכל שאלה נוספת. צוות המכירות שלנו זמין בטלפון 03-555-0123.';
    }
    
    if (input.includes('ספורט') || input.includes('מהירות')) {
      return 'המבחר שלנו כולל מכוניות ספורט מפרארי, למבורגיני, פורשה, מקלארן ועוד. כל הרכבים מגיעים עם נתונים מפורטים על ביצועים ומהירות.';
    }
    
    if (input.includes('משפחתי') || input.includes('suv') || input.includes('גדול')) {
      return 'יש לנו מגוון רחב של רכבי SUV ורכבים משפחתיים מחברות מובילות. אתם יכולים לסנן לפי מספר מושבים, גודל מטען ותכונות בטיחות.';
    }
    
    // Default response
    return 'תודה על השאלה! אם אני לא הבנתי נכון, אנא פנו לנציג הלקוחות שלנו בטלפון 03-555-0123 או כתבו לנו מייל ונחזור אליכם בהקדם.';
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(userMessage.text),
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 left-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-racing-red hover:bg-racing-red/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 left-6 w-80 h-96 z-50 animate-scale-in">
          <Card className="h-full flex flex-col shadow-2xl border-0 bg-gradient-to-br from-background to-secondary/20">
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-racing-red text-white rounded-t-lg">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                <span className="font-semibold">עוזר לקוחות</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Messages Area */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.isBot
                          ? 'bg-secondary text-secondary-foreground'
                          : 'bg-racing-red text-white'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {message.isBot && <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                        <p className="text-sm leading-relaxed">{message.text}</p>
                        {!message.isBot && <User className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-secondary p-3 rounded-lg max-w-[80%]">
                      <div className="flex items-center gap-2">
                        <Bot className="h-4 w-4" />
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="הקלידו את השאלה שלכם..."
                  className="flex-1 text-right"
                  disabled={isTyping}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-racing-red hover:bg-racing-red/90 text-white"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default Chatbot;