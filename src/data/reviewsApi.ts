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
  profiles?: {
    display_name: string;
    avatar_url?: string;
  };
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

export const reviewsApi = {
  async listReviews(carKey: string, params: ListReviewsParams = {}) {
    const { page = 1, pageSize = 10, sortBy = 'latest' } = params;
    const offset = (page - 1) * pageSize;

    let query = supabase
      .from('reviews')
      .select(`
        id,
        car_key,
        user_id,
        rating,
        title,
        body,
        created_at,
        updated_at,
        profiles!reviews_user_id_fkey (
          display_name,
          avatar_url
        )
      `)
      .eq('car_key', carKey);

    // Apply sorting
    switch (sortBy) {
      case 'highest_rating':
        query = query.order('rating', { ascending: false });
        break;
      case 'lowest_rating':
        query = query.order('rating', { ascending: true });
        break;
      case 'latest':
      default:
        query = query.order('created_at', { ascending: false });
        break;
    }

    query = query.range(offset, offset + pageSize - 1);

    const { data, error, count } = await query;

    if (error) throw error;

    return {
      reviews: (data as any[])?.map(row => ({
        id: row.id,
        car_key: row.car_key,
        user_id: row.user_id,
        rating: row.rating,
        title: row.title,
        body: row.body,
        created_at: row.created_at,
        updated_at: row.updated_at,
        profiles: row.profiles
      })) || [],
      total: count || 0,
      page,
      pageSize,
      totalPages: Math.ceil((count || 0) / pageSize)
    };
  },

  async getReviewAggregates(carKey: string): Promise<ReviewAggregates> {
    const { data, error } = await supabase
      .from('reviews')
      .select('rating')
      .eq('car_key', carKey);

    if (error) throw error;

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
  },

  async createReview(data: CreateReviewData) {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
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

    if (error) throw error;
  },

  async updateReview(reviewId: number, data: UpdateReviewData) {
    const { error } = await supabase
      .from('reviews')
      .update({
        ...data,
        updated_at: new Date().toISOString()
      })
      .eq('id', reviewId);

    if (error) throw error;
  },

  async deleteReview(reviewId: number) {
    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', reviewId);

    if (error) throw error;
  },

  async getUserReviewForCar(carKey: string) {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return null;

    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('car_key', carKey)
      .eq('user_id', user.id)
      .maybeSingle();

    if (error) throw error;

    return data as Review | null;
  }
};