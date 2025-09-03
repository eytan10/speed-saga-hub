import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { reviewsApi, Review, ReviewAggregates } from '@/data/reviewsApi';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { ReviewForm } from './ReviewForm';
import { ReviewItem } from './ReviewItem';
import { ReviewAggregateStats } from './ReviewAggregateStats';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ReviewsSectionProps {
  carKey: string;
}

export const ReviewsSection = ({ carKey }: ReviewsSectionProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [aggregates, setAggregates] = useState<ReviewAggregates | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [sortBy, setSortBy] = useState<'latest' | 'highest_rating' | 'lowest_rating'>('latest');
  const [userReview, setUserReview] = useState<Review | null>(null);
  
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const loadReviews = async () => {
    try {
      setLoading(true);
      setErrorMsg('');
      
      const [reviewsResult, aggregatesResult, userReviewResult] = await Promise.all([
        reviewsApi.listReviews(carKey, { sortBy, pageSize: 20 }),
        reviewsApi.getReviewAggregates(carKey),
        user ? reviewsApi.getUserReviewForCar(carKey) : Promise.resolve(null)
      ]);

      // Handle reviews result
      if (reviewsResult.error) {
        setErrorMsg(reviewsResult.error);
        setReviews([]);
      } else {
        setReviews(reviewsResult.reviews);
      }

      // Aggregates and user review should always work (they return defaults on error)
      setAggregates(aggregatesResult);
      setUserReview(userReviewResult);
      
    } catch (error) {
      console.error('Error loading reviews:', error);
      setErrorMsg('שגיאה בטעינת ביקורות');
      setReviews([]);
      setAggregates({ count: 0, avgRating: 0, distributionByStar: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, [carKey, sortBy, user]);

  const handleWriteReview = () => {
    if (!user) {
      toast({
        title: "נדרשת התחברות",
        description: "כדי לפרסם ביקורת צריך להתחבר",
        variant: "destructive"
      });
      navigate('/auth/sign-in');
      return;
    }

    if (userReview) {
      setEditingReview(userReview);
    } else {
      setShowForm(true);
    }
  };

  const handleReviewSubmitted = async () => {
    setShowForm(false);
    setEditingReview(null);
    await loadReviews();
    toast({
      title: editingReview ? "הביקורת עודכנה" : "הביקורת פורסמה",
      description: editingReview ? "השינויים נשמרו בהצלחה" : "תודה על הביקורת שלך!"
    });
  };

  const handleDeleteReview = async (reviewId: number) => {
    if (!confirm('האם אתה בטוח שברצונך למחוק את הביקורת?')) {
      return;
    }

    const result = await reviewsApi.deleteReview(reviewId);
    
    if (result.success) {
      await loadReviews();
      toast({
        title: "הביקורת נמחקה",
        description: "הביקורת הוסרה בהצלחה"
      });
    } else {
      toast({
        title: "שגיאה",
        description: result.error || "לא ניתן למחוק את הביקורת",
        variant: "destructive"
      });
    }
  };

  // Loading state - short skeleton that always resolves
  if (loading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="h-6 bg-muted rounded w-48 mb-4"></div>
          <div className="h-4 bg-muted rounded w-full mb-2"></div>
          <div className="h-4 bg-muted rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Error Banner */}
      {errorMsg && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
          <p className="text-sm text-destructive">שגיאה בטעינת ביקורות: {errorMsg}</p>
        </div>
      )}

      {/* Review Statistics */}
      {aggregates && aggregates.count > 0 && (
        <ReviewAggregateStats aggregates={aggregates} />
      )}

      {/* Header with Write Review Button */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          ביקורות ({aggregates?.count || 0})
        </h3>
        
        <Button onClick={handleWriteReview} className="gap-2">
          {userReview ? (
            <>
              <Edit className="h-4 w-4" />
              ערוך ביקורת
            </>
          ) : (
            <>
              <MessageSquare className="h-4 w-4" />
              כתוב ביקורת
            </>
          )}
        </Button>
      </div>

      {/* Review Form */}
      {(showForm || editingReview) && (
        <ReviewForm
          carKey={carKey}
          existingReview={editingReview}
          onSubmitted={handleReviewSubmitted}
          onCancel={() => {
            setShowForm(false);
            setEditingReview(null);
          }}
        />
      )}

      {/* Reviews List or Empty State */}
      {reviews.length > 0 ? (
        <>
          {/* Sort Controls */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">מיון לפי:</span>
            <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">לפי חדש</SelectItem>
                <SelectItem value="highest_rating">דירוג גבוה</SelectItem>
                <SelectItem value="lowest_rating">דירוג נמוך</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Reviews */}
          <div className="space-y-4">
            {reviews.map((review) => (
              <ReviewItem
                key={review.id}
                review={review}
                isOwner={user?.id === review.user_id}
                onEdit={() => setEditingReview(review)}
                onDelete={() => handleDeleteReview(review.id)}
              />
            ))}
          </div>
        </>
      ) : (
        <Card>
          <CardContent className="p-8 text-center">
            <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">אין עדיין ביקורות לרכב הזה</h3>
            <p className="text-muted-foreground mb-4">
              היה הראשון לחלוק את החוויה שלך עם הרכב הזה
            </p>
            <Button onClick={handleWriteReview}>
              כתוב את הביקורת הראשונה
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};