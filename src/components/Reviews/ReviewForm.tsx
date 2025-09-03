import { useState } from 'react';
import { Review, reviewsApi, CreateReviewData, UpdateReviewData } from '@/data/reviewsApi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ReviewFormProps {
  carKey: string;
  existingReview?: Review | null;
  onSubmitted: () => void;
  onCancel: () => void;
}

export const ReviewForm = ({ carKey, existingReview, onSubmitted, onCancel }: ReviewFormProps) => {
  const [rating, setRating] = useState(existingReview?.rating || 0);
  const [title, setTitle] = useState(existingReview?.title || '');
  const [body, setBody] = useState(existingReview?.body || '');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (rating === 0) {
      toast({
        title: "שגיאה",
        description: "חובה לבחור דירוג",
        variant: "destructive"
      });
      return;
    }

    if (body.length < 20) {
      toast({
        title: "שגיאה",
        description: "הביקורת חייבת להכיל לפחות 20 תווים",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      let result;
      
      if (existingReview) {
        // Update existing review
        const updateData: UpdateReviewData = {
          rating,
          title: title.trim() || undefined,
          body: body.trim()
        };
        result = await reviewsApi.updateReview(existingReview.id, updateData);
      } else {
        // Create new review
        const createData: CreateReviewData = {
          carKey,
          rating,
          title: title.trim() || undefined,
          body: body.trim()
        };
        result = await reviewsApi.createReview(createData);
      }

      if (result.success) {
        onSubmitted();
      } else {
        toast({
          title: "שגיאה",
          description: result.error || "אירעה שגיאה בשמירת הביקורת",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Review form error:', error);
      toast({
        title: "שגיאה",
        description: "אירעה שגיאה לא צפויה",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const renderStarRating = () => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className="text-2xl hover:scale-110 transition-transform"
          >
            <Star
              className={`h-6 w-6 ${
                star <= rating
                  ? 'fill-yellow-500 text-yellow-500'
                  : 'text-muted-foreground hover:text-yellow-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {existingReview ? 'עריכת ביקורת' : 'כתיבת ביקורת חדשה'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Rating */}
          <div>
            <label className="text-sm font-medium mb-2 block">דירוג *</label>
            {renderStarRating()}
            {rating === 0 && (
              <p className="text-sm text-muted-foreground mt-1">בחר דירוג מ-1 עד 5 כוכבים</p>
            )}
          </div>

          {/* Title */}
          <div>
            <label htmlFor="title" className="text-sm font-medium mb-2 block">כותרת (אופציונלי)</label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="כותרת לביקורת שלך..."
              maxLength={80}
            />
          </div>

          {/* Body */}
          <div>
            <label htmlFor="body" className="text-sm font-medium mb-2 block">תוכן הביקורת *</label>
            <Textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="שתף את החוויה שלך עם הרכב..."
              rows={4}
              className="resize-none"
            />
            <div className="flex justify-between mt-1">
              <p className="text-sm text-muted-foreground">
                מינימום 20 תווים
              </p>
              <p className="text-sm text-muted-foreground">
                {body.length}/500
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button type="submit" disabled={loading}>
              {loading ? 'שומר...' : (existingReview ? 'עדכן ביקורת' : 'פרסם ביקורת')}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
              ביטול
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};