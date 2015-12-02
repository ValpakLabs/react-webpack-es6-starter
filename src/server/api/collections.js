import express from 'express';
import winston from 'winston';
import * as errors from '../utils/errors';
import config from '../../../config';
import { createCacheWriter } from '../utils/cacheUtils';
import { handleResponse } from '../utils/fetchUtils';

const remoteAccessLogger = winston.loggers.get('remote');

export default function(app) {
  const router = express.Router();
  const cacheResponse = createCacheWriter(app.locals.memcached);

  router.route('/*')
    .get(async (req, res, next) => {
      try {
        const uri = `${config.collectionApiHost}/collections${req.url}`;
        const response = await fetch(uri);
        const collections = await handleResponse(req.originalUrl, response, cacheResponse);

        // logger.debug(response);

        res.json(collections);
      } catch (err) {
        remoteAccessLogger.error(err.message);
        next(err);
      }
    });

  return router;
}
