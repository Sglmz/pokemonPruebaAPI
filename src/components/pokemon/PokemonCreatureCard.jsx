import { Link } from 'react-router-dom';
import styles from './PokemonCreatureCard.module.css';

const capitalize = (value) => (value ? value.charAt(0).toUpperCase() + value.slice(1) : '');

const PokemonCreatureCard = ({ pokemon }) => {
  if (!pokemon) return null;

  const { id, name, sprite } = pokemon;

  return (
    <Link to={`/pokemon/${id}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        {id && <span className={styles.idBadge}>#{String(id).padStart(3, '0')}</span>}
        {sprite ? (
          <img src={sprite} alt={name} loading="lazy" className={styles.image} />
        ) : (
          <div className={styles.imagePlaceholder} />
        )}
      </div>

      <div className={styles.info}>
        <h3 className={styles.name}>{capitalize(name)}</h3>

        <span className={styles.viewButton}>
          Ver detalle
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M9 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </Link>
  );
};

export default PokemonCreatureCard;
