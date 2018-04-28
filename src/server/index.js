import 'babel-polyfill';

import app from './app';

const protocol = process.env.PROTOCOL || 'http';
const hostname = process.env.HOSTNAME || 'localhost';
const port = process.env.PORT || 3000;

try {
  app.listen(port, () => {
    console.info(
      '==> 🌎  Server is up at %s://%s:%s ===',
      protocol,
      hostname,
      port
    );
  });
} catch (error) {
  console.error(error.stack || error);
}
