import express from 'express';
import * as errors from '../utils/errors';
import config from '../../../config';
import winston from 'winston';
import { createCacheWriter } from '../utils/cacheUtils';
import { handleResponse } from '../utils/fetchUtils';

const BALEFIRE_TOKEN = 'X8JWdxVL2HMz8CQDdCQsaV5KDDbmzsKbuBrWHQN1Hso';
const remoteAccessLogger = winston.loggers.get('remote');

export default function(app) {
  const router = express.Router();
  const cacheResponse = createCacheWriter(app.locals.memcached);

  router.route('/*')
    .get(async (req, res, next) => {
      try {
        const uri = config.balefireApiHost + req.url;
        const response = await fetch(uri, {
          headers: {Authorization: `Bearer ${BALEFIRE_TOKEN}`}
        });
        const page = await handleResponse(req.originalUrl, response, cacheResponse);

        res.json(page);
      } catch (err) {
        remoteAccessLogger.error(err.message);
        next(err);
      }
    });

  return router;
}
