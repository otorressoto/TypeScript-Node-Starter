import environment from './environment';
import logger from './logger';

const config = {
  auth: {
    ca: process.env.AUTH_CA,
  },
  mongodb: {
    uri: environment.isProduction ? process.env.MONGODB_URI : process.env.MONGODB_URI_LOCAL,
  },
  server: {
    cert: process.env.SSL_CERT,
    key: process.env.SSL_KEY,
    port: process.env.PORT || 3000,
  },
  session: {
    secret: process.env.SESSION_SECRET,
  },
};

let error: { msg: string; env: string };

if (!config.auth.ca) {
  error = { msg: 'No CA bundle specified', env: 'AUTH_CA' };
} else if (!config.mongodb.uri) {
  error = { msg: 'No mongo connection string', env: 'MONGODB_URI' };
} else if (!config.server.cert) {
  error = { msg: 'No server certificate assigned', env: 'SSL_CERT' };
} else if (!config.server.key) {
  error = { msg: 'No server private key assigned', env: 'SSL_KEY' };
} else if (!config.session.secret) {
  error = { msg: 'No client secret', env: 'SESSION_SECRET' };
}

if (error) {
  logger.error(`${error.msg}. Set ${error.env} environment variable.`);
  process.exit(1);
}

export { config };
export default config;
