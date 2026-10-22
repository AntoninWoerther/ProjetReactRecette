import { useEffect, useState } from 'react';
import RecipeList from './components/RecipeList.jsx';
import Pagination from '../../components/Paginations/Pagination.jsx';
import SearchBar from '../../components/SearchBar/SearchBar.jsx';
import TagFilter from '../../components/TagFilter/TagFilter.jsx';
import RatingFilter from '../../components/RatingFilter/RatingFilter.jsx';
import AddRecipeModal from '../../components/AddRecipeModal/AddRecipeModal.jsx';
import Button from '../../components/Button/Button.jsx';
import './Home.css';

const RECIPES_PER_PAGE = 12;

export default function Home({ recipes, loading, error, addRecipe }) {
  const [isAddRecipeModalOpen, setIsAddRecipeModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(() => {
    return Number(sessionStorage.getItem('recipesCurrentPage')) || 1;
  });

  const [searchTerm, setSearchTerm] = useState(() => {
    return sessionStorage.getItem('recipesSearchTerm') ?? '';
  });

  const [selectedTag, setSelectedTag] = useState(() => {
    return sessionStorage.getItem('recipesSelectedTag') ?? '';
  });

  const [minimumRating, setMinimumRating] = useState(() => {
    const savedRating = sessionStorage.getItem('recipesMinimumRating');
    const rating = Number(savedRating);

    return savedRating !== null && Number.isFinite(rating)
      && rating >= 0 && rating <= 5
      ? rating
      : 0;
  });



  useEffect(() => {
    sessionStorage.setItem('recipesCurrentPage', String(currentPage));
  }, [currentPage]);

  useEffect(() => {
    sessionStorage.setItem('recipesSearchTerm', searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    sessionStorage.setItem('recipesSelectedTag', selectedTag);
  }, [selectedTag]);

  useEffect(() => {
    sessionStorage.setItem(
      'recipesMinimumRating',
      String(minimumRating)
    );
  }, [minimumRating]);

  const availableTags = [
    ...new Set(recipes.flatMap((recipe) => recipe.tags ?? [])),
  ].sort((a, b) => a.localeCompare(b));

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesTag =
      selectedTag === '' || recipe.tags?.includes(selectedTag);

    const matchesSearch = recipe.name
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase());

    const matchesRating =
      minimumRating === 0 || recipe.rating >= minimumRating;

    return matchesTag && matchesSearch && matchesRating;
  });



  const totalPages = Math.ceil(
    filteredRecipes.length / RECIPES_PER_PAGE
  );

  const startIndex = (currentPage - 1) * RECIPES_PER_PAGE;

  const displayedRecipes = filteredRecipes.slice(
    startIndex,
    startIndex + RECIPES_PER_PAGE
  );



  if (loading) {
    return <p>Chargement des recettes...</p>;
  }

  if (error) {
    return <p role="alert">Erreur : {error}</p>;
  }

  return (
    <section className="home">
      <h1>Nos recettes</h1>

      <div className="home__actions">
        <Button onClick={() => setIsAddRecipeModalOpen(true)}>
          + Ajouter une recette
        </Button>
      </div>

      {isAddRecipeModalOpen && (
        <AddRecipeModal
          onClose={() => setIsAddRecipeModalOpen(false)}
          onSubmit={addRecipe}
        />
      )}

      <div className="home__filters">
        <div className="home__filters-main">
          <SearchBar
            value={searchTerm}
            onChange={(value) => {
              setSearchTerm(value);
              setCurrentPage(1);
            }}
          />

          <TagFilter
            tags={availableTags}
            selectedTag={selectedTag}
            onTagChange={(tag) => {
              setSelectedTag(tag);
              setCurrentPage(1);
            }}
          />
        </div>

        <RatingFilter
          value={minimumRating}
          onChange={(rating) => {
            setMinimumRating(rating);
            setCurrentPage(1);
          }}
        />
      </div>

      <RecipeList recipes={displayedRecipes} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <p className="pagination__info">
        Page {currentPage} sur {totalPages}
      </p>
    </section>
  );
}