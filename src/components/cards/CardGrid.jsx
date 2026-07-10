import PokemonCard from './PokemonCard';
import Loader from '../ui/Loader';
import ErrorMessage from '../ui/ErrorMessage';
import EmptyState from '../ui/EmptyState';
import styles from './CardGrid.module.css';

const MAX_STAGGER_ITEMS = 12;
const STAGGER_STEP_SECONDS = 0.035;

const CardGrid = ({ cards = [], status = 'idle', error, onRetry }) => {
  if (status === 'loading') return <Loader />;
  if (status === 'error') return <ErrorMessage message={error} onRetry={onRetry} />;
  if (status === 'empty' || (status === 'success' && cards.length === 0)) {
    return <EmptyState />;
  }

  return (
    <div className={styles.grid}>
      {cards.map((card, index) => (
        <div
          key={card.id}
          className={styles.gridItem}
          style={{ animationDelay: `${Math.min(index, MAX_STAGGER_ITEMS) * STAGGER_STEP_SECONDS}s` }}
        >
          <PokemonCard card={card} />
        </div>
      ))}
    </div>
  );
};

export default CardGrid;
