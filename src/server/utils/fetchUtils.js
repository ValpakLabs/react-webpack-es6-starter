export async function handleResponse(res, cacheResponseFn) {
  if (res.status === 404)
    throw new errors.NotFoundError(res.statusText, res.url);
  const json = await res.json();
  cacheResponseFn(res.url, JSON.stringify(json));
  return json;
}
