import { useState } from 'react';
import { getCardsBySet } from '../services/pokemon.service';
import { STATUS } from '../utils/constants';

const RELATED_CARDS_LIMIT = 6;

export const useRelatedCards = () => {
  const [cards, setCards] = useState([]);
  const [status, setStatus] = useState(STATUS.IDLE);

  const fetchRelated = async (setId, excludeId) => {
    if (!setId) return;

    setStatus(STATUS.LOADING);

    try {
      const result = await getCardsBySet({ setId, pageSize: RELATED_CARDS_LIMIT + 1 });
      const filtered = result.filter((card) => card.id !== excludeId).slice(0, RELATED_CARDS_LIMIT);
      setCards(filtered);
      setStatus(filtered.length > 0 ? STATUS.SUCCESS : STATUS.EMPTY);
    } catch {
      setStatus(STATUS.ERROR);
    }
  };

  return { cards, status, fetchRelated };
};
