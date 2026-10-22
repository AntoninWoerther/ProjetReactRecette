import { useEffect, useState } from 'react';
import { getRecipes, addRecipe as createRecipe } from '../api/recipes.js';

export default function useRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadRecipes() {
      try {
        const data = await getRecipes();
        setRecipes(data);
      } catch (error) {
        setError(error.message);
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadRecipes();
  }, []);

  async function addRecipe(recipeData) {
    const newRecipe = await createRecipe(recipeData);

    return newRecipe;
  }

  return { recipes, loading, error, addRecipe };
}