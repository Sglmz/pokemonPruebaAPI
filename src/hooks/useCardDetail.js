import { useState } from 'react';
import { getCardById } from '../services/pokemon.service';
import { STATUS } from '../utils/constants';

export const useCardDetail = () => {
  const [card, setCard] = useState(null);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [error, setError] = useState(null);

  const fetchCard = async (id) => {
    if (!id) return;

    setStatus(STATUS.LOADING);
    setError(null);

    try {
      const result = await getCardById(id);
      setCard(result || null);
      setStatus(result ? STATUS.SUCCESS : STATUS.EMPTY);
    } catch (err) {
      setError(err.message);
      setStatus(err.status === 404 ? STATUS.EMPTY : STATUS.ERROR);
    }
  };

  return { card, status, error, fetchCard };
};
