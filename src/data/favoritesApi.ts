import { supabase } from '@/integrations/supabase/client';

export interface Favorite {
  id: number;
  user_id: string;
  car_key: string;
  created_at: string;
}

export const favoritesApi = {
  async getUserFavorites() {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return [];

    const { data, error } = await supabase
      .from('favorites')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data as Favorite[];
  },

  async addToFavorites(carKey: string) {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    const { error } = await supabase
      .from('favorites')
      .insert({
        user_id: user.id,
        car_key: carKey
      });

    if (error) throw error;
  },

  async removeFromFavorites(carKey: string) {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', user.id)
      .eq('car_key', carKey);

    if (error) throw error;
  },

  async isFavorite(carKey: string) {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return false;

    const { data, error } = await supabase
      .from('favorites')
      .select('id')
      .eq('user_id', user.id)
      .eq('car_key', carKey)
      .single();

    if (error && error.code !== 'PGRST116') throw error;

    return !!data;
  }
};