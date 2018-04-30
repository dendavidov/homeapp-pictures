import path from 'path';

import webpack from 'webpack';
import AssetsPlugin from 'assets-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import postCSSLoaderOptions from './postCSSLoaderOptions';

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
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          Object.assign(
            {
              fallback: {
                loader: require.resolve('style-loader'),
                options: {
                  hmr: false,
                },
              },
              use: [
                {
                  loader: require.resolve('css-loader'),
                  options: {
                    importLoaders: 1,
                    minimize: true,
                    sourceMap: false,
                  },
                },
                {
                  loader: require.resolve('postcss-loader'),
                  options: postCSSLoaderOptions,
                },
              ],
            },
            {}
          )
        ),
        // Note: this won't work without `new ExtractTextPlugin()` in `plugins`.
      },

      // Supporting for CSS Modules + Stylus
      {
        test: /\.nomodule\.styl$/,
        loader: ExtractTextPlugin.extract(
          Object.assign(
            {
              fallback: require.resolve('style-loader'),
              use: [
                {
                  loader: require.resolve('css-loader'),
                  options: {
                    importLoaders: 1,
                    minimize: true,
                    sourceMap: false,
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
            {}
          )
        ),
        // Note: this won't work without `new ExtractTextPlugin()` in `plugins`.
      },
      {
        test: /\.styl$/,
        exclude: /\.nomodule\.styl$/,
        loader: ExtractTextPlugin.extract(
          Object.assign(
            {
              fallback: require.resolve('style-loader'),
              use: [
                {
                  loader: require.resolve('css-loader'),
                  options: {
                    importLoaders: 1,
                    minimize: true,
                    sourceMap: true,
                    modules: true,
                    localIdentName: '[hash:base64:5]',
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
            {}
          )
        ),
      },
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
