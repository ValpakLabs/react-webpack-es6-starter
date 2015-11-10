import Express from 'express';
import config from '../../config';
import logger from './utils/logger';

export async function start() {
  const app = new Express();

  // hot reloading config
  if (__DEVELOPMENT__)
    require('./middleware/dev-middleware')(app);

  // mount app at context path
  app.use(config.appContext, (req, res, next) => {
    try {
      require('./middleware/app-middleware')(app)(req, res, next);
    } catch (err) {
      next(err);
    }
  });

  app.use(require('./middleware/error-middleware')(app));

  app.listen(config.port || 3000, (err) => {
    console.log(logger);
    if (err)
      logger.error(err);
    else
      logger.info('%s running on port %s', config.app.name, config.port || 3000);
  });
}
