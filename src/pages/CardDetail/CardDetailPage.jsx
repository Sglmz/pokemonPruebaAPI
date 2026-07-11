import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CardDetail from '../../components/cards/CardDetail';
import CardGrid from '../../components/cards/CardGrid';
import EvolutionChain from '../../components/pokemon/EvolutionChain';
import Loader from '../../components/ui/Loader';
import ErrorMessage from '../../components/ui/ErrorMessage';
import EmptyState from '../../components/ui/EmptyState';
import { useCardDetail } from '../../hooks/useCardDetail';
import { useRelatedCards } from '../../hooks/useRelatedCards';
import { useEvolutionChain } from '../../hooks/useEvolutionChain';
import styles from './CardDetailPage.module.css';

const CardDetailPage = () => {
  const { id } = useParams();
  const { card, status, error, fetchCard } = useCardDetail();
  const { cards: relatedCards, status: relatedStatus, fetchRelated } = useRelatedCards();
  const { stages: evolutionStages, status: evolutionStatus, fetchEvolutionChain } = useEvolutionChain();
  const dexNumber = card?.nationalPokedexNumbers?.[0];

  useEffect(() => {
    fetchCard(id);
  }, [id]);

  useEffect(() => {
    if (card?.set?.id) {
      fetchRelated(card.set.id, card.id);
    }
  }, [card?.set?.id, card?.id]);

  useEffect(() => {
    if (dexNumber) fetchEvolutionChain(dexNumber);
  }, [dexNumber]);

  return (
    <div className={`container ${styles.page}`}>
      {status === 'loading' && <Loader />}
      {status === 'error' && <ErrorMessage message={error} onRetry={() => fetchCard(id)} />}
      {status === 'empty' && (
        <EmptyState title="No encontramos esta carta" message="Puede que ya no exista o que el enlace esté mal escrito." />
      )}
      {status === 'idle' && <EmptyState title="Todavía no hay nada aquí" message="Dale un momento a la carta para cargar." />}

      {status === 'success' && card && (
        <>
          <CardDetail card={card} />

          {evolutionStatus === 'success' && (
            <section className={`${styles.relatedSection} animate-fade-in`}>
              <div className="section-heading">
                <span className="section-eyebrow">Línea evolutiva</span>
                <h2 className="section-title">Evoluciones</h2>
              </div>
              <EvolutionChain stages={evolutionStages} activeId={dexNumber} />
            </section>
          )}

          {relatedStatus === 'success' && relatedCards.length > 0 && (
            <section className={`${styles.relatedSection} animate-fade-in`}>
              <div className="section-heading">
                <span className="section-eyebrow">Del mismo set</span>
                <h2 className="section-title">Más cartas de {card.set?.name}</h2>
              </div>
              <CardGrid cards={relatedCards} status={relatedStatus} />
            </section>
          )}
        </>
      )}
    </div>
  );
};

export default CardDetailPage;
