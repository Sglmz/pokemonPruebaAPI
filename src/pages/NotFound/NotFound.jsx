import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <div className={`container ${styles.page}`}>
      <div className={`${styles.content} animate-scale-in`}>
        <span className={styles.icon} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
            <path
              d="M2 12h20M12 2c2.5 2.7 4 6.2 4 10s-1.5 7.3-4 10c-2.5-2.7-4-6.2-4-10s1.5-7.3 4-10Z"
              stroke="currentColor"
              strokeWidth="1.6"
            />
          </svg>
        </span>

        <span className={`${styles.code} animate-fade-in`} style={{ animationDelay: '0.1s' }}>
          404
        </span>
        <h1 className={`${styles.title} animate-slide-up`} style={{ animationDelay: '0.15s' }}>
          ¡Vaya, esto se nos escapó!
        </h1>
        <p className={`${styles.message} animate-slide-up`} style={{ animationDelay: '0.2s' }}>
          No encontramos esta página, puede que el enlace esté mal escrito o que ya no exista.
        </p>

        <div className={`${styles.actions} animate-slide-up`} style={{ animationDelay: '0.28s' }}>
          <Link to="/" className={styles.primaryAction}>
            Volver al inicio
          </Link>
          <Link to="/cards" className={styles.secondaryAction}>
            Ver todas las cartas
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
