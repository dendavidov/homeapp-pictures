import 'babel-polyfill';
import app from './server/app';
import logger from './server/logger';

const protocol = process.env.PROTOCOL || 'http';
const hostname = process.env.HOSTNAME || 'localhost';
const port = process.env.PORT || 3000;

try {
  app.listen(port, () => {
    logger.info(
      '==> 🌎  Server is up at %s://%s:%s ===',
      protocol,
      hostname,
      port
    );
  });
} catch (error) {
  logger.error(error.stack || error);
}
