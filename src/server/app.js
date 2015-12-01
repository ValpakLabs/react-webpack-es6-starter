import Express from 'express';
import Memcached from 'memcached';
import config from '../../config';
import handleErrors from './middleware/handleErrors';
import logger from './utils/logger';
import winston from 'winston';

export async function start() {
  const app = new Express();
  const errorLog = winston.loggers.get('error');
  const devLog = winston.loggers.get('dev');

  let memcached = new Memcached(config.hazelcastNodeUri, {
    failures: 1,
    failuresTimeout: 1000,
    timeout: 1000,
    debug: false,
    retries: 1,
    retry: 1000,
    remove: true
  });

  app.set('trust proxy', 'loopback');
  app.locals.logger = logger;
  app.locals.memcached = memcached;

  // hot reloading config
  if (__DEVELOPMENT__)
    require('./middleware/hotReload')(app);

  // mount app at context path
  app.use(config.appContext, (req, res, next) => {
    try {
      require('./middleware')(app)(req, res, next);
    } catch (err) {
      next(err);
    }
  });

  app.use((err, req, res, next) => {
    require('./middleware/handleErrors')(app)(err, req, res, next);
  });

  app.listen(config.port || 3000, (err) => {
    if (err)
      errorLog.error(err);
    else
      devLog.info('%s running on port %s', config.app.name, config.port || 3000);
  });
}
