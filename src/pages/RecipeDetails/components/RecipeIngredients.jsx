
export default function RecipeIngredients({ recipe }) {
  return (
    <section className="recipe-details__ingredients">
      <h2>Ingrédients</h2>

      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={`${ingredient}-${index}`}>
            {ingredient}
          </li>
        ))}
      </ul>

      <div className="recipe-details__rating">
        <span className="recipe-details__rating-star">
          ★
        </span>

        <strong>{recipe.rating}</strong>

        <span>
          ({recipe.reviewCount ?? 0} avis)
        </span>
      </div>
    </section>
  );
}