import webpack from 'webpack';
import HotNodeServer from './hotNodeServer';
import HotClientServer from './hotClientServer';
import clientConfig from '../../config/webpack/client.dev';
import serverConfig from '../../config/webpack/server.dev';

const initializeBundle = (name, bundleConfig) => {
  const createCompiler = () => {
    try {
      const webpackConfig = (name === 'client') ? clientConfig : serverConfig;

      return webpack(webpackConfig);
    } catch (err) {
      console.log('Webpack config is invalid, please check the console for more information.');
      console.error(err);
      throw err;
    }
  };

  return { name, bundleConfig, createCompiler };
};

class HotDevelopment {
  constructor(port, clientPort) {
    this.hotClientServer = null;
    this.hotNodeServers = [];

    process.env.PORT = port;
    process.env.CLIENT_DEV_PORT = clientPort;

    const clientBundle = initializeBundle('client');

    const nodeBundles = [
      initializeBundle('server'),
    ];

    Promise.resolve(true)
      // Then start the client development server.
      .then(
        () =>
          new Promise(resolve => {
            const { createCompiler } = clientBundle;
            const compiler = createCompiler();
            compiler.plugin('done', stats => {
              if (!stats.hasErrors()) {
                resolve(compiler);
              }
            });
            this.hotClientServer = new HotClientServer(clientPort, compiler);
          })
      )
      // Then start the node development server(s).
      .then(clientCompiler => {
        this.hotNodeServers = nodeBundles.map(
          ({ name, createCompiler }) =>
            new HotNodeServer(port, name, createCompiler(), clientCompiler),
        );
      });
  }

  dispose() {
    const safeDisposer = server =>
      server ? server.dispose() : Promise.resolve();

    // First the hot client server.
    return (
      safeDisposer(this.hotClientServer)
        // Then dispose the hot node server(s).
        .then(() => Promise.all(this.hotNodeServers.map(safeDisposer)))
    );
  }
}

export default HotDevelopment;
