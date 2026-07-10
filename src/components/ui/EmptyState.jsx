import styles from './EmptyState.module.css';

const EmptyState = ({
  title = 'No encontramos nada',
  message = 'Prueba con otro nombre, tipo o código.',
}) => {
  return (
    <div className={`${styles.emptyState} animate-scale-in`}>
      <span className={styles.icon} aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none">
          <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="1.8" />
          <path
            d="m20 20-4.3-4.3M8 10.5h5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <p className={styles.title}>{title}</p>
      <p className={styles.message}>{message}</p>
    </div>
  );
};

export default EmptyState;
