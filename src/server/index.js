import 'babel-polyfill';

import logger from './logger';

import app from './app';

const protocol = process.env.PROTOCOL || 'http';
const hostname = process.env.HOSTNAME || 'localhost';
const port = process.env.PORT || 3000;

try {
  app.listen(port, () => {
    logger.info(`==> Server is up at ${protocol}://${hostname}:${port} ===`);
  });
} catch (error) {
  logger.error(error.stack || error);
}
