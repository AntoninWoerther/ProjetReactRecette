export default function RecipeInstructions({ instructions }) {
  return (
    <div className="recipe-details__instructions">
      <h2>Instructions</h2>

      <ol>
        {instructions.map((instruction, index) => (
          <li key={`${index}-${instruction}`}>
            {instruction}
          </li>
        ))}
      </ol>
    </div>
  );
}