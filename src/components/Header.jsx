import { NavLink } from 'react-router';
import './Header.css';

export default function Header({ favoriteCount, recipesPath}) {
  return (
    <header className="header">
      <div className="header__brand">
        <div className="header__brand-link">
          <span className="header__brand-icon" aria-hidden="true">
            
            🍳
          </span>

          <span className="header__brand-text">
            <span className="header__logo">
              La Cuisine Gourmande
            </span>

            <span className="header__slogan">
              Des recettes pour tous les jours
            </span>
          </span>
        </div>
      </div>

      <nav
        className="header__navigation"
        aria-label="Navigation principale"
      >
        <NavLink to="/" end>
          Accueil
        </NavLink>

        <NavLink to={recipesPath}>
          Recettes
        </NavLink>

        <NavLink to="/favorites">
          Favoris ({favoriteCount})
        </NavLink>
      </nav>
    </header>
  );
}