export default function RecipeOverview({ recipe }) {
  return (
    <>
      <img
        src={recipe.image}
        alt={recipe.name}
        className="recipe-details__image"
      />

      <div className="recipe-details__tags">
        <h2>Tags</h2>

        <div className="recipe-details__tag-list">
          {recipe.tags?.length > 0 ? (
            recipe.tags.map((tag) => (
              <span key={tag} className="recipe-details__tag">
                {tag}
              </span>
            ))
          ) : (
            <p>Aucun tag disponible.</p>
          )}
        </div>
      </div>

      <div className="recipe-details__difficulty">
        <h2>Difficulté</h2>
        <p>{recipe.difficulty || 'Non précisée'}</p>
      </div>

      <div className="recipe-details__times">
        <div>
          <h2>Préparation</h2>
          <p>{recipe.prepTimeMinutes} min</p>
        </div>

        <div>
          <h2>Cuisson</h2>
          <p>{recipe.cookTimeMinutes} min</p>
        </div>
      </div>
    </>
  );
}