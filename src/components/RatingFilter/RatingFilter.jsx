import './RatingFilter.css';

export default function RatingFilter({ value, onChange }) {
  return (
    <section className="rating-filter">
      <label htmlFor="rating-filter__slider">
        Note minimale : <strong>{value} / 5</strong>
      </label>

      <input
        id="rating-filter__slider"
        className="rating-filter__slider"
        type="range"
        min="0"
        max="5"
        step="0.1"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        aria-describedby="rating-filter__help"
      />

      <div className="rating-filter__scale" aria-hidden="true">
        <span>0 ★</span>
        <span>2,5 ★</span>
        <span>5 ★</span>
      </div>

      <p id="rating-filter__help" className="rating-filter__help">
        Afficher les recettes ayant au moins cette note.
      </p>
    </section>
  );
}