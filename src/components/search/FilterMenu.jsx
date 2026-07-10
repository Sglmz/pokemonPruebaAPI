import { useEffect, useRef, useState } from 'react';
import styles from './FilterMenu.module.css';

const FilterMenu = ({ options, activeValue, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const activeOption = options.find((option) => option.value === activeValue);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (value) => {
    onSelect(value === activeValue ? '' : value);
    setIsOpen(false);
  };

  const handleClear = (event) => {
    event.stopPropagation();
    onSelect('');
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <button
        type="button"
        className={activeOption ? `${styles.trigger} ${styles.triggerActive}` : styles.trigger}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
      >
        <svg className={styles.triggerIcon} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M4 6h16M7 12h10M10 18h4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        {activeOption ? (
          <>
            <span
              className={styles.triggerDot}
              style={{ backgroundColor: activeOption.color }}
              aria-hidden="true"
            />
            {activeOption.label}
            <span
              className={styles.clearButton}
              role="button"
              tabIndex={0}
              onClick={handleClear}
              onKeyDown={(event) => event.key === 'Enter' && handleClear(event)}
              aria-label="Quitar filtro de tipo"
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M6 6l12 12M18 6 6 18"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </>
        ) : (
          'Filtrar por tipo'
        )}
      </button>

      {isOpen && (
        <div className={`${styles.panel} animate-scale-in`} role="menu">
          <div className={styles.grid}>
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                role="menuitemradio"
                aria-checked={option.value === activeValue}
                className={
                  option.value === activeValue ? `${styles.chip} ${styles.chipActive}` : styles.chip
                }
                style={{ '--chip-color': option.color }}
                onClick={() => handleSelect(option.value)}
              >
                <span className={styles.chipDot} aria-hidden="true" />
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterMenu;
