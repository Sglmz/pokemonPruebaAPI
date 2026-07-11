import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PokemonDetail from '../../components/pokemon/PokemonDetail';
import EvolutionChain from '../../components/pokemon/EvolutionChain';
import Loader from '../../components/ui/Loader';
import ErrorMessage from '../../components/ui/ErrorMessage';
import EmptyState from '../../components/ui/EmptyState';
import { usePokemonDetail } from '../../hooks/usePokemonDetail';
import { useEvolutionChain } from '../../hooks/useEvolutionChain';
import styles from './PokemonDetailPage.module.css';

const PokemonDetailPage = () => {
  const { idOrName } = useParams();
  const { pokemon, status, error, fetchPokemon } = usePokemonDetail();
  const { stages: evolutionStages, status: evolutionStatus, fetchEvolutionChain } = useEvolutionChain();

  useEffect(() => {
    fetchPokemon(idOrName);
  }, [idOrName]);

  useEffect(() => {
    if (pokemon?.id) fetchEvolutionChain(pokemon.id);
  }, [pokemon?.id]);

  return (
    <div className={`container ${styles.page}`}>
      {status === 'loading' && <Loader />}
      {status === 'error' && <ErrorMessage message={error} onRetry={() => fetchPokemon(idOrName)} />}
      {status === 'empty' && (
        <EmptyState title="No encontramos ese Pokémon" message="Revisa el nombre o el número e inténtalo de nuevo." />
      )}
      {status === 'idle' && <EmptyState title="Todavía no hay nada aquí" message="Dale un momento al Pokémon para cargar." />}

      {status === 'success' && pokemon && (
        <>
          <PokemonDetail pokemon={pokemon} />

          {evolutionStatus === 'success' && (
            <section className={`${styles.evolutionSection} animate-fade-in`}>
              <div className="section-heading">
                <span className="section-eyebrow">Línea evolutiva</span>
                <h2 className="section-title">Evoluciones</h2>
              </div>
              <EvolutionChain stages={evolutionStages} activeId={pokemon.id} />
            </section>
          )}
        </>
      )}
    </div>
  );
};

export default PokemonDetailPage;
