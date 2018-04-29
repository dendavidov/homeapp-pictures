import path from 'path';
import webpack from 'webpack';
import AssetsPlugin from 'assets-webpack-plugin';

const ROOT_DIR = path.resolve(__dirname, '../..');
const resolvePath = (...args) => path.resolve(ROOT_DIR, ...args);

const BUILD_DIR = resolvePath('build', 'client');

// The host on which the server should run.
const host = 'localhost';

// The port on which the client bundle development server should run.
const clientDevServerPort = 7331;

const config = {
  mode: 'development',
  target: 'web',
  entry: {
    index: [
      'react-hot-loader/patch',
      `webpack-hot-middleware/client?reload=true&path=http://${host}:${clientDevServerPort}/__webpack_hmr`,
      resolvePath('src', 'client', 'index.jsx'),
    ],
  },
  output: {
    path: BUILD_DIR,
    filename: 'client.js',
    publicPath: `http://${host}:${clientDevServerPort}/client/`,
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'stage-3', 'react'],
            plugins: ['transform-class-properties'],
          },
        },
      },
    ],
  },
  plugins: [
    new AssetsPlugin({
      filename: 'assets.json',
      path: `${BUILD_DIR}/`,
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
    }),
  ],
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx'],
  },
};

export default config;
