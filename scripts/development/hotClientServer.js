import express from 'express';
import createWebpackMiddleware from 'webpack-dev-middleware';
import createWebpackHotMiddleware from 'webpack-hot-middleware';
import ListenerManager from './listenerManager';

import logger from '../../src/server/logger';

class HotClientServer {
  constructor(port, compiler) {
    const app = express();

    const httpPathRegex = /^https?:\/\/(.*):([\d]{1,5})/i;
    const httpPath = compiler.options.output.publicPath;
    if (!httpPath.startsWith('http') && !httpPathRegex.test(httpPath)) {
      throw new Error(
        'You must supply an absolute public path to a development build of a web target bundle as it will be hosted on a seperate development server to any node target bundles.'
      );
    }

    this.webpackDevMiddleware = createWebpackMiddleware(compiler, {
      quiet: true,
      noInfo: true,
      headers: {
        // Allow any host to connect to the webpack dev server
        'Access-Control-Allow-Origin': '*',
      },
      // Ensure that the public path is taken from the compiler webpack config
      // as it will have been created as an absolute path to avoid conflicts
      // with an node servers.
      publicPath: compiler.options.output.publicPath,
    });

    app.use(this.webpackDevMiddleware);
    app.use(createWebpackHotMiddleware(compiler));

    const listener = app.listen(port);

    this.listenerManager = new ListenerManager(listener, 'client');

    compiler.plugin('compile', () => {
      logger.info('Building new bundle...');
    });

    compiler.plugin('done', stats => {
      if (stats.hasErrors()) {
        logger.info(
          'Build failed, please check the console for more information.'
        );
        logger.error(stats.toString());
      } else {
        logger.info('Running with latest changes.');
      }
    });
  }

  dispose() {
    this.webpackDevMiddleware.close();

    return this.listenerManager
      ? this.listenerManager.dispose()
      : Promise.resolve();
  }
}

export default HotClientServer;
