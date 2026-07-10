import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brandBlock}>
          <span className={styles.brand}>
            Pokémon <strong>TCG Explorer</strong>
          </span>
          <p className={styles.tagline}>
            Tu lugar para explorar cartas del TCG y conocer a cada Pokémon.
          </p>
        </div>

        <div className={styles.bottom}>
          <p className={styles.disclaimer}>
            © {new Date().getFullYear()}, hice este proyecto usando la Pokémon TCG API y PokéAPI,
            no tengo ninguna afiliación con Nintendo ni con The Pokémon Company, lo armé con mucho
            cariño para esta prueba técnica.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
