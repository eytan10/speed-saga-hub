import { useState } from 'react';
import { reviewsApi, Review, CreateReviewData } from '@/data/reviewsApi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ReviewFormProps {
  carKey: string;
  existingReview?: Review | null;
  onSubmitted: () => void;
  onCancel: () => void;
}

export const ReviewForm = ({ carKey, existingReview, onSubmitted, onCancel }: ReviewFormProps) => {
  const [formData, setFormData] = useState({
    rating: existingReview?.rating || 0,
    title: existingReview?.title || '',
    body: existingReview?.body || ''
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.rating === 0) {
      toast({
        title: "נדרש דירוג",
        description: "נא לבחור דירוג כוכבים",
        variant: "destructive"
      });
      return;
    }

    if (formData.body.length < 20) {
      toast({
        title: "ביקורת קצרה מדי",
        description: "נא לכתוב ביקורת באורך מינימלי של 20 תווים",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      if (existingReview) {
        await reviewsApi.updateReview(existingReview.id, {
          rating: formData.rating,
          title: formData.title || undefined,
          body: formData.body
        });
      } else {
        await reviewsApi.createReview({
          carKey,
          rating: formData.rating,
          title: formData.title || undefined,
          body: formData.body
        });
      }

      onSubmitted();
    } catch (error) {
      toast({
        title: "שגיאה",
        description: "לא ניתן לשמור את הביקורת",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const renderStarRating = () => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
          className={`transition-colors hover:text-yellow-500 ${
            star <= formData.rating ? 'text-yellow-500' : 'text-muted-foreground'
          }`}
        >
          <Star className="h-6 w-6 fill-current" />
        </button>
      ))}
      <span className="mr-2 text-sm text-muted-foreground">
        ({formData.rating}/5)
      </span>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {existingReview ? 'עריכת ביקורת' : 'כתיבת ביקורת חדשה'}
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="rating">דירוג *</Label>
            {renderStarRating()}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="title">כותרת (אופציונלי)</Label>
            <Input
              id="title"
              placeholder="כותרת קצרה לביקורת"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              maxLength={80}
            />
            <div className="text-xs text-muted-foreground text-left">
              {formData.title.length}/80
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="body">תוכן הביקורת *</Label>
            <Textarea
              id="body"
              placeholder="שתף את החוויה שלך עם הרכב (לפחות 20 תווים)"
              value={formData.body}
              onChange={(e) => setFormData(prev => ({ ...prev, body: e.target.value }))}
              rows={4}
              className="resize-none"
            />
            <div className="text-xs text-muted-foreground text-left">
              {formData.body.length}/1000
            </div>
          </div>
          
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={onCancel}>
              ביטול
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'שומר...' : (existingReview ? 'עדכן ביקורת' : 'פרסם ביקורת')}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};