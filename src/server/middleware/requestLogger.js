import winston from 'winston';
import moment from 'moment';

export default function() {
  const accessLog = winston.loggers.get('access');

  return (req, res, next) => {
    const end = res.end;

    res.end = (chunk, encoding) => {
      const time = moment().utcOffset(0).format('DD/MM/YYYY:HH:mm:ss ZZ');
      const level = res.statusCode >= 500 ? 'error' :
        res.statusCode >= 400 ? 'warn' :
        'info';

      res.end = end;
      res.end(chunk, encoding);

      accessLog.log(
        level,
        `${req.ip} - [${time}] "${req.method} ${req.originalUrl} HTTP/${req.httpVersionMajor + '.' + req.httpVersionMinor}" ${res.statusCode}`
      );
    };

    next();
  };
}
