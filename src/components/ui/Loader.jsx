import styles from './Loader.module.css';

const Loader = ({ label = 'Un momento, ya casi...' }) => {
  return (
    <div className={`${styles.loader} animate-fade-in`} role="status" aria-live="polite">
      <span className={styles.spinner} />
      <span>{label}</span>
    </div>
  );
};

export default Loader;
