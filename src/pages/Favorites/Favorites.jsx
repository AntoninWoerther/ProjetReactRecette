import { Link } from 'react-router';
import { useState } from 'react';
import './Favorites.css';
import SearchBar from '../../components/SearchBar/SearchBar.jsx';
import Pagination from '../../components/Paginations/Pagination.jsx';
import Button from '../../components/Button/Button.jsx';

const RECIPES_PER_PAGE = 12;

export default function Favorites({
  recipes,
  loading,
  error,
  favoriteIds,
  toggleFavorite,
  isFavorite,
}) {

  const [searchTerm, setSearchTerm] = useState('');
   const [currentPage, setCurrentPage] = useState(1);

  const favoriteRecipes = recipes.filter((recipe) =>
    favoriteIds.includes(recipe.id)
  );

  const filteredFavorites = favoriteRecipes.filter((recipe) =>
    recipe.name
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase())
  );
  const totalPages = Math.ceil(
    filteredFavorites.length / RECIPES_PER_PAGE
  );

  const startIndex = (currentPage - 1) * RECIPES_PER_PAGE;

  const displayedFavorites = filteredFavorites.slice(
    startIndex,
    startIndex + RECIPES_PER_PAGE
  );
  function handleSearchChange(value) {
    setSearchTerm(value);
    setCurrentPage(1);
  }


  if (loading) {
    return <p>Chargement des favoris...</p>;
  }

  if (error) {
    return <p role="alert">Erreur : {error}</p>;
  }



  if (favoriteRecipes.length === 0) {
    return (
      <section className="favorites">
        <h1>Mes recettes favorites</h1>
        <p>Vous n'avez pas encore ajouté de recettes à vos favoris.</p>
        <Link to="/">Découvrir les recettes</Link>
      </section>
    );
  }

  return (
    <section className="favorites">
      <h1>Mes recettes favorites</h1>

      <SearchBar
        value={searchTerm}
        onChange={handleSearchChange}
      />

      {favoriteRecipes.length === 0 ? (
        <p>
          Vous n'avez pas encore ajouté de recettes à vos favoris.
        </p>
      ) : filteredFavorites.length === 0 ? (
        <p role="status">
          Aucun favori ne correspond à votre recherche.
        </p>
      ) : (
        <>
          <div className="favorites__grid">
            {displayedFavorites.map((recipe) => (
              <article
                className="favorites__card"
                key={recipe.id}
              >
                <Link
                  to={`/recipes/${recipe.id}`}
                  state={{ from: 'favorites' }}
                  className="favorites__link"
                >
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    loading="lazy"
                  />

                  <h2>{recipe.name}</h2>
                </Link>

                <p>{recipe.cuisine}</p>

                <Button
                  type="button"
                  onClick={() => toggleFavorite(recipe.id)}
                  aria-pressed={isFavorite(recipe.id)}
                >
                  ♥ Retirer des favoris
                </Button>
              </article>
            ))}
          </div>

          <p className="favorites__page-info">
            Page {currentPage} sur {totalPages}
            {' — '}
            {filteredFavorites.length} recette(s)
          </p>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}
    </section>

  );
}