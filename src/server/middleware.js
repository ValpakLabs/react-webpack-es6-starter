import path from 'path';
import express from 'express';
import serveStatic from 'serve-static';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import requestLogger from './middleware/requestLogger';
import { responseCache } from './utils/cacheUtils';
import api from './middleware/api';
import detectDevice from './middleware/detectDevice';
import detectGeo from './middleware/detectGeo';
import renderer from './middleware/renderer';
import handleErrors from './middleware/handleErrors';
import winston from 'winston';

export default function (app) {
  const STATIC_DIR = path.join(__dirname, '../..', 'static');
  const router = express.Router();
  const sessionConfig = {
    secret: 'valpak is teh hotnizz',
    resave: true,
    saveUninitialized: true,
    cookie: {maxAge: 60000 * 60 * 24 * 7}
  };

  router.use((req, res, next) => {
    next();
  });

  router.use(requestLogger());

  router.route('/debug/loglevel/:name/:level').post((req, res, next) => {
    let logger = winston.loggers.get(req.params.name);
    logger.transports.console.level = req.params.level;
    winston.loggers.get('dev').debug(`"${req.params.name}" console log level set to "${req.params.level}"`);
    res.sendStatus(200);
  });

  router.route('/cache/flush').post((req, res, next) => {
    let logger = winston.loggers.get('remote');
    app.locals.memcached.del('node-vpcom:', (err, result) => {
      logger.debug('attempting to flush cache for node-vpcom');
      if (!err) {
        logger.info('cache items flushed', {itemKey: 'node-vpcom'});
        res.sendStatus(200);
      } else {
        logger.error('error flushing cache', {error: err});
        next(err);
      }
    });
  });

  router.use(compression());

  router.use(serveStatic(STATIC_DIR));

  router.use(cookieParser());

  router.use(session(sessionConfig));

  router.use(responseCache(app));

  router.use('/vpcom/api', api(app));

  router.use(detectGeo());

  router.use(detectDevice());

  router.use(renderer(app));

  return router;
}
