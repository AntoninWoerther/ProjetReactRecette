
import RecipeCard from '../../../components/RecipeCard/RecipeCard.jsx';

export default function RecipeList({ recipes }) {
  if (recipes.length === 0) {
    return <p>Aucune recette disponible.</p>;
  }

  return (
    <section className="recipe-list" aria-label="Liste des recettes">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </section>
  );
}