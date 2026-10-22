
import { useEffect, useState } from 'react';

const LAST_RECIPE_KEY = 'lastViewedRecipe';

export default function useDefaultRecipe(recipes) {
  const [lastRecipeId, setLastRecipeId] = useState(() => {
    return localStorage.getItem(LAST_RECIPE_KEY);
  });

  useEffect(() => {
    if (lastRecipeId) {
      localStorage.setItem(LAST_RECIPE_KEY, lastRecipeId);
    }
  }, [lastRecipeId]);

  const lastRecipeExists = recipes.some(
    (recipe) => recipe.id === Number(lastRecipeId)
  );

  const defaultRecipeId = lastRecipeExists
    ? Number(lastRecipeId)
    : recipes[0]?.id;

  function rememberRecipe(recipeId) {
    setLastRecipeId(String(recipeId));
  }

  return {
    defaultRecipeId,
    rememberRecipe,
  };
}