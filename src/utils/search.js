import { TYPE_ALIASES, POKEMON_CREATURE_TYPE_ALIASES } from './constants';

const ID_PATTERN = /^[a-z]+\d+-[a-z0-9]+$/i;
const NUMERIC_ID_PATTERN = /^\d+$/;

export const detectSearchIntent = (rawTerm) => {
  const term = (rawTerm || '').trim();

  if (!term) {
    return { kind: 'empty', value: '' };
  }

  if (ID_PATTERN.test(term)) {
    return { kind: 'id', value: term };
  }

  const typeMatch = TYPE_ALIASES[term.toLowerCase()];
  if (typeMatch) {
    return { kind: 'type', value: typeMatch };
  }

  return { kind: 'term', value: term };
};

export const detectPokemonSearchIntent = (rawTerm) => {
  const term = (rawTerm || '').trim();

  if (!term) {
    return { kind: 'empty', value: '' };
  }

  if (NUMERIC_ID_PATTERN.test(term)) {
    return { kind: 'id', value: term };
  }

  const typeMatch = POKEMON_CREATURE_TYPE_ALIASES[term.toLowerCase()];
  if (typeMatch) {
    return { kind: 'type', value: typeMatch };
  }

  return { kind: 'term', value: term.toLowerCase() };
};

export const SEARCH_MODE_CONFIG = {
  cards: { basePath: '/cards', detectIntent: detectSearchIntent },
  pokemon: { basePath: '/pokemon', detectIntent: detectPokemonSearchIntent },
};
