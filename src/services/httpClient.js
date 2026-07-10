class HttpError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
  }
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const httpGet = async (baseUrl, endpoint, params = {}, headers = {}) => {
  const url = new URL(`${baseUrl}${endpoint}`);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, value);
    }
  });

  let response;
  try {
    response = await fetch(url, { headers });
  } catch {
    // Un fallo de red puntual contra una API externa no siempre significa que la
    // conexión esté caída, se reintenta una vez antes de mostrar el error.
    try {
      await wait(500);
      response = await fetch(url, { headers });
    } catch {
      throw new HttpError(
        'No logramos conectarnos con la API, verifica tu conexión e intenta de nuevo.',
        0,
      );
    }
  }

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    const message = body?.error?.message || body?.error || 'Algo salió mal al consultar la API, intenta de nuevo.';
    throw new HttpError(message, response.status);
  }

  return body;
};
