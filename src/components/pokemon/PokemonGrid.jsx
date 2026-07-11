import PokemonCreatureCard from './PokemonCreatureCard';
import CardSkeleton from '../ui/CardSkeleton';
import ErrorMessage from '../ui/ErrorMessage';
import EmptyState from '../ui/EmptyState';
import styles from './PokemonGrid.module.css';

const MAX_STAGGER_ITEMS = 12;
const STAGGER_STEP_SECONDS = 0.035;
const SKELETON_COUNT = 12;

const PokemonGrid = ({ pokemonList = [], status = 'idle', error, onRetry }) => {
  if (status === 'loading') {
    return (
      <div className={styles.grid}>
        {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
          <div key={index} className={styles.gridItem}>
            <CardSkeleton aspectRatio="1 / 1" withSubtitle={false} withTags={false} />
          </div>
        ))}
      </div>
    );
  }
  if (status === 'error') return <ErrorMessage message={error} onRetry={onRetry} />;
  if (status === 'empty' || (status === 'success' && pokemonList.length === 0)) {
    return <EmptyState title="No encontramos nada" message="Prueba con otro nombre, tipo o código." />;
  }

  return (
    <div className={styles.grid}>
      {pokemonList.map((pokemon, index) => (
        <div
          key={pokemon.id ?? pokemon.name}
          className={styles.gridItem}
          style={{ animationDelay: `${Math.min(index, MAX_STAGGER_ITEMS) * STAGGER_STEP_SECONDS}s` }}
        >
          <PokemonCreatureCard pokemon={pokemon} />
        </div>
      ))}
    </div>
  );
};

export default PokemonGrid;
