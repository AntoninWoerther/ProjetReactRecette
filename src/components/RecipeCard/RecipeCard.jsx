import { Link } from 'react-router';
import './RecipeCard.css';

export default function RecipeCard({ recipe }) {
  return (
    <Link
      to={`/recipes/${recipe.id}`}
      className="recipe-card"
    >
      <img
        className="recipe-card__image"
        src={recipe.image}
        alt=""
        loading="lazy"
      />

      <div className="recipe-card__content">
        <h2 className="recipe-card__title">
          {recipe.name}
        </h2>

        <p className="recipe-card__rating">
          ★ {recipe.rating} ({recipe.reviewCount ?? 0} avis)
        </p>

        <div className="recipe-card__details">
          <p>Préparation : {recipe.prepTimeMinutes} min</p>
          <p>Cuisson : {recipe.cookTimeMinutes} min</p>
        </div>
      </div>
    </Link>
  );
}