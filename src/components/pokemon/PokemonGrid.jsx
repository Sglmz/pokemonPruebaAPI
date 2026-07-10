import PokemonCreatureCard from './PokemonCreatureCard';
import Loader from '../ui/Loader';
import ErrorMessage from '../ui/ErrorMessage';
import EmptyState from '../ui/EmptyState';
import styles from './PokemonGrid.module.css';

const MAX_STAGGER_ITEMS = 12;
const STAGGER_STEP_SECONDS = 0.035;

const PokemonGrid = ({ pokemonList = [], status = 'idle', error, onRetry }) => {
  if (status === 'loading') return <Loader />;
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
