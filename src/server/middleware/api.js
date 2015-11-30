import express from 'express';
import bodyParser from 'body-parser';
import geo from '../api/geo';
import balefire from '../api/balefire';
import collections from '../api/collections';
import listings from '../api/listings';

export default function(app) {
  const router = express.Router();

  router.use((req, res, next) => {
    next();
  });

  router.use(bodyParser.json());
  router.use(bodyParser.urlencoded({extended: true}));

  router.use('/geo', geo(app));
  router.use('/balefire', balefire(app));
  router.use('/collections', collections(app));
  router.use('/listings', listings(app));

  return router;
}
