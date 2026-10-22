
import { useEffect, useState } from 'react';

const FAVORITES_STORAGE_KEY = 'favoriteRecipes';

export default function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useState(() => {
    try {
      const savedFavorites = localStorage.getItem(
        FAVORITES_STORAGE_KEY
      );

      return savedFavorites ? JSON.parse(savedFavorites) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      FAVORITES_STORAGE_KEY,
      JSON.stringify(favoriteIds)
    );
  }, [favoriteIds]);

  function toggleFavorite(recipeId) {
    setFavoriteIds((currentIds) => {
      if (currentIds.includes(recipeId)) {
        return currentIds.filter((id) => id !== recipeId);
      }

      return [...currentIds, recipeId];
    });
  }

  function isFavorite(recipeId) {
    return favoriteIds.includes(recipeId);
  }

  return {
    favoriteIds,
    toggleFavorite,
    isFavorite,
  };
}