import { useRef, useState } from 'react';
import { searchCards } from '../services/pokemon.service';
import { DEFAULT_PAGE_SIZE, STATUS } from '../utils/constants';

export const useCards = () => {
  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [error, setError] = useState(null);
  const requestId = useRef(0);

  const fetchCards = async (filters = {}, targetPage = 1) => {
    const currentRequest = ++requestId.current;
    setStatus(STATUS.LOADING);
    setError(null);

    try {
      const result = await searchCards({ ...filters, page: targetPage, pageSize: DEFAULT_PAGE_SIZE });
      if (currentRequest !== requestId.current) return;

      setCards(result.data);
      setTotalCount(result.totalCount);
      setPage(result.page);
      setStatus(result.data.length > 0 ? STATUS.SUCCESS : STATUS.EMPTY);
    } catch (err) {
      if (currentRequest !== requestId.current) return;

      setCards([]);
      setTotalCount(0);
      setError(err.message);
      setStatus(STATUS.ERROR);
    }
  };

  return { cards, page, totalCount, status, error, fetchCards };
};
