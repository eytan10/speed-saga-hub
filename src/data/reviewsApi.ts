import { supabase } from '@/integrations/supabase/client';

export interface Review {
  id: number;
  car_key: string;
  user_id: string;
  rating: number;
  title?: string;
  body: string;
  created_at: string;
  updated_at: string;
}

export interface ReviewAggregates {
  count: number;
  avgRating: number;
  distributionByStar: Record<number, number>;
}

export interface CreateReviewData {
  carKey: string;
  rating: number;
  title?: string;
  body: string;
}

export interface UpdateReviewData {
  rating?: number;
  title?: string;
  body?: string;
}

export interface ListReviewsParams {
  page?: number;
  pageSize?: number;
  sortBy?: 'latest' | 'highest_rating' | 'lowest_rating';
}

export interface ReviewsResult {
  reviews: Review[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  error?: string;
}

export const reviewsApi = {
  async listReviews(carKey: string, params: ListReviewsParams = {}): Promise<ReviewsResult> {
    try {
      const { page = 1, pageSize = 20, sortBy = 'latest' } = params;
      const offset = (page - 1) * pageSize;

      let query = supabase
        .from('reviews')
        .select('*', { count: 'exact' })
        .eq('car_key', carKey);

      // Apply sorting
      switch (sortBy) {
        case 'highest_rating':
          query = query.order('rating', { ascending: false }).order('created_at', { ascending: false });
          break;
        case 'lowest_rating':
          query = query.order('rating', { ascending: true }).order('created_at', { ascending: false });
          break;
        case 'latest':
        default:
          query = query.order('created_at', { ascending: false });
          break;
      }

      query = query.range(offset, offset + pageSize - 1);

      const { data, error, count } = await query;

      if (error) {
        console.error('Reviews API - listReviews error:', error);
        return {
          reviews: [],
          total: 0,
          page,
          pageSize,
          totalPages: 0,
          error: error.message
        };
      }

      const totalPages = Math.ceil((count || 0) / pageSize);

      return {
        reviews: (data as Review[]) || [],
        total: count || 0,
        page,
        pageSize,
        totalPages
      };
    } catch (err) {
      console.error('Reviews API - listReviews catch:', err);
      return {
        reviews: [],
        total: 0,
        page: params.page || 1,
        pageSize: params.pageSize || 20,
        totalPages: 0,
        error: 'Unknown error occurred'
      };
    }
  },

  async getReviewAggregates(carKey: string): Promise<ReviewAggregates> {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('rating')
        .eq('car_key', carKey);

      if (error) {
        console.error('Reviews API - getReviewAggregates error:', error);
        return {
          count: 0,
          avgRating: 0,
          distributionByStar: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
        };
      }

      const count = data.length;
      
      if (count === 0) {
        return {
          count: 0,
          avgRating: 0,
          distributionByStar: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
        };
      }

      const sum = data.reduce((acc, review) => acc + review.rating, 0);
      const avgRating = Math.round((sum / count) * 10) / 10;

      const distributionByStar = data.reduce((acc, review) => {
        acc[review.rating] = (acc[review.rating] || 0) + 1;
        return acc;
      }, {} as Record<number, number>);

      // Ensure all ratings 1-5 are represented
      for (let i = 1; i <= 5; i++) {
        if (!distributionByStar[i]) {
          distributionByStar[i] = 0;
        }
      }

      return {
        count,
        avgRating,
        distributionByStar
      };
    } catch (err) {
      console.error('Reviews API - getReviewAggregates catch:', err);
      return {
        count: 0,
        avgRating: 0,
        distributionByStar: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
      };
    }
  },

  async createReview(data: CreateReviewData): Promise<{ success: boolean; error?: string }> {
    try {
      // Validate rating
      if (data.rating < 1 || data.rating > 5) {
        return { success: false, error: 'דירוג חייב להיות בין 1 ל-5' };
      }

      // Validate body length
      if (data.body.length < 20) {
        return { success: false, error: 'הביקורת חייבת להכיל לפחות 20 תווים' };
      }

      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        return { success: false, error: 'User not authenticated' };
      }

      const { error } = await supabase
        .from('reviews')
        .insert({
          car_key: data.carKey,
          user_id: user.id,
          rating: data.rating,
          title: data.title,
          body: data.body
        });

      if (error) {
        console.error('Reviews API - createReview error:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (err) {
      console.error('Reviews API - createReview catch:', err);
      return { success: false, error: 'אירעה שגיאה לא צפויה' };
    }
  },

  async updateReview(reviewId: number, data: UpdateReviewData): Promise<{ success: boolean; error?: string }> {
    try {
      // Validate rating if provided
      if (data.rating !== undefined && (data.rating < 1 || data.rating > 5)) {
        return { success: false, error: 'דירוג חייב להיות בין 1 ל-5' };
      }

      // Validate body length if provided
      if (data.body !== undefined && data.body.length < 20) {
        return { success: false, error: 'הביקורת חייבת להכיל לפחות 20 תווים' };
      }

      const { error } = await supabase
        .from('reviews')
        .update({
          ...data,
          updated_at: new Date().toISOString()
        })
        .eq('id', reviewId);

      if (error) {
        console.error('Reviews API - updateReview error:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (err) {
      console.error('Reviews API - updateReview catch:', err);
      return { success: false, error: 'אירעה שגיאה לא צפויה' };
    }
  },

  async deleteReview(reviewId: number): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', reviewId);

      if (error) {
        console.error('Reviews API - deleteReview error:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (err) {
      console.error('Reviews API - deleteReview catch:', err);
      return { success: false, error: 'אירעה שגיאה לא צפויה' };
    }
  },

  async getUserReviewForCar(carKey: string): Promise<Review | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return null;

      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('car_key', carKey)
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Reviews API - getUserReviewForCar error:', error);
        return null;
      }

      return data as Review | null;
    } catch (err) {
      console.error('Reviews API - getUserReviewForCar catch:', err);
      return null;
    }
  }
};