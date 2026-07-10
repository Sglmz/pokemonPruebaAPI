import Modal from '../ui/Modal';
import styles from './SearchModeModal.module.css';

const SearchModeModal = ({ isOpen, onClose, pendingTerm, onChooseMode }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="¿Qué quieres buscar?">
    <div className={styles.options}>
      <button
        type="button"
        onClick={() => onChooseMode('cards')}
        className={`${styles.option} animate-slide-up`}
        style={{ animationDelay: '0.05s' }}
      >
        <span className={styles.icon} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <rect x="3" y="4" width="18" height="16" rx="2.5" stroke="currentColor" strokeWidth="2" />
            <path d="M3 9h18" stroke="currentColor" strokeWidth="2" />
          </svg>
        </span>
        <span className={styles.text}>
          <strong>Cartas</strong>
          <span>Buscar “{pendingTerm}” entre las cartas del TCG</span>
        </span>
        <svg className={styles.arrow} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <button
        type="button"
        onClick={() => onChooseMode('pokemon')}
        className={`${styles.option} animate-slide-up`}
        style={{ animationDelay: '0.12s' }}
      >
        <span className={styles.icon} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
            <path d="M3 12h18" stroke="currentColor" strokeWidth="2" />
            <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="2" />
          </svg>
        </span>
        <span className={styles.text}>
          <strong>Pokémon</strong>
          <span>Buscar “{pendingTerm}” en la Pokédex</span>
        </span>
        <svg className={styles.arrow} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  </Modal>
);

export default SearchModeModal;
