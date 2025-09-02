import { ReviewAggregates } from '@/data/reviewsApi';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

interface ReviewAggregateStatsProps {
  aggregates: ReviewAggregates;
}

export const ReviewAggregateStats = ({ aggregates }: ReviewAggregateStatsProps) => {
  const { count, avgRating, distributionByStar } = aggregates;

  const getPercentage = (starCount: number) => {
    return count > 0 ? Math.round((starCount / count) * 100) : 0;
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Overall Rating */}
          <div className="text-center md:text-right">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <span className="text-3xl font-bold">{avgRating.toFixed(1)}</span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${
                      star <= Math.round(avgRating)
                        ? 'fill-yellow-500 text-yellow-500'
                        : 'text-muted-foreground'
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-muted-foreground">
              מבוסס על {count} ביקורות
            </p>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((stars) => (
              <div key={stars} className="flex items-center gap-2 text-sm">
                <span className="flex items-center gap-1 w-12">
                  {stars} <Star className="h-3 w-3 fill-current" />
                </span>
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div
                    className="bg-yellow-500 h-2 rounded-full transition-all"
                    style={{ width: `${getPercentage(distributionByStar[stars])}%` }}
                  />
                </div>
                <span className="w-8 text-muted-foreground text-xs">
                  {distributionByStar[stars]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};