import winston from 'winston';
import moment from 'moment';

export default function() {
  const accessLog = winston.loggers.get('access');

  return (req, res, next) => {
    const end = res.end;
    const reqStartTime = moment().milliseconds();

    res.end = (chunk, encoding) => {
      const timestamp = moment().utcOffset(0).format('DD/MM/YYYY:HH:mm:ss ZZ');
      const responseTime = moment().milliseconds() - reqStartTime;
      const level = res.statusCode >= 500 ? 'error' :
                     res.statusCode >= 400 ? 'warn' :
                     'info';

      res.end = end;
      res.end(chunk, encoding);

      accessLog.log(
        level,
        '%s - [%s] "%s %s HTTP/%s.%s" %s (%sms)',
        req.ip,
        timestamp,
        req.method,
        decodeURIComponent(req.originalUrl),
        req.httpVersionMajor,
        req.httpVersionMinor,
        res.statusCode,
        responseTime
      );
    };

    next();
  };
}
