
import './SearchBar.css';

export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <label htmlFor="recipe-search">
        Rechercher une recette
      </label>

      <input
        id="recipe-search"
        type="search"
        placeholder="Ex. : Pizza, Pasta..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}