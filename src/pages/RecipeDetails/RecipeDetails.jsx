import { useParams, Link, useLocation } from 'react-router';
import { useEffect } from 'react';
import RecipeOverview from './components/RecipeOverview.jsx';
import RecipeInstructions from './components/RecipeInstruction.jsx';
import RecipeIngredients from './components/RecipeIngredients.jsx';
import Button from '../../components/Button/Button.jsx';

import './RecipeDetails.css';

export default function RecipeDetails({ recipes,
    loading,
    error,
    toggleFavorite,
    isFavorite,
    rememberRecipe,
}) {
    const { id } = useParams();
    const location = useLocation();
    const fromFavorites = location.state?.from === 'favorites';
    const favorite = isFavorite(Number(id));

    useEffect(() => {
        if (id) {
            rememberRecipe(Number(id));
        }
    }, [id, rememberRecipe]);

    if (loading) {
        return <p>Chargement de la recette...</p>;
    }

    if (error) {
        return <p role="alert">Erreur : {error}</p>;
    }

    const recipe = recipes.find(
        (item) => item.id === Number(id)
    );

    if (!recipe) {
        return (
            <section className="recipe-details">
                <h1>Recette introuvable</h1>
                <Link to="/">Retour aux recettes</Link>
            </section>
        );
    }



    return (
        <article className="recipe-details">
            <Link
                to={fromFavorites ? '/favorites' : '/'}
                className="recipe-details__back"
            >
                {fromFavorites
                    ? '← Retour aux favoris'
                    : '← Retour aux recettes'}
            </Link>

            <h1 className="recipe-details__title">
                {recipe.name}
            </h1>

            <Button
                type="button"
                className="recipe-details__favorite-button"
                onClick={() => toggleFavorite(recipe.id)}
                aria-pressed={favorite}
            >
                {favorite
                    ? '♥ Retirer des favoris'
                    : '♡ Ajouter aux favoris'}
            </Button>

            <div className="recipe-details__layout">
                <section className="recipe-details__sidebar">
                    <RecipeOverview recipe={recipe} />
                    <RecipeInstructions instructions={recipe.instructions} />
                </section>

                <section className="recipe-details__ingredients">
                    <RecipeIngredients recipe={recipe} />
                </section>
            </div>
        </article>
    );
}