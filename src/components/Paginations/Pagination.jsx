import './Pagination.css';
import Button from '../Button/Button.jsx';

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  if (totalPages <= 1) {
    return null;
  }

  function handlePageChange(page) {
    onPageChange(page);

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  return (
    <nav
      className="pagination"
      aria-label="Pagination des recettes"
    >
      <Button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        variant="secondary"
      >
        Précédent
      </Button>

      {Array.from({ length: totalPages }, (_, index) => {
        const page = index + 1;

        return (
          <Button
            key={page}
            onClick={() => handlePageChange(page)}
            className={
              currentPage === page
                ? 'pagination__button--active'
                : ''
            }
            variant={currentPage === page ? 'primary' : 'secondary'}
            aria-current={
              currentPage === page ? 'page' : undefined
            }
          >
            {page}
          </Button>
        );
      })}

      <Button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        variant="secondary"
      >
        Suivant
      </Button>
    </nav>
  );
}