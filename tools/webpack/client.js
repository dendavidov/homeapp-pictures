const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FavIconsWebpackPlugin = require('favicons-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const RobotsTxtPlugin = require('robotstxt-webpack-plugin').default;
const autoprefixer = require('autoprefixer');

const ROOT = path.resolve('.');

const config = {
  target: 'web',
  cache: false,
  context: __dirname,
  devtool: false,
  entry: {
    app: path.join(ROOT, 'src/client.jsx'),
    vendor: [
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'react-router-dom',
      'redux-actions',
      'react-jobs',
    ],
  },
  output: {
    path: path.join(ROOT, 'static'),
    publicPath: '/',
    filename: 'client.[hash].js',
    chunkFilename: '[name].[id].js',
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      CLIENT: true,
      SERVER: false,
      NODE_ENV: 'production',
    }),
    new HtmlWebpackPlugin({
      title: 'index',
      template: path.join(ROOT, 'src/server/views/index.tpl.production.html'),
      minify: {
        collapseWhitespace: true,
      },
    }),
    new ExtractTextPlugin({
      filename: '[name].[hash].css',
      allChunks: true,
    }),
    new FavIconsWebpackPlugin({
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
    new webpack.ExtendedAPIPlugin(),
    new webpack.IgnorePlugin(/vertx/),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      output: { comments: false },
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/,
      cssProcessorOptions: { discardComments: { removeAll: true } },
    }),
    new RobotsTxtPlugin({
      userAgent: '*',
      disallow: '',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.[hash].js',
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
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              query: {
                localIdentName: '[hash:8]',
                modules: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [autoprefixer({ browsers: 'last 2 versions' })],
              },
            },
          ],
        }),
      },
      {
        test: /\.woff2?$|\.ttf$|\.eot$|\.svg$|\.png|\.jpe?g|\.gif$/,
        loader: 'file-loader',
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
