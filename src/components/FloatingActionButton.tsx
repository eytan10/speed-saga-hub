import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { 
  Plus, 
  MessageCircle, 
  Phone, 
  ArrowUp, 
  Share2,
  Search,
  Filter,
  X,
  ChevronUp
} from "lucide-react";

interface FloatingActionButtonProps {
  actions?: {
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
    color?: string;
  }[];
}

const FloatingActionButton = ({ actions }: FloatingActionButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { toast } = useToast();

  // Check scroll position
  useState(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const defaultActions = [
    {
      icon: <Phone className="h-5 w-5" />,
      label: "התקשר אלינו",
      onClick: () => {
        window.open('tel:+972-3-555-0123', '_self');
        toast({
          title: "התקשרות",
          description: "מתקשר לצוות השירות שלנו",
        });
      },
      color: "bg-green-500 hover:bg-green-600"
    },
    {
      icon: <MessageCircle className="h-5 w-5" />,
      label: "צ'אט",
      onClick: () => {
        toast({
          title: "צ'אט",
          description: "צ'אט החי יפתח בקרוב",
        });
      },
      color: "bg-blue-500 hover:bg-blue-600"
    },
    {
      icon: <Share2 className="h-5 w-5" />,
      label: "שתף",
      onClick: async () => {
        if (navigator.share) {
          try {
            await navigator.share({
              title: document.title,
              text: 'בדוק את האתר המדהים הזה!',
              url: window.location.href,
            });
          } catch (err) {
            console.log('Error sharing:', err);
          }
        } else {
          await navigator.clipboard.writeText(window.location.href);
          toast({
            title: "הקישור הועתק!",
            description: "הקישור הועתק ללוח",
          });
        }
      },
      color: "bg-purple-500 hover:bg-purple-600"
    }
  ];

  const finalActions = actions || defaultActions;

  return (
    <>
      {/* Scroll to top button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-40 bg-racing-red hover:bg-racing-red/90 text-white shadow-2xl w-12 h-12 rounded-full animate-fade-in"
          size="icon"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      )}

      {/* Main FAB */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Action buttons */}
        {isOpen && (
          <div className="absolute bottom-16 right-0 space-y-3 animate-fade-in">
            {finalActions.map((action, index) => (
              <div key={index} className="flex items-center gap-3">
                <Card className="px-3 py-2 bg-background/95 backdrop-blur-sm shadow-lg animate-slide-in-right" style={{ animationDelay: `${index * 100}ms` }}>
                  <span className="text-sm font-medium whitespace-nowrap">
                    {action.label}
                  </span>
                </Card>
                <Button
                  onClick={() => {
                    action.onClick();
                    setIsOpen(false);
                  }}
                  className={`w-12 h-12 rounded-full shadow-2xl text-white transition-all transform hover:scale-110 animate-scale-in ${
                    action.color || "bg-racing-red hover:bg-racing-red/90"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                  size="icon"
                >
                  {action.icon}
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Main button */}
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full bg-racing-red hover:bg-racing-red/90 text-white shadow-2xl transition-all transform ${
            isOpen ? 'rotate-45 scale-110' : 'hover:scale-110'
          }`}
          size="icon"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
        </Button>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 animate-fade-in"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default FloatingActionButton;