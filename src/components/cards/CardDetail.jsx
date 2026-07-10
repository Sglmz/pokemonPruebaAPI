import { Link } from 'react-router-dom';
import styles from './CardDetail.module.css';

const CardDetail = ({ card }) => {
  if (!card) return null;

  const {
    name,
    images,
    flavorText,
    hp,
    types = [],
    rarity,
    set,
    artist,
    supertype,
    subtypes = [],
  } = card;

  const statEntries = [
    hp && { label: 'HP', value: hp },
    set?.name && { label: 'Set', value: set.name },
    artist && { label: 'Artista', value: artist },
    subtypes.length > 0 && { label: 'Subtipos', value: subtypes.join(', ') },
  ].filter(Boolean);

  return (
    <article className={`${styles.detail} animate-fade-in`}>
      <Link to="/cards" className={styles.backLink}>
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M15 6l-6 6 6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Volver a las cartas
      </Link>

      <div className={styles.layout}>
        <div className={`${styles.imageWrapper} animate-scale-in`}>
          <img src={images?.large || images?.small} alt={name} className={styles.image} />
        </div>

        <div className={styles.panel}>
          <div className={`${styles.headingRow} animate-slide-up`}>
            {supertype && <span className={styles.eyebrow}>{supertype}</span>}
            <h1 className={styles.name}>{name}</h1>
            <div className={styles.badgeRow}>
              {types.map((type, index) => (
                <span
                  key={type}
                  className={`${styles.typeBadge} animate-scale-in`}
                  style={{ animationDelay: `${0.15 + index * 0.06}s` }}
                >
                  {type}
                </span>
              ))}
              {rarity && (
                <span
                  className={`${styles.rarityBadge} animate-scale-in`}
                  style={{ animationDelay: `${0.15 + types.length * 0.06}s` }}
                >
                  {rarity}
                </span>
              )}
            </div>
          </div>

          {flavorText && (
            <p className={`${styles.flavorText} animate-slide-up`} style={{ animationDelay: '0.1s' }}>
              {flavorText}
            </p>
          )}

          <dl className={styles.statsList}>
            {statEntries.map((entry, index) => (
              <div
                key={entry.label}
                className={`${styles.statItem} animate-slide-up`}
                style={{ animationDelay: `${0.2 + index * 0.06}s` }}
              >
                <dt>{entry.label}</dt>
                <dd>{entry.value}</dd>
              </div>
            ))}
          </dl>

          <div className={`${styles.actions} animate-slide-up`} style={{ animationDelay: '0.3s' }}>
            <Link to="/cards" className={styles.secondaryAction}>
              Ver más cartas
            </Link>
            <Link to="/" className={styles.primaryAction}>
              Buscar otra carta
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export default CardDetail;
