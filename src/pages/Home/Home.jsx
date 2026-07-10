import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Hero from '../../components/layout/Hero';
import CardGrid from '../../components/cards/CardGrid';
import PokemonGrid from '../../components/pokemon/PokemonGrid';
import TypeIcon from '../../components/ui/TypeIcon';
import Modal from '../../components/ui/Modal';
import { useCards } from '../../hooks/useCards';
import { usePokemonList } from '../../hooks/usePokemonList';
import { TYPE_ACCENT_COLORS, POKEMON_CREATURE_TYPE_COLORS } from '../../utils/constants';
import styles from './Home.module.css';

const FEATURED_PAGE_SIZE = 6;

const TYPE_TILES = [
  { type: 'Fire', pokeapiType: 'fire', label: 'Fuego' },
  { type: 'Water', pokeapiType: 'water', label: 'Agua' },
  { type: 'Grass', pokeapiType: 'grass', label: 'Planta' },
  { type: 'Lightning', pokeapiType: 'electric', label: 'Eléctrico' },
  { type: 'Psychic', pokeapiType: 'psychic', label: 'Psíquico' },
  { type: 'Fighting', pokeapiType: 'fighting', label: 'Lucha' },
  { type: 'Darkness', pokeapiType: 'dark', label: 'Siniestro' },
  { type: 'Dragon', pokeapiType: 'dragon', label: 'Dragón' },
];

const Home = () => {
  const { cards, status, fetchCards } = useCards();
  const { pokemonList, status: pokemonStatus, fetchPokemon } = usePokemonList();
  const [activeTile, setActiveTile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCards({}, 1);
    fetchPokemon({}, 1);
  }, []);

  const openTypeModal = (tile) => {
    setActiveTile(tile);
    setIsModalOpen(true);
  };

  const closeTypeModal = () => setIsModalOpen(false);

  const goToCardsOfType = () => {
    navigate(`/cards?type=${activeTile.type}`);
    closeTypeModal();
  };

  const goToPokemonOfType = () => {
    navigate(`/pokemon?type=${activeTile.pokeapiType}`);
    closeTypeModal();
  };

  return (
    <div>
      <Hero />

      <section className="section">
        <div className="container">
          <div className="section-heading animate-slide-up">
            <span className="section-eyebrow">Por tipo</span>
            <h2 className="section-title">¿Cuál es tu tipo favorito?</h2>
            <p className="section-subtitle">
              Elige un tipo y te mostramos las cartas o los Pokémon que le pertenecen.
            </p>
          </div>

          <div className={styles.typeGrid}>
            {TYPE_TILES.map((tile, index) => (
              <button
                key={tile.type}
                type="button"
                onClick={() => openTypeModal(tile)}
                className={`${styles.typeTile} animate-slide-up`}
                style={{
                  '--tile-accent': TYPE_ACCENT_COLORS[tile.type],
                  animationDelay: `${index * 0.05}s`,
                }}
              >
                <span className={styles.typeIcon} aria-hidden="true">
                  <TypeIcon type={tile.type} />
                </span>
                <span className={styles.typeLabel}>{tile.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.featuredHeading}>
            <div className="section-heading animate-slide-up" style={{ marginBottom: 0 }}>
              <span className="section-eyebrow">Recién agregadas</span>
              <h2 className="section-title">Cartas destacadas</h2>
              <p className="section-subtitle">Un vistazo rápido a lo que tenemos en el catálogo.</p>
            </div>
            <Link to="/cards" className={styles.viewAllLink}>
              Ver todas las cartas
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M9 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>

          <CardGrid cards={cards.slice(0, FEATURED_PAGE_SIZE)} status={status} />
        </div>
      </section>

      <section className={`section ${styles.pokemonSection}`}>
        <div className="container">
          <div className={styles.featuredHeading}>
            <div className="section-heading animate-slide-up" style={{ marginBottom: 0 }}>
              <span className="section-eyebrow">Pokédex</span>
              <h2 className="section-title">Pokémon destacados</h2>
              <p className="section-subtitle">Un vistazo rápido a la Pokédex completa.</p>
            </div>
            <Link to="/pokemon" className={styles.viewAllLink}>
              Ver todos los Pokémon
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M9 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>

          <PokemonGrid pokemonList={pokemonList.slice(0, FEATURED_PAGE_SIZE)} status={pokemonStatus} />
        </div>
      </section>

      <section className={styles.banner}>
        <div className={`container ${styles.bannerInner}`}>
          <div className="animate-slide-up">
            <h2 className={styles.bannerTitle}>¿Listo para explorar todo el universo Pokémon?</h2>
            <p className={styles.bannerSubtitle}>
              Cartas del TCG y la Pokédex completa, en un mismo lugar.
            </p>
          </div>
          <div className={`${styles.bannerActions} animate-slide-up`} style={{ animationDelay: '0.1s' }}>
            <Link to="/cards" className={styles.bannerCta}>
              Ver cartas
            </Link>
            <Link to="/pokemon" className={styles.bannerCtaSecondary}>
              Ver Pokédex
            </Link>
          </div>
        </div>
      </section>

      <Modal
        isOpen={isModalOpen}
        onClose={closeTypeModal}
        title={activeTile ? `¿Qué quieres ver de tipo ${activeTile.label.toLowerCase()}?` : ''}
      >
        {activeTile && (
          <div className={styles.typeModalOptions}>
            <button
              type="button"
              onClick={goToCardsOfType}
              className={`${styles.typeModalOption} animate-slide-up`}
              style={{ '--option-accent': TYPE_ACCENT_COLORS[activeTile.type], animationDelay: '0.05s' }}
            >
              <span className={styles.typeModalIcon} aria-hidden="true">
                <TypeIcon type={activeTile.type} />
              </span>
              <span className={styles.typeModalText}>
                <strong>Cartas</strong>
                <span>Cartas del TCG de tipo {activeTile.label.toLowerCase()}</span>
              </span>
              <svg className={styles.typeModalArrow} viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M9 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button
              type="button"
              onClick={goToPokemonOfType}
              className={`${styles.typeModalOption} animate-slide-up`}
              style={{
                '--option-accent': POKEMON_CREATURE_TYPE_COLORS[activeTile.pokeapiType],
                animationDelay: '0.12s',
              }}
            >
              <span className={styles.typeModalIcon} aria-hidden="true">
                <TypeIcon type={activeTile.type} />
              </span>
              <span className={styles.typeModalText}>
                <strong>Pokémon</strong>
                <span>Pokémon de tipo {activeTile.label.toLowerCase()}</span>
              </span>
              <svg className={styles.typeModalArrow} viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M9 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Home;
