import express from 'express';
import geo from '../api/geo';
import balefire from '../api/balefire';
import collections from '../api/collections';
import listings from '../api/listings';

export default function() {
  const router = express.Router();

  router.use('/geo', geo());
  router.use('/balefire', balefire());
  router.use('/collections', collections());
  router.use('/listings', listings());

  return router;
}
