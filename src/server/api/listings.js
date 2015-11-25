import express from 'express';
import * as errors from '../utils/errors';
import config from '../../../config';

export default function() {
  const router = express.Router();

  router.route('/')
    .get(async (req, res, next) => {
      try {
        let response = await fetch(`${config.collectionApiHost}/listings${req.url}`);

        if (response.status === 404)
          throw new errors.NotFoundError(response.statusText, req.originalUrl);

        const listings = await response.json();

        res.json(listings);
      } catch (err) {
        next(err);
      }
    });

  return router;
}
