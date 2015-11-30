import express from 'express';
import winston from 'winston';
import * as errors from '../utils/errors';
import config from '../../../config';
import { createCacheWriter } from '../utils/cacheUtils';
import { handleResponse } from '../utils/fetchUtils';

const logger = winston.loggers.get('remote');

export default function(app) {
  const router = express.Router();
  const cacheResponse = createCacheWriter(app.locals.memcached);

  router.route('/*')
    .get(async (req, res, next) => {
      try {
        const uri = `${config.collectionApiHost}/collections${req.url}`;
        const response = await fetch(uri);
        const collections = await handleResponse(response, cacheResponse);
        res.json(collections);
      } catch (err) {
        logger.error(err.message);
        next(err);
      }
    });

  return router;
}
