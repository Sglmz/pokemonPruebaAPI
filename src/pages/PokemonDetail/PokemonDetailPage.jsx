import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PokemonDetail from '../../components/pokemon/PokemonDetail';
import Loader from '../../components/ui/Loader';
import ErrorMessage from '../../components/ui/ErrorMessage';
import EmptyState from '../../components/ui/EmptyState';
import { usePokemonDetail } from '../../hooks/usePokemonDetail';
import styles from './PokemonDetailPage.module.css';

const PokemonDetailPage = () => {
  const { idOrName } = useParams();
  const { pokemon, status, error, fetchPokemon } = usePokemonDetail();

  useEffect(() => {
    fetchPokemon(idOrName);
  }, [idOrName]);

  return (
    <div className={`container ${styles.page}`}>
      {status === 'loading' && <Loader />}
      {status === 'error' && <ErrorMessage message={error} onRetry={() => fetchPokemon(idOrName)} />}
      {status === 'empty' && (
        <EmptyState title="No encontramos ese Pokémon" message="Revisa el nombre o el número e inténtalo de nuevo." />
      )}
      {status === 'idle' && <EmptyState title="Todavía no hay nada aquí" message="Dale un momento al Pokémon para cargar." />}
      {status === 'success' && pokemon && <PokemonDetail pokemon={pokemon} />}
    </div>
  );
};

export default PokemonDetailPage;
