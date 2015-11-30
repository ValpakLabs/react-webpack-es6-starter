import winston from 'winston';
import winstonConfig from 'winston/lib/winston/config';

const logger = new (winston.Logger)({
  level: 'debug',
  transports: [
    new (winston.transports.Console)({
      colorize: true,
    })
  ]
});

winston.loggers.add('access', {
  console: {
    level: 'info',
    colorize: true,
    label: 'access'
  },
  file: {
    filename: 'access.log'
  }
});

winston.loggers.add('error', {
  console: {
    level: 'silly',
    colorize: true,
    label: 'error'
  },
  file: {
    filename: 'error.log',
    handleExceptions: true,
    humanReadableUnhandledException: true,
    prettyPrint: true
  }
});

winston.loggers.add('remote', {
  console: {
    level: 'silly',
    colorize: true,
    label: 'remote'
  },
  file: {
    level: 'warn',
    filename: 'api-remote.log',
    handleExceptions: true,
    humanReadableUnhandledException: true,
    prettyPrint: true
  }
});

winston.loggers.add('react-ssr', {
  console: {
    level: 'silly',
    colorize: true,
    label: 'react-ssr'
  },
  file: {
    filename: 'react-ssr.log'
  }
});

winston.loggers.add('dev', {
  console: {
    level: 'silly',
    colorize: true,
    label: 'dev'
  }
});

export default logger;
