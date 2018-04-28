import http from 'http';
import openBrowser from 'react-dev-utils/openBrowser';
import { choosePort } from 'react-dev-utils/WebpackDevServerUtils';
import detect from 'detect-port-alt';
import chokidar from 'chokidar';
import { resolve as pathResolve } from 'path';
import appRootDir from 'app-root-dir';

const host = 'localhost';
const onResponsive = (hostname, port, cb) =>
  setTimeout(
    () =>
      http
        .get({ hostname, port, path: '/', agent: false }, cb)
        .on('error', () => onResponsive(hostname, port, cb)),
    1000
  );

// Prompt the user to select port if it's already taken.
// Resolves with newly selected port or null if cancelled.
choosePort(host, 1337)
  .then(port => detect(7331).then(clientPort => [port, clientPort]))
  .then(([port, clientPort]) => {
    if (!port || !clientPort) {
      console.error('User cancelled');
      return;
    }

    let HotDevelopment = require('./hotDevelopment').default;
    let devServer = new HotDevelopment(port, clientPort);

    // Any changes to our webpack bundleConfigs should restart the development devServer.
    const watcher = chokidar.watch([
      pathResolve(appRootDir.get(), 'scripts'),
      pathResolve(appRootDir.get(), 'config'),
    ]);

    watcher.on('ready', () => {
      watcher.on('change', () => {
        console.log(
          'Project build configuration has changed. Restarting the development devServer...'
        );
        devServer.dispose().then(() => {
          // Make sure our new webpack bundleConfigs aren't in the module cache.
          Object.keys(require.cache).forEach(modulePath => {
            if (modulePath.indexOf('config') !== -1) {
              delete require.cache[modulePath];
            } else if (modulePath.indexOf('scripts') !== -1) {
              delete require.cache[modulePath];
            }
          });

          // Re-require the development devServer so that all new configs are used.
          HotDevelopment = require('./hotDevelopment').default;

          // Create a new development devServer.
          devServer = new HotDevelopment(port, clientPort);
        });
      });

      // Wait until devServer is started to open browser
      // onResponsive(host, port, () => openBrowser(`http://${host}:${port}`));
    });

    // If we receive a kill cmd then we will first try to dispose our listeners.
    process.on(
      'SIGTERM',
      () => devServer && devServer.dispose().then(() => process.exit(0))
    );
  });
