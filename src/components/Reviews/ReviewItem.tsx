import { Review } from '@/data/reviewsApi';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, Edit, Trash2 } from 'lucide-react';

interface ReviewItemProps {
  review: Review;
  isOwner: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

export const ReviewItem = ({ review, isOwner, onEdit, onDelete }: ReviewItemProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('he-IL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const displayName = review.profiles?.display_name || review.user_id.slice(0, 8);

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={review.profiles?.avatar_url} />
              <AvatarFallback>
                {displayName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div>
              <div className="font-medium">{displayName}</div>
              <div className="text-sm text-muted-foreground">
                {formatDate(review.created_at)}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${
                    star <= review.rating
                      ? 'fill-yellow-500 text-yellow-500'
                      : 'text-muted-foreground'
                  }`}
                />
              ))}
            </div>
            
            {isOwner && (
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onEdit}
                  className="h-8 w-8 p-0"
                >
                  <Edit className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onDelete}
                  className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            )}
          </div>
        </div>
        
        {review.title && (
          <h4 className="font-medium mb-2">{review.title}</h4>
        )}
        
        <p className="text-muted-foreground leading-relaxed">
          {review.body}
        </p>
        
        {review.updated_at !== review.created_at && (
          <div className="text-xs text-muted-foreground mt-2 border-t pt-2">
            עודכן ב-{formatDate(review.updated_at)}
          </div>
        )}
      </CardContent>
    </Card>
  );
};