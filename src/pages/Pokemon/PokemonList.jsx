import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PokemonGrid from '../../components/pokemon/PokemonGrid';
import Pagination from '../../components/ui/Pagination';
import SearchBar from '../../components/search/SearchBar';
import FilterMenu from '../../components/search/FilterMenu';
import { usePokemonList } from '../../hooks/usePokemonList';
import {
  DEFAULT_PAGE_SIZE,
  POKEMON_CREATURE_TYPES,
  POKEMON_CREATURE_TYPE_LABELS,
  POKEMON_CREATURE_TYPE_COLORS,
} from '../../utils/constants';
import styles from './PokemonList.module.css';

const TYPE_OPTIONS = POKEMON_CREATURE_TYPES.map((type) => ({
  value: type,
  label: POKEMON_CREATURE_TYPE_LABELS[type] || type,
  color: POKEMON_CREATURE_TYPE_COLORS[type],
}));

const PokemonList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { pokemonList, page, totalCount, status, error, fetchPokemon } = usePokemonList();

  const activeFilters = {
    term: searchParams.get('term') || '',
    type: searchParams.get('type') || '',
  };

  const hasActiveFilters = Boolean(activeFilters.term || activeFilters.type);

  useEffect(() => {
    fetchPokemon(activeFilters, 1);
  }, [searchParams.toString()]);

  const handleTypeChange = (type) => {
    const next = new URLSearchParams(searchParams);
    if (type) {
      next.set('type', type);
    } else {
      next.delete('type');
    }
    setSearchParams(next);
  };

  const handlePageChange = (nextPage) => {
    fetchPokemon(activeFilters, nextPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalPages = Math.max(1, Math.ceil(totalCount / DEFAULT_PAGE_SIZE));

  return (
    <div className="container">
      <header className={`${styles.header} animate-slide-up`}>
        <span className="section-eyebrow">Pokédex</span>
        <h1>{hasActiveFilters ? 'Esto encontramos' : 'Todos los Pokémon'}</h1>
        <p>
          {hasActiveFilters
            ? `Encontramos${status === 'success' && totalCount ? ` ${totalCount}` : ''} Pokémon que coinciden con tu búsqueda.`
            : 'Conoce a cada Pokémon con sus estadísticas, habilidades y movimientos.'}
        </p>
      </header>

      <div className={styles.filtersBar}>
        <SearchBar
          mode="pokemon"
          variant="compact"
          initialValue={activeFilters.term}
          placeholder="Busca un Pokémon por nombre, tipo o código..."
          live
        />
        <FilterMenu options={TYPE_OPTIONS} activeValue={activeFilters.type} onSelect={handleTypeChange} />
      </div>

      <PokemonGrid
        pokemonList={pokemonList}
        status={status}
        error={error}
        onRetry={() => fetchPokemon(activeFilters, page)}
      />

      {status === 'success' && (
        <div className="animate-fade-in">
          <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      )}
    </div>
  );
};

export default PokemonList;
