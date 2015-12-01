import {loggers} from 'winston';

const CACHE_KEY_PREFIX = 'node-vpcom';

export function createCacheWriter(cache, lifetime=86400) {
  return (key, data) => cacheResponse(cache, key, data, lifetime);
}

function cacheResponse(cache, key, data, lifetime=86400) {
  return new Promise((resolve, reject) => {
    cache.set(`${CACHE_KEY_PREFIX}:${key}`, data, lifetime, (err, result) => {
      if (err) {
        reject(err);
      } else {
        console.log(`wrote ${CACHE_KEY_PREFIX}:${key}`);
        resolve(result);
      }
    });
  });
}

export function responseCache(app) {
  const { memcached } = app.locals;
  const errorLog = loggers.get('error');
  const remoteLog = loggers.get('remote');

  return (req, res, next) => {

    const debugData = {
      host: memcached.servers,
      key: `${CACHE_KEY_PREFIX}:${req.originalUrl}`
    };

    remoteLog.debug('get cached response', debugData);

    memcached.get(`${CACHE_KEY_PREFIX}:${req.originalUrl}`, (err, result) => {
      if (err) {
        errorLog.error('memcached', err.message);
        remoteLog.error('cache lookup error', {
          ...debugData,
          error: err
        });
        next();
      } else if (result) {
        remoteLog.debug('found cached response', {
          ...debugData,
          response: JSON.parse(result)
        });
        res.send(JSON.parse(result));
      } else {
        remoteLog.debug('no cached response for key', debugData);
        next();
      }
    });

  };
}
