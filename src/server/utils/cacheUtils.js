import winston from 'winston';

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
        resolve(result);
      }
    });
  });
}

export function responseCache(app) {
  const { memcached, logger } = app.locals;
  const errorLog = winston.loggers.get('error');
  const remoteLog = winston.loggers.get('remote');

  return (req, res, next) => {
    memcached.get(`${CACHE_KEY_PREFIX}:${req.originalUrl}`, (err, result) => {
      if (err) {
        errorLog.warn('memcached', err.message);
        next();
      } else if (result) {
        remoteLog.info(`found cached response: ${memcached.servers} -> ${CACHE_KEY_PREFIX}:${req.originalUrl}`);
        res.send(JSON.parse(result));
      } else {
        next();
      }
    });
  };
}
