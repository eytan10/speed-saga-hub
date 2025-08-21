import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "@/contexts/FavoritesContext";
import { 
  Heart, 
  Share2, 
  Download, 
  Eye, 
  ThumbsUp, 
  Bookmark, 
  Mail,
  Phone,
  Calendar,
  MapPin,
  Star,
  Filter,
  RefreshCw,
  ChevronUp,
  ChevronDown,
  Plus,
  Minus,
  ShoppingCart,
  CreditCard
} from "lucide-react";

// Working Contact Button
export const ContactButton = ({ 
  type = "phone", 
  contactInfo, 
  label 
}: { 
  type?: "phone" | "email" | "schedule";
  contactInfo?: string;
  label?: string;
}) => {
  const { toast } = useToast();
  
  const handleContact = () => {
    switch (type) {
      case "phone":
        if (contactInfo) {
          window.open(`tel:${contactInfo}`, '_self');
        } else {
          toast({
            title: "התקשרות",
            description: "נפתח יישום החיוג שלך",
          });
        }
        break;
      case "email":
        if (contactInfo) {
          window.open(`mailto:${contactInfo}`, '_self');
        } else {
          toast({
            title: "פנייה במייל",
            description: "נפתח יישום המייל שלך",
          });
        }
        break;
      case "schedule":
        toast({
          title: "קביעת פגישה",
          description: "יועץ המכירות יחזור אליך בהקדם",
        });
        break;
    }
  };

  const getIcon = () => {
    switch (type) {
      case "phone": return <Phone className="h-4 w-4" />;
      case "email": return <Mail className="h-4 w-4" />;
      case "schedule": return <Calendar className="h-4 w-4" />;
    }
  };

  return (
    <Button onClick={handleContact} className="btn-racing">
      {getIcon()}
      <span className="mr-2">{label || "צור קשר"}</span>
    </Button>
  );
};

