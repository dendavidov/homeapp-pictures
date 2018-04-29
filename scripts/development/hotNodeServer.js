import path from 'path';
import appRootDir from 'app-root-dir';
import { spawn } from 'child_process';

import logger from '../../src/server/logger';

class HotNodeServer {
  constructor(port, name, compiler, clientCompiler) {
    const compiledEntryFile = path.resolve(
      appRootDir.get(),
      compiler.options.output.path,
      `${Object.keys(compiler.options.entry)[0]}.js`
    );

    const startServer = () => {
      if (this.server) {
        this.server.kill();
        this.server = null;
        logger.info('Restarting server...');
      }

      // Start on correct port
      const env = Object.assign(process.env, { PORT: port });
      const newServer = spawn('node', [compiledEntryFile, '--color', { env }]);

      logger.info('Server running with latest changes.');

      newServer.stdout.on('data', data => {
        // eslint-disable-next-line no-console
        console.log(data.toString().trim());
      });
      newServer.stderr.on('data', data => {
        logger.info(
          'Error in server execution, check the console for more info.'
        );
        logger.error(data.toString().trim());
      });
      this.server = newServer;
    };

    // We want our node server bundles to only start after a successful client
    // build.  This avoids any issues with node server bundles depending on
    // client bundle assets.
    const waitForClientThenStartServer = () => {
      if (this.serverCompiling) {
        // A new server bundle is building, break this loop.
        return;
      }
      if (this.clientCompiling) {
        setTimeout(waitForClientThenStartServer, 50);
      } else {
        startServer();
      }
    };

    clientCompiler.plugin('compile', () => {
      this.clientCompiling = true;
    });

    clientCompiler.plugin('done', stats => {
      if (!stats.hasErrors()) {
        this.clientCompiling = false;
      }
    });

    compiler.plugin('compile', () => {
      this.serverCompiling = true;
      logger.info('Building new bundle...');
    });

    compiler.plugin('done', stats => {
      this.serverCompiling = false;
      logger.info('2. Done compiling');

      if (this.disposing) {
        return;
      }

      try {
        if (stats.hasErrors()) {
          logger.info('Build failed, check the console for more information.');
          logger.info(stats.toString());
          return;
        }

        waitForClientThenStartServer();
      } catch (err) {
        logger.info(
          'Failed to start, please check the console for more information.'
        );
        logger.error(err);
      }
    });

    // Lets start the compiler.
    this.watcher = compiler.watch(null, () => undefined);
  }

  dispose() {
    this.disposing = true;

    const stopWatcher = new Promise(resolve => {
      this.watcher.close(resolve);
    });

    return stopWatcher.then(() => {
      if (this.server) this.server.kill();
    });
  }
}

export default HotNodeServer;
