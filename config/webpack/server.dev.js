import path from 'path';
import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import stylus from 'stylus';

import { serverStyleRules } from './rules/styles';

const preprocessCss = (css, filename) =>
  stylus(css)
    .set('filename', filename)
    .render();

const ROOT_DIR = path.resolve(__dirname, '../..');
const resolvePath = (...args) => path.resolve(ROOT_DIR, ...args);

// The host on which the server should run.
const host = 'localhost';

// The port on which the client bundle development server should run.
const clientDevServerPort = 7331;

const nodeExternalsFileTypeWhitelist = [
  /\.(eot|woff|woff2|ttf|otf)$/,
  /\.(svg|png|jpg|jpeg|gif|ico)$/,
  /\.(mp4|mp3|ogg|swf|webp)$/,
  /\.(css|scss|sass|sss|less)$/,
];

const config = {
  mode: 'development',
  target: 'node',
  entry: { index: [resolvePath('src', 'server', 'index.js')] },
  output: {
    path: resolvePath('build', 'server'),
    filename: 'index.js',
    hotUpdateChunkFilename: '[hash].hot-update.js',
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
                  generateScopedName: '[name]__[local]___[hash:base64:5]',
                  extensions: ['.styl'],
                },
              ],
            ],
          },
        },
      },
      ...serverStyleRules,
      {
        test: /\.woff2?$|\.ttf$|\.eot$|\.svg$|\.png|\.jpe?g|\.gif$/,
        loader: 'file-loader',
        query: {
          publicPath: `http://${host}:${clientDevServerPort}/client/`,
          emitFile: false,
        },
      },
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
    new CleanWebpackPlugin(['build/server'], {
      root: path.resolve(__dirname, '../..'),
      verbose: true,
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      SERVER: 'true',
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
