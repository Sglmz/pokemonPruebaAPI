import styles from './Pagination.module.css';

const Pagination = ({ page = 1, totalPages = 1, onPageChange }) => {
  const handlePrev = () => {
    if (page > 1) onPageChange?.(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) onPageChange?.(page + 1);
  };

  return (
    <nav className={styles.pagination} aria-label="Paginación">
      <button
        type="button"
        className={styles.pageButton}
        onClick={handlePrev}
        disabled={page <= 1}
      >
        Anterior
      </button>
      <span key={page} className={styles.pageInfo}>
        Página {page} de {totalPages}
      </span>
      <button
        type="button"
        className={styles.pageButton}
        onClick={handleNext}
        disabled={page >= totalPages}
      >
        Siguiente
      </button>
    </nav>
  );
};

export default Pagination;
