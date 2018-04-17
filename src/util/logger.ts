import winston from 'winston';
import { Logger } from 'winston';
import { environment } from './environment';

const logger = new Logger({
  transports: [
    new winston.transports.Console({
      level: environment.isProduction ? 'error' : 'debug',
    }),
    new winston.transports.File({ filename: 'debug.log', level: 'debug' }),
  ],
});

if (environment.isDebug) {
  logger.debug('Logging initialized at debug level');
}

export default logger;
