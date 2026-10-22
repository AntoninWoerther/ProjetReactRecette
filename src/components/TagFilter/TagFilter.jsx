import { useState } from 'react';
import './TagFilter.css';
import Button from '../Button/Button.jsx';

const INITIAL_TAG_COUNT = 6;

export default function TagFilter({
  tags,
  selectedTag,
  onTagChange,
}) {
  const [showAllTags, setShowAllTags] = useState(false);

  const visibleTags = showAllTags
    ? tags
    : tags.slice(0, INITIAL_TAG_COUNT);

  const hasMoreTags = tags.length > INITIAL_TAG_COUNT;

  return (
    <div className="tag-filter" aria-label="Filtrer par tag">
      <Button
        type="button"
        variant={selectedTag === '' ? 'primary' : 'secondary'}
        className="tag-filter__button"
        onClick={() => onTagChange('')}
        aria-pressed={selectedTag === ''}
      >
        Tous
      </Button>

      {visibleTags.map((tag) => {
        const isActive = selectedTag === tag;

        return (
          <Button
            key={tag}
            type="button"
            variant={isActive ? 'primary' : 'secondary'}
            className="tag-filter__button"
            onClick={() => onTagChange(tag)}
            aria-pressed={isActive}
          >
            {tag}
          </Button>
        );
      })}

      {hasMoreTags && (
        <Button
          type="button"
          variant="secondary"
          className="tag-filter__button tag-filter__more"
          onClick={() => setShowAllTags((previous) => !previous)}
          aria-expanded={showAllTags}
        >
          {showAllTags ? 'Réduire −' : '...'}
        </Button>
      )}
    </div>
  );
}