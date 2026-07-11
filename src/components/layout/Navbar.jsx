import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import SearchBar from '../search/SearchBar';
import SearchModeModal from '../search/SearchModeModal';
import ThemeToggle from '../ui/ThemeToggle';
import { useSearchModeChoice } from '../../hooks/useSearchModeChoice';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { to: '/', label: 'Inicio' },
  { to: '/cards', label: 'Cartas' },
  { to: '/pokemon', label: 'Pokémon' },
];

const Navbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isCardsPage = pathname.startsWith('/cards');
  const isPokemonPage = pathname.startsWith('/pokemon');
  const collapseSearch = isCardsPage || isPokemonPage;
  const searchMode = isPokemonPage ? 'pokemon' : 'cards';
  const searchPlaceholder = isPokemonPage
    ? 'Busca un Pokémon por nombre, tipo o código...'
    : 'Busca una carta por nombre, tipo o código...';
  const modeChoice = useSearchModeChoice(navigate);

  return (
    <header className={styles.navbar}>
      <div className={`container ${styles.inner}`}>
        <NavLink to="/" className={styles.brand}>
          <span className={styles.brandText}>
            Pokémon <strong>TCG</strong>
          </span>
        </NavLink>

        <div
          className={collapseSearch ? `${styles.searchSlot} ${styles.searchSlotCollapsed}` : styles.searchSlot}
          aria-hidden={collapseSearch}
          inert={collapseSearch}
        >
          {collapseSearch ? (
            <SearchBar variant="compact" mode={searchMode} placeholder={searchPlaceholder} />
          ) : (
            <SearchBar
              variant="compact"
              placeholder="Busca por nombre, tipo o código..."
              onRequireMode={modeChoice.handleRequireMode}
            />
          )}
        </div>

        <nav className={styles.nav} aria-label="Navegación principal">
          <ul className={styles.navList}>
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end
                  className={({ isActive }) =>
                    isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <ThemeToggle />
      </div>

      <SearchModeModal
        isOpen={modeChoice.isModalOpen}
        onClose={modeChoice.closeModal}
        pendingTerm={modeChoice.pendingTerm}
        onChooseMode={modeChoice.chooseMode}
      />
    </header>
  );
};

export default Navbar;
