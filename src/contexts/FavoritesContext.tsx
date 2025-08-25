import React, { createContext, useContext, useState, useEffect } from 'react';
import { ExtendedCarDetails } from '@/data/massiveCarsDatabase';

interface FavoritesContextType {
  favorites: ExtendedCarDetails[];
  addToFavorites: (car: ExtendedCarDetails) => void;
  removeFromFavorites: (carId: string) => void;
  isFavorite: (carId: string) => boolean;
  clearFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<ExtendedCarDetails[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (car: ExtendedCarDetails) => {
    setFavorites(prev => {
      if (prev.some(fav => fav.id === car.id)) return prev;
      return [...prev, car];
    });
  };

  const removeFromFavorites = (carId: string) => {
    setFavorites(prev => prev.filter(car => car.id !== carId));
  };

  const isFavorite = (carId: string) => {
    return favorites.some(car => car.id === carId);
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  return (
    <FavoritesContext.Provider value={{
      favorites,
      addToFavorites,
      removeFromFavorites,
      isFavorite,
      clearFavorites
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
