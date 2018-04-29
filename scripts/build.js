import webpack from 'webpack';

import logger from '../src/server/logger';

import clientConfig from '../config/webpack/client';
import serverConfig from '../config/webpack/server';

[clientConfig, serverConfig].forEach(config => {
  const compiler = webpack(config);
  compiler.run((err, stats) => {
    if (err) {
      logger.error(err.stack || err);
      if (err.details) {
        logger.error(err.details);
      }
      process.exitCode = process.exitCode || 1;
      return;
    }

    if (stats.hasErrors()) {
      process.exitCode = process.exitCode || 1;
    }

    logger.info(stats.toString({ colors: true }));
  });
});
