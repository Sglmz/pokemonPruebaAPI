const cache = new Map();

export const withCache = (key, fetcher) => {
  if (cache.has(key)) return cache.get(key);

  const promise = fetcher().catch((error) => {
    cache.delete(key);
    throw error;
  });

  cache.set(key, promise);
  return promise;
};
