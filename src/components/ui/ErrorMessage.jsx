import styles from './ErrorMessage.module.css';

const ErrorMessage = ({
  title = 'Algo salió mal',
  message = 'No pudimos completar tu solicitud, intenta de nuevo en un momento.',
  onRetry,
}) => {
  return (
    <div className={`${styles.errorBox} animate-scale-in`} role="alert">
      <span className={styles.icon} aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none">
          <path
            d="M12 9v4M12 16.5h.01M10.3 3.9 2.6 17a1.8 1.8 0 0 0 1.5 2.7h15.8a1.8 1.8 0 0 0 1.5-2.7L13.7 3.9a1.8 1.8 0 0 0-3.4 0Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <p className={styles.title}>{title}</p>
      <p className={styles.message}>{message}</p>
      {onRetry && (
        <button type="button" className={styles.retryButton} onClick={onRetry}>
          Intentar de nuevo
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
