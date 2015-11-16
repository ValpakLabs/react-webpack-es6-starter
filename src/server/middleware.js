import path from 'path';
import express from 'express';
import serveStatic from 'serve-static';
import compression from 'compression';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import httpProxy from 'http-proxy';
import api from './middleware/api';
import detectDevice from './middleware/detectDevice';
import detectGeo from './middleware/detectGeo';
import renderer from './middleware/renderer';
import handleErrors from './middleware/handleErrors';

export default function (app) {
  const router = express.Router();
  const proxy = httpProxy.createProxyServer();
  const STATIC_DIR = path.join(__dirname, '../..', 'static');

  router.use((req, res, next) => {
    console.log(req.url);
    next();
  })

  router.use('/proxy/', (req, res, next) => {
    proxy.web(req, res, {target: req.query.url})
  });

  router.use(cookieParser());
  router.use(session({
    secret: 'valpak is teh hotnizz',
    resave: true,
    saveUninitialized: true,
    cookie: {maxAge: 60000 * 60 * 24 * 7}
  }));

  router.use(bodyParser.json());
  router.use(bodyParser.urlencoded({extended: true}));
  router.use(compression());
  router.use(serveStatic(STATIC_DIR));

  router.use('/vpcom/api', api());

  router.use(detectGeo());

  router.use(detectDevice());

  router.use(renderer);

  router.use(handleErrors(app));

  return router;
}
