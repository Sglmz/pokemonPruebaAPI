import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { SEARCH_MODE_CONFIG } from '../../utils/search';
import styles from './SearchBar.module.css';

const LIVE_SEARCH_DELAY_MS = 550;

const SearchBar = ({
  variant = 'default',
  placeholder = 'Busca por nombre, tipo o código...',
  initialValue = '',
  mode = 'cards',
  live = false,
  onRequireMode,
}) => {
  const [term, setTerm] = useState(initialValue);
  const navigate = useNavigate();
  const { basePath, detectIntent } = SEARCH_MODE_CONFIG[mode] || SEARCH_MODE_CONFIG.cards;
  const isFirstRender = useRef(true);
  const debounceRef = useRef(null);

  useEffect(() => {
    setTerm(initialValue);
  }, [initialValue]);

  const runSearch = (value, { replace = false } = {}) => {
    const intent = detectIntent(value);

    if (intent.kind === 'id') {
      navigate(`${basePath}/${encodeURIComponent(intent.value)}`, { replace });
      return;
    }

    if (intent.kind === 'type') {
      navigate(`${basePath}?type=${encodeURIComponent(intent.value)}`, { replace });
      return;
    }

    if (intent.kind === 'term') {
      navigate(`${basePath}?term=${encodeURIComponent(intent.value)}`, { replace });
      return;
    }

    navigate(basePath, { replace });
  };

  useEffect(() => {
    if (!live || onRequireMode) return undefined;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return undefined;
    }

    debounceRef.current = setTimeout(() => {
      runSearch(term, { replace: true });
    }, LIVE_SEARCH_DELAY_MS);

    return () => clearTimeout(debounceRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [term, live]);

  const handleSubmit = (event) => {
    event.preventDefault();
    clearTimeout(debounceRef.current);

    if (onRequireMode) {
      onRequireMode(term);
      return;
    }

    runSearch(term);
  };

  const formClassName =
    variant === 'compact' ? `${styles.form} ${styles.compact}` : styles.form;

  return (
    <form className={formClassName} onSubmit={handleSubmit} role="search">
      <svg
        className={styles.icon}
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
        <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <input
        type="text"
        name="term"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder={placeholder}
        className={styles.input}
        aria-label="Busca por nombre, tipo o código"
      />
      <button type="submit" className={styles.button}>
        Buscar
      </button>
    </form>
  );
};

export default SearchBar;
