import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { POKEMON_CREATURE_TYPE_COLORS } from '../../utils/constants';
import styles from './PokemonDetail.module.css';

const STAT_LABELS = {
  hp: 'HP',
  attack: 'Ataque',
  defense: 'Defensa',
  'special-attack': 'At. Especial',
  'special-defense': 'Def. Especial',
  speed: 'Velocidad',
};

const MAX_MOVES_SHOWN = 24;

const capitalize = (value) => (value ? value.charAt(0).toUpperCase() + value.slice(1) : '');

const PokemonDetail = ({ pokemon }) => {
  const [barsReady, setBarsReady] = useState(false);

  useEffect(() => {
    setBarsReady(false);
    const raf = requestAnimationFrame(() => setBarsReady(true));
    return () => cancelAnimationFrame(raf);
  }, [pokemon?.id]);

  if (!pokemon) return null;

  const {
    id,
    name,
    sprite,
    height,
    weight,
    baseExperience,
    types = [],
    abilities = [],
    stats = [],
    moves = [],
  } = pokemon;

  const visibleMoves = moves.slice(0, MAX_MOVES_SHOWN);
  const remainingMoves = moves.length - visibleMoves.length;

  return (
    <article className={`${styles.detail} animate-fade-in`}>
      <Link to="/pokemon" className={styles.backLink}>
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M15 6l-6 6 6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Volver a la Pokédex
      </Link>

      <div className={styles.layout}>
        <div className={`${styles.imageWrapper} animate-scale-in`}>
          {id && <span className={styles.idBadge}>#{String(id).padStart(3, '0')}</span>}
          <img src={sprite} alt={name} className={styles.image} />
        </div>

        <div className={styles.panel}>
          <div className={`${styles.headingRow} animate-slide-up`}>
            <h1 className={styles.name}>{capitalize(name)}</h1>
            <div className={styles.badgeRow}>
              {types.map((type, index) => (
                <span
                  key={type}
                  className={`${styles.typeBadge} animate-scale-in`}
                  style={{
                    '--type-color': POKEMON_CREATURE_TYPE_COLORS[type] || 'var(--color-secondary)',
                    animationDelay: `${0.15 + index * 0.06}s`,
                  }}
                >
                  {type}
                </span>
              ))}
            </div>
          </div>

          <dl className={`${styles.metaList} animate-slide-up`} style={{ animationDelay: '0.1s' }}>
            {typeof height === 'number' && (
              <div className={styles.metaItem}>
                <dt>Altura</dt>
                <dd>{(height / 10).toFixed(1)} m</dd>
              </div>
            )}
            {typeof weight === 'number' && (
              <div className={styles.metaItem}>
                <dt>Peso</dt>
                <dd>{(weight / 10).toFixed(1)} kg</dd>
              </div>
            )}
            {typeof baseExperience === 'number' && (
              <div className={styles.metaItem}>
                <dt>Experiencia base</dt>
                <dd>{baseExperience}</dd>
              </div>
            )}
          </dl>

          {stats.length > 0 && (
            <div className={`${styles.section} animate-slide-up`} style={{ animationDelay: '0.16s' }}>
              <h2 className={styles.sectionTitle}>Estadísticas</h2>
              <div className={styles.statsList}>
                {stats.map((stat, index) => (
                  <div key={stat.name} className={styles.statRow}>
                    <span className={styles.statLabel}>{STAT_LABELS[stat.name] || stat.name}</span>
                    <div className={styles.statBarTrack}>
                      <div
                        className={styles.statBarFill}
                        style={{
                          width: barsReady ? `${Math.min(100, (stat.baseStat / 255) * 100)}%` : '0%',
                          transitionDelay: `${0.2 + index * 0.08}s`,
                        }}
                      />
                    </div>
                    <span className={styles.statValue}>{stat.baseStat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {abilities.length > 0 && (
            <div className={`${styles.section} animate-slide-up`} style={{ animationDelay: '0.22s' }}>
              <h2 className={styles.sectionTitle}>Habilidades</h2>
              <div className={styles.pillList}>
                {abilities.map((ability) => (
                  <span key={ability.name} className={styles.pill}>
                    {ability.name.replace(/-/g, ' ')}
                    {ability.isHidden && <span className={styles.hiddenTag}>oculta</span>}
                  </span>
                ))}
              </div>
            </div>
          )}

          {moves.length > 0 && (
            <div className={`${styles.section} animate-slide-up`} style={{ animationDelay: '0.28s' }}>
              <h2 className={styles.sectionTitle}>Movimientos</h2>
              <div className={styles.pillList}>
                {visibleMoves.map((move) => (
                  <span key={move} className={styles.pillMuted}>
                    {move.replace(/-/g, ' ')}
                  </span>
                ))}
                {remainingMoves > 0 && (
                  <span className={styles.pillMuted}>+{remainingMoves} más</span>
                )}
              </div>
            </div>
          )}

          <div className={`${styles.actions} animate-slide-up`} style={{ animationDelay: '0.34s' }}>
            <Link to="/pokemon" className={styles.secondaryAction}>
              Ver más Pokémon
            </Link>
            <Link to="/" className={styles.primaryAction}>
              Buscar otro Pokémon
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PokemonDetail;
