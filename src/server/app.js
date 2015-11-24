import Express from 'express';
import config from '../../config';
import handleErrors from './middleware/handleErrors';
import logger from './utils/logger';

export async function start() {
  const app = new Express();

  app.set('trust proxy', 'loopback');
  app.locals.logger = logger;

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
      logger.error(err);
    else
      logger.info('%s running on port %s', config.app.name, config.port || 3000);
  });
}
