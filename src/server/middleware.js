import path from 'path';
import express from 'express';
import * as errors from './utils/errors';
import serveStatic from 'serve-static';
import compression from 'compression';
import moment from 'moment';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import winston from 'winston';
import httpProxy from 'http-proxy';
import api from './middleware/api';
import detectDevice from './middleware/detectDevice';
import detectGeo from './middleware/detectGeo';
import renderer from './middleware/renderer';
import handleErrors from './middleware/handleErrors';

export default function (app) {
  const {logger} = app.locals;
  const accessLog = winston.loggers.get('access');
  const router = express.Router();
  const proxy = httpProxy.createProxyServer();
  const STATIC_DIR = path.join(__dirname, '../..', 'static');

  router.use((req, res, next) => {
    let end = res.end;
    res.end = (chunk, encoding) => {
      res.end = end;
      res.end(chunk, encoding);
      const level = res.statusCode >= 500 ? 'error' :
        res.statusCode >= 400 ? 'warn' :
        'info';
      const time = moment().utcOffset(0).format('DD/MM/YYYY:HH:mm:ss ZZ');
      accessLog.info(`${req.ip} - [${time}] "${req.method} ${req.originalUrl} HTTP/${req.httpVersionMajor + '.' + req.httpVersionMinor}" ${res.statusCode}`);
    };

    next();
  });

  router.use('/proxy/', (req, res, next) => {
    proxy.web(req, res, {target: req.query.url});

    proxy.on('error', error => {
      console.log(error);
      if (error.code === 'ENOTFOUND')
        next(new errors.NotFoundError());
      else
        next(error);
    });
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

  return router;
}
