import winston from 'winston';
import winstonConfig from 'winston/lib/winston/config';

var customLevels = {
  levels: {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
    dispatch: 4
  },
  colors: {
    debug: 'blue',
    info: 'green',
    baz: 'yellow',
    error: 'red',
    dispatch: 'grey'
  }
};

// winston.setLevels(customLevels.levels)

// winston.level = 'debug';
winston.addColors(customLevels.colors);

const logger = new (winston.Logger)({
  levels: customLevels.levels,
  level: 'debug',
  transports: [
    new (winston.transports.Console)({
      colorize: 'all',
      formatter: (options) => {
        return winstonConfig.colorize(options.level, `[${options.level.toUpperCase()}] `) + options.message;
      }
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

export default logger;
