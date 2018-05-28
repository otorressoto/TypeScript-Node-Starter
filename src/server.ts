import errorHandler from 'errorhandler';
import fs from 'fs';
import https from 'https';

import app from './app';
import config from './utils/config';
import environment from './utils/environment';

/**
 * Error Handler. Provides full stack - remove for production
 */
if (!environment.isProduction) {
  app.use(errorHandler());
}

/**
 * Setup HTTPS
 */
const options: https.ServerOptions = {
  cert: fs.readFileSync(config.server.cert),
  key: fs.readFileSync(config.server.key),
};

/**
 * Start Express server.
 */
const server = https.createServer(options, app).listen(app.get('port'), () => {
  console.log(
    '  App is running at https://localhost:%d in %s mode',
    app.get('port'),
    environment.target
  );
  console.log('  Press CTRL-C to stop\n');
});

export default server;
