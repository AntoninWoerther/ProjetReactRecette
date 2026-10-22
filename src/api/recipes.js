const RECIPES_API_URL = 'https://dummyjson.com/recipes?limit=0';

export async function getRecipes() {
  const response = await fetch(RECIPES_API_URL);

  if (!response.ok) {
    throw new Error('Impossible de récupérer les recettes.');
  }

  const data = await response.json();

  return data.recipes;
}

export async function addRecipe(recipeData) {
  const response = await fetch('https://dummyjson.com/recipes/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(recipeData),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error('Erreur API :', response.status, data);
    throw new Error(
      data.message || "Impossible d'ajouter la recette."
    );
  }

  return data;
}