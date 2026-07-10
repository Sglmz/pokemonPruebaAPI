import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import CardGrid from '../../components/cards/CardGrid';
import Pagination from '../../components/ui/Pagination';
import SearchBar from '../../components/search/SearchBar';
import { useCards } from '../../hooks/useCards';
import { DEFAULT_PAGE_SIZE } from '../../utils/constants';
import styles from './Cards.module.css';

const Cards = () => {
  const [searchParams] = useSearchParams();
  const { cards, page, totalCount, status, error, fetchCards } = useCards();

  const activeFilters = {
    term: searchParams.get('term') || '',
    type: searchParams.get('type') || '',
  };

  const hasActiveFilters = Boolean(activeFilters.term || activeFilters.type);

  useEffect(() => {
    fetchCards(activeFilters, 1);
  }, [searchParams.toString()]);

  const handlePageChange = (nextPage) => {
    fetchCards(activeFilters, nextPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalPages = Math.max(1, Math.ceil(totalCount / DEFAULT_PAGE_SIZE));

  return (
    <div className="container">
      <header className={`${styles.header} animate-slide-up`}>
        <span className="section-eyebrow">Todo el catálogo</span>
        <h1>{hasActiveFilters ? 'Esto encontramos' : 'Todas las cartas'}</h1>
        <p>
          {hasActiveFilters
            ? `Encontramos${status === 'success' && totalCount ? ` ${totalCount}` : ''} cartas que coinciden con tu búsqueda.`
            : 'Dale un vistazo a todas las cartas Pokémon que tenemos disponibles.'}
        </p>
      </header>

      <div className={styles.filtersBar}>
        <SearchBar
          variant="compact"
          initialValue={activeFilters.term}
          placeholder="Busca una carta por nombre, tipo o código..."
          live
        />
      </div>

      <CardGrid
        cards={cards}
        status={status}
        error={error}
        onRetry={() => fetchCards(activeFilters, page)}
      />

      {status === 'success' && (
        <div className="animate-fade-in">
          <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      )}
    </div>
  );
};

export default Cards;