// Working Share Button
export const ShareButton = ({ 
  url, 
  title, 
  text 
}: { 
  url?: string; 
  title?: string; 
  text?: string; 
}) => {
  const { toast } = useToast();
  
  const handleShare = async () => {
    const shareData = {
      title: title || document.title,
      text: text || "בדוק את הרכב המדהים הזה!",
      url: url || window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        toast({
          title: "שותף בהצלחה!",
          description: "הקישור נשלח",
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback to copying to clipboard
      await navigator.clipboard.writeText(shareData.url);
      toast({
        title: "הקישור הועתק!",
        description: "הקישור הועתק ללוח",
      });
    }
  };

  return (
    <Button variant="outline" onClick={handleShare}>
      <Share2 className="h-4 w-4 mr-2" />
      שתף
    </Button>
  );
};

// Working Download Button
export const DownloadButton = ({ 
  downloadUrl, 
  filename, 
  type = "brochure" 
}: { 
  downloadUrl?: string; 
  filename?: string; 
  type?: "brochure" | "specs" | "image";
}) => {
  const { toast } = useToast();
  
  const handleDownload = () => {
    if (downloadUrl) {
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename || `${type}-${Date.now()}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    
    toast({
      title: "הורדה החלה",
      description: `מוריד ${type === "brochure" ? "קטלוג" : type === "specs" ? "מפרט טכני" : "תמונה"}`,
    });
  };

  return (
    <Button variant="outline" onClick={handleDownload}>
      <Download className="h-4 w-4 mr-2" />
      {type === "brochure" ? "הורד קטלוג" : type === "specs" ? "מפרט טכני" : "הורד תמונה"}
    </Button>
  );
};

// Working View Counter
export const ViewCounter = ({ 
  initialViews = 0, 
  itemId 
}: { 
  initialViews?: number; 
  itemId: string; 
}) => {
  const [views, setViews] = useState(initialViews);
  const [hasViewed, setHasViewed] = useState(false);

  const incrementViews = () => {
    if (!hasViewed) {
      setViews(prev => prev + 1);
      setHasViewed(true);
      // Store in localStorage to prevent duplicate counting
      localStorage.setItem(`viewed-${itemId}`, 'true');
    }
  };

  // Auto-increment on mount if not viewed before
  useState(() => {
    const wasViewed = localStorage.getItem(`viewed-${itemId}`);
    if (!wasViewed) {
      setTimeout(incrementViews, 1000);
    } else {
      setHasViewed(true);
    }
  });

  return (
    <div className="flex items-center gap-1 text-sm text-muted-foreground">
      <Eye className="h-4 w-4" />
      <span>{views.toLocaleString()} צפיות</span>
    </div>
  );
};

// Working Like Button
export const LikeButton = ({ 
  itemId, 
  initialLikes = 0 
}: { 
  itemId: string; 
  initialLikes?: number; 
}) => {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const { toast } = useToast();

  useState(() => {
    const liked = localStorage.getItem(`liked-${itemId}`);
    setIsLiked(liked === 'true');
  });

  const handleLike = () => {
    if (isLiked) {
      setLikes(prev => prev - 1);
      setIsLiked(false);
      localStorage.removeItem(`liked-${itemId}`);
      toast({
        title: "בוטל לייק",
        description: "הלייק בוטל",
      });
    } else {
      setLikes(prev => prev + 1);
      setIsLiked(true);
      localStorage.setItem(`liked-${itemId}`, 'true');
      toast({
        title: "לייק נוסף!",
        description: "תודה על הלייק",
      });
    }
  };

  return (
    <Button 
      variant={isLiked ? "default" : "outline"} 
      onClick={handleLike}
      className={isLiked ? "bg-racing-red hover:bg-racing-red/90" : ""}
    >
      <ThumbsUp className={`h-4 w-4 mr-2 ${isLiked ? "fill-current" : ""}`} />
      {likes} לייקים
    </Button>
  );
};

// Working Rating Component
export const RatingComponent = ({ 
  itemId, 
  initialRating = 0,
  onRatingChange 
}: { 
  itemId: string; 
  initialRating?: number;
  onRatingChange?: (rating: number) => void;
}) => {
  const [rating, setRating] = useState(initialRating);
  const [userRating, setUserRating] = useState(0);
  const [hasRated, setHasRated] = useState(false);
  const { toast } = useToast();

  useState(() => {
    const existingRating = localStorage.getItem(`rating-${itemId}`);
    if (existingRating) {
      setUserRating(parseInt(existingRating));
      setHasRated(true);
    }
  });

  const handleRating = (newRating: number) => {
    if (!hasRated) {
      setUserRating(newRating);
      setRating(prev => ((prev * 10 + newRating) / 11)); // Simple average simulation
      setHasRated(true);
      localStorage.setItem(`rating-${itemId}`, newRating.toString());
      
      toast({
        title: "דירוג נשמר!",
        description: `דירגת ${newRating} כוכבים`,
      });
      
      onRatingChange?.(newRating);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleRating(star)}
            disabled={hasRated}
            className={`p-1 ${hasRated ? 'cursor-not-allowed' : 'hover:scale-110'} transition-transform`}
          >
            <Star
              className={`h-5 w-5 ${
                star <= (userRating || rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          </button>
        ))}
        <span className="text-sm text-muted-foreground mr-2">
          ({rating.toFixed(1)})
        </span>
      </div>
      {hasRated && (
        <p className="text-xs text-muted-foreground">
          דירגת {userRating} כוכבים
        </p>
      )}
    </div>
  );
};

// Working Bookmark Button
export const BookmarkButton = ({ 
  itemId, 
  itemData 
}: { 
  itemId: string; 
  itemData: any; 
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { toast } = useToast();

  useState(() => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    setIsBookmarked(bookmarks.some((item: any) => item.id === itemId));
  });

  const handleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    
    if (isBookmarked) {
      const updated = bookmarks.filter((item: any) => item.id !== itemId);
      localStorage.setItem('bookmarks', JSON.stringify(updated));
      setIsBookmarked(false);
      toast({
        title: "הוסר מהסימניות",
        description: "הפריט הוסר מהסימניות",
      });
    } else {
      bookmarks.push({ id: itemId, ...itemData, bookmarkedAt: Date.now() });
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
      setIsBookmarked(true);
      toast({
        title: "נוסף לסימניות",
        description: "הפריט נוסף לסימניות",
      });
    }
  };

  return (
    <Button 
      variant="outline" 
      onClick={handleBookmark}
      className={isBookmarked ? "bg-racing-red/10 border-racing-red" : ""}
    >
      <Bookmark className={`h-4 w-4 mr-2 ${isBookmarked ? "fill-current text-racing-red" : ""}`} />
      {isBookmarked ? "נשמר" : "שמור"}
    </Button>
  );
};

// Working Refresh Button
export const RefreshButton = ({ 
  onRefresh, 
  isLoading = false 
}: { 
  onRefresh: () => void;
  isLoading?: boolean;
}) => {
  return (
    <Button 
      variant="outline" 
      onClick={onRefresh}
      disabled={isLoading}
    >
      <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
      {isLoading ? "טוען..." : "רענן"}
    </Button>
  );
};

// Working Quantity Selector
export const QuantitySelector = ({ 
  value = 1, 
  onChange, 
  min = 1, 
  max = 99 
}: { 
  value?: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}) => {
  const increment = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const decrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  return (
    <div className="flex items-center border border-border rounded-lg">
      <Button
        variant="ghost"
        size="sm"
        onClick={decrement}
        disabled={value <= min}
        className="h-8 w-8 p-0"
      >
        <Minus className="h-4 w-4" />
      </Button>
      <span className="px-3 py-1 text-center min-w-[40px]">{value}</span>
      <Button
        variant="ghost"
        size="sm"
        onClick={increment}
        disabled={value >= max}
        className="h-8 w-8 p-0"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default {
  ContactButton,
  ShareButton,
  DownloadButton,
  ViewCounter,
  LikeButton,
  RatingComponent,
  BookmarkButton,
  RefreshButton,
  QuantitySelector
};