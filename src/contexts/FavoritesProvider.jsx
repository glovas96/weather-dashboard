import { useCallback, useEffect, useMemo, useState } from 'react';
import { FavoritesContext } from '@/contexts/favorites-context';
import {
  addFavorite as storageAdd,
  getFavorites,
  removeFavorite as storageRemove,
} from '@/utils/favorites';

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => getFavorites());

  const refreshFavorites = useCallback(() => {
    setFavorites(getFavorites());
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const handleStorage = () => refreshFavorites();
    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
    };
  }, [refreshFavorites]);

  const addFavorite = useCallback(
    (city) => {
      storageAdd(city);
      refreshFavorites();
    },
    [refreshFavorites]
  );

  const removeFavorite = useCallback(
    (city) => {
      storageRemove(city);
      refreshFavorites();
    },
    [refreshFavorites]
  );

  const value = useMemo(
    () => ({
      favorites,
      addFavorite,
      removeFavorite,
      isFavorite: (city) => favorites.includes(city),
    }),
    [favorites, addFavorite, removeFavorite]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}
