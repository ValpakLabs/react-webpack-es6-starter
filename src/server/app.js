import Express from 'express';
import config from '../../config';
import logger from './utils/logger';

export async function start() {
  const app = new Express();

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

  app.listen(config.port || 3000, (err) => {
    if (err)
      logger.error(err);
    else
      logger.info('%s running on port %s', config.app.name, config.port || 3000);
  });
}
