import { httpGet } from './httpClient';
import { withCache } from '../utils/requestCache';
import { DEFAULT_PAGE_SIZE } from '../utils/constants';

const TCG_BASE_URL = 'https://api.pokemontcg.io/v2';
const API_KEY = import.meta.env.VITE_POKEMON_API_KEY;

const authHeaders = API_KEY ? { 'X-Api-Key': API_KEY } : {};

const sanitizeTerm = (value) => value.replace(/"/g, '');

const buildCardsQuery = ({ term, name, set, setId, type }) => {
  const clauses = [];

  if (term) {
    const safeTerm = sanitizeTerm(term);
    clauses.push(`(name:"${safeTerm}*" OR set.name:"${safeTerm}*")`);
  }
  if (name) clauses.push(`name:"${sanitizeTerm(name)}*"`);
  if (set) clauses.push(`set.name:"${sanitizeTerm(set)}*"`);
  if (setId) clauses.push(`set.id:${sanitizeTerm(setId)}`);
  if (type) clauses.push(`types:${sanitizeTerm(type)}`);

  return clauses.join(' ');
};

const fetchCards = ({ q, page, pageSize }) =>
  withCache(`cards:${q || ''}:${page}:${pageSize}`, async () => {
    const result = await httpGet(
      TCG_BASE_URL,
      '/cards',
      { q: q || undefined, page, pageSize, orderBy: 'name' },
      authHeaders,
    );
    return {
      data: result?.data || [],
      page: result?.page || page,
      pageSize: result?.pageSize || pageSize,
      totalCount: result?.totalCount || 0,
    };
  });

export const searchCards = async (filters = {}) => {
  const { term, type, page = 1, pageSize = DEFAULT_PAGE_SIZE } = filters;
  const q = buildCardsQuery({ term, type });
  return fetchCards({ q, page, pageSize });
};

export const getAllCards = async ({ page = 1, pageSize = DEFAULT_PAGE_SIZE } = {}) => {
  return fetchCards({ q: '', page, pageSize });
};

export const getCardById = (id) =>
  withCache(`card:${id}`, async () => {
    const result = await httpGet(TCG_BASE_URL, `/cards/${encodeURIComponent(id)}`, {}, authHeaders);
    return result?.data;
  });

const RANDOM_POOL_SIZE = 50;
const RANDOM_PAGE_RANGE = 400;

export const getRandomCard = async () => {
  const randomPage = Math.floor(Math.random() * RANDOM_PAGE_RANGE) + 1;
  const result = await fetchCards({ q: '', page: randomPage, pageSize: RANDOM_POOL_SIZE });
  if (!result.data.length) return null;
  return result.data[Math.floor(Math.random() * result.data.length)];
};

export const getCardsBySet = async ({ setId, pageSize = 7 }) => {
  if (!setId) return [];
  const q = buildCardsQuery({ setId });
  const result = await fetchCards({ q, page: 1, pageSize });
  return result.data;
};

export const getSets = () =>
  withCache('sets', async () => {
    const result = await httpGet(TCG_BASE_URL, '/sets', { orderBy: 'name', pageSize: 250 }, authHeaders);
    return result?.data || [];
  });

export const getTypes = () =>
  withCache('card-types', async () => {
    const result = await httpGet(TCG_BASE_URL, '/types', {}, authHeaders);
    return result?.data || [];
  });
