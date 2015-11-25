import express from 'express';
import * as errors from '../utils/errors';
import config from '../../../config';

export default function() {
  const router = express.Router();

  router.route('/*')
    .get(async (req, res, next) => {
      try {
        let response = await fetch(`${config.collectionApiHost}/collections${req.url}`);

        if (response.status === 404)
          throw new errors.NotFoundError(response.statusText, req.originalUrl);

        const collections = await response.json();

        res.json(collections);
      } catch (err) {
        next(err);
      }
    });

  return router;
}
