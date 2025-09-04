import React, { createContext, useContext, useState, useEffect } from 'react';
import { ExtendedCarDetails, massiveCarsDatabase } from '@/data/massiveCarsDatabase';
import { favoritesApi } from '@/data/favoritesApi';
import { getCarKey } from '@/utils/carKey';
import { useAuth } from './AuthContext';
import { toast } from '@/hooks/use-toast';

interface FavoritesContextType {
  favorites: ExtendedCarDetails[];
  addToFavorites: (car: ExtendedCarDetails) => void;
  removeFromFavorites: (carId: string) => void;
  isFavorite: (carId: string) => boolean;
  clearFavorites: () => void;
  loading: boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

// Utility to find car by car_key in hardcoded database
const findCarByKey = (carKey: string): ExtendedCarDetails | null => {
  return massiveCarsDatabase.find(car => getCarKey(car) === carKey) || null;
};

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<ExtendedCarDetails[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // Load favorites from database when user changes
  useEffect(() => {
    if (user) {
      loadFavorites();
    } else {
      setFavorites([]);
    }
  }, [user]);

  const loadFavorites = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const favoriteRecords = await favoritesApi.getUserFavorites();
      const favoriteCards = favoriteRecords
        .map(fav => findCarByKey(fav.car_key))
        .filter((car): car is ExtendedCarDetails => car !== null);
      
      setFavorites(favoriteCards);
    } catch (error) {
      console.error('Failed to load favorites:', error);
      toast({
        title: "Error",
        description: "Failed to load favorites",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = async (car: ExtendedCarDetails) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to add favorites",
        variant: "destructive"
      });
      return;
    }

    const carKey = getCarKey(car);
    
    try {
      await favoritesApi.addToFavorites(carKey);
      setFavorites(prev => {
        if (prev.some(fav => fav.id === car.id)) return prev;
        return [...prev, car];
      });
      toast({
        title: "Added to Favorites",
        description: `${car.brand} ${car.name} added to your favorites`
      });
    } catch (error) {
      console.error('Failed to add favorite:', error);
      toast({
        title: "Error",
        description: "Failed to add to favorites",
        variant: "destructive"
      });
    }
  };

  const removeFromFavorites = async (carId: string) => {
    if (!user) return;

    const car = favorites.find(fav => fav.id === carId);
    if (!car) return;

    const carKey = getCarKey(car);
    
    try {
      await favoritesApi.removeFromFavorites(carKey);
      setFavorites(prev => prev.filter(car => car.id !== carId));
      toast({
        title: "Removed from Favorites",
        description: `${car.brand} ${car.name} removed from your favorites`
      });
    } catch (error) {
      console.error('Failed to remove favorite:', error);
      toast({
        title: "Error", 
        description: "Failed to remove from favorites",
        variant: "destructive"
      });
    }
  };

  const isFavorite = (carId: string) => {
    return favorites.some(car => car.id === carId);
  };

  const clearFavorites = async () => {
    if (!user) return;

    try {
      // Remove all favorites from database
      await Promise.all(
        favorites.map(car => favoritesApi.removeFromFavorites(getCarKey(car)))
      );
      setFavorites([]);
      toast({
        title: "Favorites Cleared",
        description: "All favorites have been removed"
      });
    } catch (error) {
      console.error('Failed to clear favorites:', error);
      toast({
        title: "Error",
        description: "Failed to clear favorites", 
        variant: "destructive"
      });
    }
  };

  return (
    <FavoritesContext.Provider value={{
      favorites,
      addToFavorites,
      removeFromFavorites,
      isFavorite,
      clearFavorites,
      loading
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
