const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const path = require('path');
const autoprefixer = require('autoprefixer');

const ROOT = path.resolve('.');

const webpackPort = 8199;
const hostname = process.env.HOSTNAME;
const protocol = process.env.PROTOCOL;

const config = {
  target: 'node',
  cache: false,
  context: __dirname,
  devtool: 'source-map',
  entry: ['webpack/hot/poll?1000', path.join(ROOT, 'src/server.js')],
  output: {
    path: path.join(ROOT, 'dist'),
    filename: 'server.js',
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      CLIENT: false,
      SERVER: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin({
      filename: '[name].[hash].css',
      allChunks: true,
    }),
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
  ],
  externals: [
    nodeExternals({
      whitelist: ['webpack/hot/poll?1000'],
    }),
  ],
  node: {
    __dirname: true,
    fs: 'empty',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        exclude: /(node_modules)/,
        enforce: 'pre',
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'stage-0', 'react'],
            cacheDirectory: true,
            plugins: ['transform-class-properties'],
          },
        },
      },
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              query: {
                localIdentName:
                  process.env.NODE_ENV === 'production'
                    ? '[hash:8]'
                    : '[path]___[name]__[local]___[hash:base64:5]',
                modules: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                plugins: () => [autoprefixer({ browsers: 'last 2 versions' })],
              },
            },
            {
              loader: 'stylus-loader',
            },
          ],
        }),
      },
      {
        test: /\.woff2?$|\.ttf$|\.eot$|\.svg$|\.png|\.jpe?g|\.gif$/,
        loader: 'file-loader',
        query: {
          publicPath: `${protocol}://${hostname}${
            process.env.NODE_ENV === 'production'
              ? `${
                  process.env.WEBPACK_PORT ? `:${process.env.WEBPACK_PORT}` : ''
                }`
              : `:${webpackPort}`
          }/`,
          emitFile: false,
        },
      },
    ],
    noParse: /\.min\.js/,
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.json', '.js', '.jsx'],
  },
  stats: 'errors-only',
};

module.exports = config;
