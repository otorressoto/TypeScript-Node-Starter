import environment from './environment';
import logger from './logger';

const config = {
  mongodb: {
    uri: environment.isProduction ? process.env.MONGODB_URI : process.env.MONGODB_URI_LOCAL,
  },
  server: {
    port: process.env.PORT || 3000,
  },
  session: {
    secret: process.env.SESSION_SECRET,
  },
};

let error: { msg: string; env: string };

if (!config.mongodb.uri) {
  error = { msg: 'No mongo connection string', env: 'MONGODB_URI' };
} else if (!config.session.secret) {
  error = { msg: 'No client secret', env: 'SESSION_SECRET' };
}

if (error) {
  logger.error(`${error.msg}. Set ${error.env} environment variable.`);
  process.exit(1);
}

export { config };
export default config;
