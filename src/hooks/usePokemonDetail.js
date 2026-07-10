import { useState } from 'react';
import { getPokemonDetail } from '../services/pokeapi.service';
import { STATUS } from '../utils/constants';

export const usePokemonDetail = () => {
  const [pokemon, setPokemon] = useState(null);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [error, setError] = useState(null);

  const fetchPokemon = async (idOrName) => {
    if (!idOrName) return;

    setStatus(STATUS.LOADING);
    setError(null);

    try {
      const result = await getPokemonDetail(idOrName);
      setPokemon(result || null);
      setStatus(result ? STATUS.SUCCESS : STATUS.EMPTY);
    } catch (err) {
      setError(err.message);
      setStatus(err.status === 404 ? STATUS.EMPTY : STATUS.ERROR);
    }
  };

  return { pokemon, status, error, fetchPokemon };
};
