import path from 'path';
import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';

const ROOT_DIR = path.resolve(__dirname, '../..');
const resolvePath = (...args) => path.resolve(ROOT_DIR, ...args);

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
