import { useRef, useState } from 'react';
import { searchPokemon } from '../services/pokeapi.service';
import { DEFAULT_PAGE_SIZE, STATUS } from '../utils/constants';

export const usePokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [error, setError] = useState(null);
  const requestId = useRef(0);

  const fetchPokemon = async (filters = {}, targetPage = 1) => {
    const currentRequest = ++requestId.current;
    setStatus(STATUS.LOADING);
    setError(null);

    try {
      const result = await searchPokemon({
        ...filters,
        page: targetPage,
        pageSize: DEFAULT_PAGE_SIZE,
      });
      if (currentRequest !== requestId.current) return;

      setPokemonList(result.data);
      setTotalCount(result.totalCount);
      setPage(result.page);
      setStatus(result.data.length > 0 ? STATUS.SUCCESS : STATUS.EMPTY);
    } catch (err) {
      if (currentRequest !== requestId.current) return;

      setPokemonList([]);
      setTotalCount(0);
      setError(err.message);
      setStatus(STATUS.ERROR);
    }
  };

  return { pokemonList, page, totalCount, status, error, fetchPokemon };
};
