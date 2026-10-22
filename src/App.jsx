import { BrowserRouter, Routes, Route } from 'react-router';
import useRecipes from './hooks/useRecipes.js';
import Header from './components/Header.jsx';
import Home from './pages/Home/Home.jsx';
import RecipeDetails from './pages/RecipeDetails/RecipeDetails.jsx';
import Favorites from './pages/Favorites/Favorites.jsx';
import useFavorites from './hooks/useFavorites.js';
import useDefaultRecipe from './hooks/useDefaultRecipe.js';
import ScrollToTop from './components/ScrollToTop.jsx';
import useSiteSettings from './hooks/useSiteSettings.js';

export default function App() {
  const { recipes, loading, error, addRecipe } = useRecipes();
  const favorites = useFavorites();
  const { defaultRecipeId, rememberRecipe } = useDefaultRecipe(recipes);
  const recipesPath = defaultRecipeId
    ? `/recipes/${defaultRecipeId}`
    : '/';
  const {
    settings: siteSettings,
    loading: settingsLoading,
    error: settingsError,
  } = useSiteSettings();

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header favoriteCount={favorites.favoriteIds.length}
        recipesPath={recipesPath}
        siteSettings={siteSettings}
      />

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                recipes={recipes}
                loading={loading}
                error={error}
                addRecipe={addRecipe}
              />
            }
          />

          <Route
            path="/recipes/:id"
            element={
              <RecipeDetails
                recipes={recipes}
                loading={loading}
                error={error}
                toggleFavorite={favorites.toggleFavorite}
                isFavorite={favorites.isFavorite}
                rememberRecipe={rememberRecipe}
              />
            }
          />

          <Route
            path="/favorites"
            element={
              <Favorites
                recipes={recipes}
                loading={loading}
                error={error}
                favoriteIds={favorites.favoriteIds}
                toggleFavorite={favorites.toggleFavorite}
                isFavorite={favorites.isFavorite}
              />
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}