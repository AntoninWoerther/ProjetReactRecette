import { NavLink } from 'react-router';
import './Header.css';

export default function Header({ favoriteCount, recipesPath, siteSettings }) {
  return (
    <header className="header">
      <div className="header__brand">
        <div className="header__brand-link">
          <span className="header__brand-icon" aria-hidden="true">
            <icon> </icon>
            🍳
          </span>

          <span className="header__brand-text">
            <span className="header__logo">
              {siteSettings?.name ?? 'Mon site de recettes'}
            </span>

            {siteSettings?.slogan && (
              <span className="header__slogan">
                {siteSettings.slogan}
              </span>
            )}
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