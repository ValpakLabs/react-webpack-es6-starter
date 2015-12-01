export async function handleResponse(originalUrl, res, cacheResponseFn) {
  if (res.status === 404)
    throw new errors.NotFoundError(res.statusText, res.url);
  const json = await res.json();

  if (typeof cacheResponseFn === 'function') {
    cacheResponseFn(originalUrl, JSON.stringify(json));
  }

  return json;
}
