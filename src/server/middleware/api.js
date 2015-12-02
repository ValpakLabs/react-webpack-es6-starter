import express from 'express';
import bodyParser from 'body-parser';

export default function(app) {
  const router = express.Router();

  router.use(bodyParser.json());
  router.use(bodyParser.urlencoded({extended: true}));

  return router;
}
