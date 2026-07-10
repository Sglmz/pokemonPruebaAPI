import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCardById } from '../../services/pokemon.service';
import { useSearchModeChoice } from '../../hooks/useSearchModeChoice';
import styles from './Hero.module.css';
import SearchBar from '../search/SearchBar';
import SearchModeModal from '../search/SearchModeModal';

const FEATURED_CARD_ID = 'base1-4';

const Hero = () => {
  const [featuredCard, setFeaturedCard] = useState(null);
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
          <div className={`${styles.imageColumn} animate-scale-in`} aria-hidden="true">
            <div className={styles.imageGlow} />
            <img
              src={featuredCard.images?.large || featuredCard.images?.small}
              alt=""
              className={styles.featuredImage}
            />
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
