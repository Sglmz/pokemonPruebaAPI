import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCardById, getRandomCard } from '../../services/pokemon.service';
import { useSearchModeChoice } from '../../hooks/useSearchModeChoice';
import styles from './Hero.module.css';
import SearchBar from '../search/SearchBar';
import SearchModeModal from '../search/SearchModeModal';

const FEATURED_CARD_ID = 'base1-4';

const Hero = () => {
  const [featuredCard, setFeaturedCard] = useState(null);
  const [isRandomizing, setIsRandomizing] = useState(false);
  const navigate = useNavigate();
  const modeChoice = useSearchModeChoice(navigate);

  useEffect(() => {
    let cancelled = false;

    getCardById(FEATURED_CARD_ID)
      .then((card) => {
        if (!cancelled) setFeaturedCard(card);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  const handleRandomize = async () => {
    setIsRandomizing(true);

    try {
      const card = await getRandomCard();
      if (card) setFeaturedCard(card);
    } catch {
      // Si falla, se queda la carta que ya estaba mostrando.
    } finally {
      setIsRandomizing(false);
    }
  };

  return (
    <section className={styles.hero}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.textColumn}>
          <span className={`${styles.badge} animate-fade-in`}>Cartas TCG & Pokédex</span>

          <h1 className={`${styles.title} animate-slide-up`}>
            Tu rincón para las
            <span className={styles.highlight}> cartas y los Pokémon</span> que amas
          </h1>

          <p className={`${styles.subtitle} animate-slide-up`}>
            Escribe un nombre, un tipo o hasta un código, y listo, un solo buscador te lleva
            directo a la carta o el Pokémon que buscas, con imágenes, estadísticas y todos los
            detalles.
          </p>

          <div className={`${styles.searchWrapper} animate-slide-up`}>
            <SearchBar
              placeholder="Busca por nombre, tipo o código..."
              onRequireMode={modeChoice.handleRequireMode}
            />
          </div>

          <div className={`${styles.actions} animate-slide-up`}>
            <Link to="/cards" className={styles.primaryCta}>
              Ver todas las cartas
            </Link>
            <Link to="/pokemon" className={styles.pokemonCta}>
              Explorar Pokédex
            </Link>
          </div>
        </div>

        {featuredCard && (
          <div className={`${styles.imageColumn} animate-scale-in`}>
            <div className={styles.imageStage}>
              <div className={styles.imageGlow} aria-hidden="true" />
              <img
                key={featuredCard.id}
                src={featuredCard.images?.large || featuredCard.images?.small}
                alt={featuredCard.name || ''}
                className={`${styles.featuredImage} animate-scale-in`}
              />
            </div>

            <button
              type="button"
              onClick={handleRandomize}
              disabled={isRandomizing}
              className={styles.randomizeButton}
            >
              <svg
                className={isRandomizing ? `${styles.randomizeIcon} ${styles.spinning}` : styles.randomizeIcon}
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M17 3l4 4-4 4M3 17l4 4 4-4M21 7H8.5A5.5 5.5 0 0 0 5.6 16.8M3 17H15.5a5.5 5.5 0 0 0 2.9-9.8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {isRandomizing ? 'Buscando otra carta...' : 'Randomizar carta'}
            </button>
          </div>
        )}

      </div>

      <SearchModeModal
        isOpen={modeChoice.isModalOpen}
        onClose={modeChoice.closeModal}
        pendingTerm={modeChoice.pendingTerm}
        onChooseMode={modeChoice.chooseMode}
      />
    </section>
  );
};

export default Hero;
