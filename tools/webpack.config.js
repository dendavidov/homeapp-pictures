const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const getPath = pathString => path.resolve(`../${pathString}`);

const config = {
  entry: getPath('src/client/app.jsx'),
  output: {
    path: getPath('build'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loaders: ['eslint'],
        exclude: /(node_modules|src\/server)/,
      },
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /(node_modules|src\/server)/,
        query: {
          presets: ['es2015', 'react'],
          cacheDirectory: true,
          plugins: ['transform-class-properties'],
        },
      },
      {
        test: /\.sass$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!resolve-url!sass-loader?sourceMap'),
      },
      {
        test: /\.woff2?$|\.ttf$|\.eot$|\.svg$|\.png|\.jpe?g|\.gif$/,
        loader: 'file-loader',
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('styles.css', {
      allChunks: true,
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      title: 'index',
      template: getPath('src/client/index.template.html'),
      minify: {
        collapseWhitespace: true,
      },
    }),
    new FaviconsWebpackPlugin({
      logo: getPath('assets/favicon.png'),
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
  eslint: {
    configFile: '.eslintrc',
    failOnWarning: false,
    failOnError: true,
  },
  devtool: 'source-map',
};

module.exports = config;
