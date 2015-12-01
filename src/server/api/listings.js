import express from 'express';
import * as errors from '../utils/errors';
import config from '../../../config';
import { createCacheWriter } from '../utils/cacheUtils';
import { handleResponse } from '../utils/fetchUtils';

export default function(app) {
  const router = express.Router();
  const cacheResponse = createCacheWriter(app.locals.memcached);

  router.route('/')
    .get(async (req, res, next) => {
      try {
        const uri = `${config.collectionApiHost}/listings${req.url}`;
        const response = await fetch(uri);
        const listings = await handleResponse(req.originalUrl, response, cacheResponse);
        res.json(listings);
      } catch (err) {
        next(err);
      }
    });

  return router;
}
