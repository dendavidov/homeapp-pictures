import path from 'path';

const ROOT_DIR = path.resolve(__dirname, '../..');
const resolvePath = (...args) => path.resolve(ROOT_DIR, ...args);

const config = {
  mode: 'development',
  target: 'node',
  entry: { index: [resolvePath('src', 'server', 'index.js')] },
  output: {
    path: resolvePath('build', 'server'),
    filename: 'index.js',
  },
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
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx'],
  },
};

export default config;
