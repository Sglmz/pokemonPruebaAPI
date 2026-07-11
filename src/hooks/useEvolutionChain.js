import { useState } from 'react';
import { getEvolutionChain } from '../services/pokeapi.service';
import { STATUS } from '../utils/constants';

export const useEvolutionChain = () => {
  const [stages, setStages] = useState([]);
  const [status, setStatus] = useState(STATUS.IDLE);

  const fetchEvolutionChain = async (idOrName) => {
    if (!idOrName) return;

    setStatus(STATUS.LOADING);

    try {
      const result = await getEvolutionChain(idOrName);
      setStages(result);
      setStatus(result.length > 1 ? STATUS.SUCCESS : STATUS.EMPTY);
    } catch {
      setStages([]);
      setStatus(STATUS.ERROR);
    }
  };

  return { stages, status, fetchEvolutionChain };
};
