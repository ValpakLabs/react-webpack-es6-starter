import winston from 'winston';
import winstonConfig from 'winston/lib/winston/config';
import moment from 'moment';

const consoleTimestamp = () =>
  moment().utcOffset(0).format('DD/MM/YYYY:HH:mm:ss ZZ');

const consoleFormatter = (options) => {
  const levelLabel = winston.config.colorize(options.level, options.level);
  const label = options.label || '';
  const now = options.timestamp();
  const message = options.message;
  const meta = options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : '';
  return `${levelLabel}: [${label}] [${now}] ${message} ${meta}`;
};

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
    label: 'remote',
    timestamp: consoleTimestamp,
    formatter: consoleFormatter
  },
  file: {
    level: 'info',
    filename: 'api-remote.log'
  }
});

winston.loggers.add('react-ssr', {
  console: {
    level: 'silly',
    colorize: true,
    label: 'react-ssr',
    timestamp: consoleTimestamp,
    formatter: consoleFormatter
  },
  file: {
    filename: 'react-ssr.log'
  }
});

winston.loggers.add('dev', {
  console: {
    level: 'silly',
    colorize: true,
    label: 'dev',
    timestamp: consoleTimestamp,
    formatter: consoleFormatter
  }
});

export default logger;
