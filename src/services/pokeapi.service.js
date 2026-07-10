import { httpGet } from './httpClient';
import { withCache } from '../utils/requestCache';
import { DEFAULT_PAGE_SIZE } from '../utils/constants';

const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';
const SPRITE_BASE_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';

const extractIdFromUrl = (url) => {
  const match = url.match(/\/(\d+)\/?$/);
  return match ? Number(match[1]) : null;
};

const buildSpriteUrl = (id) => (id ? `${SPRITE_BASE_URL}/${id}.png` : null);

let pokemonNameCache = null;

const loadPokemonNameCache = async () => {
  if (pokemonNameCache) return pokemonNameCache;

  const data = await httpGet(POKEAPI_BASE_URL, '/pokemon', { limit: 100000, offset: 0 });
  pokemonNameCache = data.results.map((item) => ({
    id: extractIdFromUrl(item.url),
    name: item.name,
  }));

  return pokemonNameCache;
};

const normalizeListResponse = (result, page, pageSize) => ({
  data: result?.results || [],
  page,
  pageSize,
  totalCount: result?.count || 0,
});

const fetchPokemonList = ({ limit, offset }) =>
  withCache(`pokemon-list:${limit}:${offset}`, async () => {
    const data = await httpGet(POKEAPI_BASE_URL, '/pokemon', { limit, offset });
    return {
      count: data.count,
      results: data.results.map((item) => {
        const id = extractIdFromUrl(item.url);
        return { id, name: item.name, sprite: buildSpriteUrl(id) };
      }),
    };
  });

const fetchPokemonByType = (type, { limit, offset }) =>
  withCache(`pokemon-type:${type}:${limit}:${offset}`, async () => {
    const data = await httpGet(POKEAPI_BASE_URL, `/type/${encodeURIComponent(type.toLowerCase())}`, {});
    const allPokemon = data.pokemon.map((entry) => {
      const id = extractIdFromUrl(entry.pokemon.url);
      return { id, name: entry.pokemon.name, sprite: buildSpriteUrl(id) };
    });

    return {
      count: allPokemon.length,
      results: allPokemon.slice(offset, offset + limit),
    };
  });

const searchPokemonByName = async (term, { limit, offset }) => {
  const query = term.trim().toLowerCase();
  if (!query) return { count: 0, results: [] };

  const allNames = await loadPokemonNameCache();
  const matches = allNames.filter((pokemon) => pokemon.name.includes(query));
  const page = matches.slice(offset, offset + limit);

  return {
    count: matches.length,
    results: page.map((pokemon) => ({ ...pokemon, sprite: buildSpriteUrl(pokemon.id) })),
  };
};

export const searchPokemon = async (filters = {}) => {
  const { term, type, page = 1, pageSize = DEFAULT_PAGE_SIZE } = filters;
  const offset = (page - 1) * pageSize;

  if (type) {
    const result = await fetchPokemonByType(type, { limit: pageSize, offset });
    return normalizeListResponse(result, page, pageSize);
  }

  if (term) {
    const result = await searchPokemonByName(term, { limit: pageSize, offset });
    return normalizeListResponse(result, page, pageSize);
  }

  const result = await fetchPokemonList({ limit: pageSize, offset });
  return normalizeListResponse(result, page, pageSize);
};

export const getPokemonDetail = (idOrName) =>
  withCache(`pokemon-detail:${String(idOrName).toLowerCase()}`, async () => {
    const data = await httpGet(
      POKEAPI_BASE_URL,
      `/pokemon/${encodeURIComponent(String(idOrName).toLowerCase())}`,
      {},
    );

    return {
      id: data.id,
      name: data.name,
      height: data.height,
      weight: data.weight,
      baseExperience: data.base_experience,
      sprite: data.sprites?.other?.['official-artwork']?.front_default || data.sprites?.front_default,
      types: data.types.map((entry) => entry.type.name),
      abilities: data.abilities.map((entry) => ({
        name: entry.ability.name,
        isHidden: entry.is_hidden,
      })),
      stats: data.stats.map((entry) => ({ name: entry.stat.name, baseStat: entry.base_stat })),
      moves: data.moves.map((entry) => entry.move.name),
    };
  });

export const getPokemonTypes = () =>
  withCache('pokemon-types', async () => {
    const result = await httpGet(POKEAPI_BASE_URL, '/type', {});
    return (result?.results || []).map((entry) => ({ name: entry.name }));
  });
