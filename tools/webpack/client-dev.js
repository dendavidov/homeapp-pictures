const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// eslint-disable-next-line import/no-extraneous-dependencies
const WebpackShellPlugin = require('webpack-shell-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// eslint-disable-next-line import/no-extraneous-dependencies
const HtmlWebpackHardDiskPlugin = require('html-webpack-harddisk-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const autoprefixer = require('autoprefixer');

const webpackPort = 8199;
const hostname = process.env.HOSTNAME;
const protocol = process.env.PROTOCOL;

const ROOT = path.resolve('.');

const config = {
  target: 'web',
  cache: true,
  context: __dirname,
  devtool: 'inline-source-map',
  entry: [
    `webpack-dev-server/client?${protocol}://${hostname}:${webpackPort}`,
    'webpack/hot/only-dev-server',
    path.join(ROOT, 'src/client.jsx'),
  ],
  output: {
    path: path.join(ROOT, 'static'),
    publicPath: `${protocol}://${hostname}:${webpackPort}/`,
    hotUpdateMainFilename: 'update/[hash]/update.json',
    hotUpdateChunkFilename: 'update/[hash]/[id].update.js',
    filename: 'client.[hash].js',
    chunkFilename: '[name].[id].js',
  },
  plugins: [
    new WebpackShellPlugin({
      onBuildEnd: ['npm run server:watch'],
    }),
    new webpack.EnvironmentPlugin({
      CLIENT: true,
      SERVER: false,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin({
      filename: '[name].[hash].css',
      allChunks: true,
    }),
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
    new HtmlWebpackPlugin({
      title: 'index',
      alwaysWriteToDisk: true,
      template: path.join(ROOT, 'src/server/views/index.tpl.html'),
      minify: {
        collapseWhitespace: true,
      },
    }),
    new HtmlWebpackHardDiskPlugin(),
    new FaviconsWebpackPlugin({
      logo: path.join(ROOT, 'assets/favicon.png'),
      icons: {
        android: false,
        appleIcon: false,
        appleStartup: false,
        coast: false,
        favicons: true,
        firefox: true,
        opengraph: false,
        twitter: false,
        yandex: false,
        windows: false,
      },
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
            presets: ['es2015', 'stage-0', 'react', 'react-hmre'],
            cacheDirectory: true,
            plugins: ['transform-class-properties'],
          },
        },
      },
      {
        test: /\.styl/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              query: {
                localIdentName: '[path]___[name]__[local]___[hash:base64:5]',
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
          publicPath: `${protocol}://${hostname}:${webpackPort}/`,
          emitFile: true,
        },
      },
    ],
    noParse: /\.min\.js/,
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.json', '.js', '.jsx'],
  },
  devServer: {
    publicPath: `${protocol}://${hostname}:${webpackPort}/`,
    contentBase: 'static',
    hot: true,
    inline: false,
    lazy: false,
    quiet: false,
    noInfo: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    stats: { colors: true },
    host: hostname,
    port: webpackPort,
  },
};

module.exports = config;
