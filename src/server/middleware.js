import path from 'path';
import express from 'express';
import serveStatic from 'serve-static';
import compression from 'compression';
import bodyParser from 'body-parser';
import session from 'express-session';
import detectDevice from './middleware/detectDevice';
import renderer from './middleware/renderer';
import handleErrors from './middleware/handleErrors';

export default function (app) {
  const router = express.Router();
  const STATIC_DIR = path.join(__dirname, '../..', 'static');

  router.use(session({
    secret: 'valpak is teh hotnizz',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 60000 * 60 * 24 * 7}
  }));

  router.use(bodyParser.json());
  router.use(bodyParser.urlencoded({extended: true}));
  router.use(compression());
  router.use(serveStatic(STATIC_DIR));
  
  router.use(detectDevice());

  router.use(renderer);

  router.use(handleErrors(app));

  return router;
}
