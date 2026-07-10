import { Link } from 'react-router-dom';
import { TYPE_ACCENT_COLORS, DEFAULT_ACCENT_COLOR } from '../../utils/constants';
import styles from './PokemonCard.module.css';

const PokemonCard = ({ card }) => {
  if (!card) return null;

  const { id, name, images, types = [], rarity, set, hp } = card;
  const accentColor = TYPE_ACCENT_COLORS[types[0]] || DEFAULT_ACCENT_COLOR;

  return (
    <Link to={`/cards/${id}`} className={styles.card} style={{ '--accent': accentColor }}>
      <div className={styles.imageWrapper}>
        {rarity && <span className={styles.rarityBadge}>{rarity}</span>}
        <img src={images?.small} alt={name} loading="lazy" className={styles.image} />
      </div>

      <div className={styles.info}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.set}>{set?.name}</p>

        <div className={styles.metaRow}>
          {types.map((type) => (
            <span key={type} className={styles.typeTag}>
              {type}
            </span>
          ))}
          {hp && <span className={styles.hpTag}>{hp} HP</span>}
        </div>

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

export default PokemonCard;
