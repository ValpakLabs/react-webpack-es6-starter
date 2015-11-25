import express from 'express';
import * as errors from '../utils/errors';
import config from '../../../config';

export default function() {
  const router = express.Router();

  router.route('/*')
    .get(async (req, res, next) => {
      try {
        let response = await fetch(config.balefireApiHost + req.url, {
          headers: {
            Authorization: 'Bearer X8JWdxVL2HMz8CQDdCQsaV5KDDbmzsKbuBrWHQN1Hso'
          }
        });

        if (response.status === 404)
          throw new errors.NotFoundError(response.statusText, req.originalUrl);

        const page = await response.json();

        res.json(page);
      } catch (err) {
        next(err);
      }
    });

  return router;
}
