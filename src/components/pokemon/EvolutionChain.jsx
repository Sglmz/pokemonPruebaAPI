import { Link } from 'react-router-dom';
import styles from './EvolutionChain.module.css';

const capitalize = (value) => (value ? value.charAt(0).toUpperCase() + value.slice(1) : '');

const EvolutionChain = ({ stages = [], activeId }) => {
  if (stages.length < 2) return null;

  return (
    <div className={styles.chain}>
      {stages.map((stage, stageIndex) => (
        <div key={stageIndex} className={styles.stageGroup}>
          {stageIndex > 0 && (
            <span className={styles.arrow} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          )}

          <div className={styles.stage}>
            {stage.map((pokemon) => (
              <Link
                key={pokemon.id}
                to={`/pokemon/${pokemon.id}`}
                className={
                  pokemon.id === activeId
                    ? `${styles.stageItem} ${styles.stageItemActive}`
                    : styles.stageItem
                }
              >
                <img src={pokemon.sprite} alt={pokemon.name} className={styles.sprite} loading="lazy" />
                <span className={styles.name}>{capitalize(pokemon.name)}</span>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EvolutionChain;
