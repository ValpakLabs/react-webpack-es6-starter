import express from 'express';
import geo from '../api/geo';

export default function() {
  const router = express.Router();

  router.use('/geo', geo());

  return router;
}
