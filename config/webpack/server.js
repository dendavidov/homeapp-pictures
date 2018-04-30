import path from 'path';
import webpack from 'webpack';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import nodeExternals from 'webpack-node-externals';
import stylus from 'stylus';

import { serverStyleRules } from './rules/styles';

const ROOT_DIR = path.resolve(__dirname, '../..');
const resolvePath = (...args) => path.resolve(ROOT_DIR, ...args);

const BUILD_DIR = resolvePath('distr', 'server');

const nodeExternalsFileTypeWhitelist = [
  /\.(eot|woff|woff2|ttf|otf)$/,
  /\.(svg|png|jpg|jpeg|gif|ico)$/,
  /\.(mp4|mp3|ogg|swf|webp)$/,
  /\.(css|scss|sass|sss|less)$/,
];

const preprocessCss = (css, filename) =>
  stylus(css)
    .set('filename', filename)
    .render();

const config = {
  mode: 'production',
  target: 'node',
  entry: { index: [resolvePath('src', 'server', 'index.js')] },
  output: {
    path: BUILD_DIR,
    filename: 'index.js',
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
            plugins: [
              'transform-class-properties',
              [
                'css-modules-transform',
                {
                  preprocessCss,
                  generateScopedName: '[hash:base64:5]',
                  extensions: ['.styl'],
                },
              ],
            ],
          },
        },
      },
      ...serverStyleRules,
    ],
  },
  externals: [
    nodeExternals(
      // Some of our node_modules may contain files that depend on our
      // webpack loaders, e.g. CSS or SASS.
      // For these cases please make sure that the file extensions are
      // registered within the following configuration setting.
      {
        whitelist: [
          // We always want the source-map-support included in
          // our node target bundles.
          'source-map-support/register',
        ]
          // And any items that have been whitelisted in the config need
          // to be included in the bundling process too.
          .concat(nodeExternalsFileTypeWhitelist || []),
      }
    ),
  ],
  plugins: [
    new CleanWebpackPlugin(['distr/server'], {
      root: path.resolve(__dirname, '../..'),
      verbose: true,
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
    }),
  ],
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx'],
  },
};

export default config;
