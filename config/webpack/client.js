import path from 'path';

import webpack from 'webpack';
import AssetsPlugin from 'assets-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import { clientProdStyleRules } from './rules/styles';

const ROOT_DIR = path.resolve(__dirname, '../..');
const resolvePath = (...args) => path.resolve(ROOT_DIR, ...args);

const BUILD_DIR = resolvePath('distr', 'client');

const config = {
  mode: 'production',
  target: 'web',
  entry: {
    index: [resolvePath('src', 'client', 'index.jsx')],
  },
  output: {
    path: BUILD_DIR,
    filename: '[name]-[chunkhash].js',
    publicPath: '/client/',
  },
  devtool: 'hidden-source-map',
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
      ...clientProdStyleRules,
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['distr/client'], {
      root: path.resolve(__dirname, '../..'),
      verbose: true,
    }),
    new AssetsPlugin({
      filename: 'assets.json',
      path: `${BUILD_DIR}/`,
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
    }),
    new ExtractTextPlugin({
      filename: '[name].[hash].css',
      allChunks: true,
    }),
  ],
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx'],
  },
};

export default config;
