import path from 'path';
import webpack from 'webpack';
import AssetsPlugin from 'assets-webpack-plugin';

import postCSSLoaderOptions from './postCSSLoaderOptions';

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
      // "postcss" loader applies autoprefixer to our CSS.
      // "css" loader resolves paths in CSS and adds assets as dependencies.
      // "style" loader turns CSS into JS modules that inject <style> tags.
      // In production, we use a plugin to extract that CSS to a file, but
      // in development "style" loader enables hot editing of CSS.
      {
        test: /\.css$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: postCSSLoaderOptions,
          },
        ],
      },
      // Supporting for CSS Modules + Stylus
      {
        test: /\.nomodule\.styl$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: postCSSLoaderOptions,
          },
          {
            loader: require.resolve('stylus-loader'),
          },
        ],
      },
      {
        test: /\.styl$/,
        exclude: /\.nomodule\.styl$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]',
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: postCSSLoaderOptions,
          },
          {
            loader: require.resolve('stylus-loader'),
          },
        ],
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
    new webpack.HotModuleReplacementPlugin({
      multiStep: true,
    }),
  ],
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx'],
  },
};

export default config;
