import ExtractTextPlugin from 'extract-text-webpack-plugin';

import postCSSLoaderOptions from '../postCSSLoaderOptions';

export const clientDevStyleRules = [
  {
    test: /\.css$/,
    use: [
      require.resolve('style-loader'),
      {
        loader: require.resolve('css-loader'),
        options: {
          importLoaders: 1,
        },
      },
      {
        loader: require.resolve('postcss-loader'),
        options: postCSSLoaderOptions,
      },
    ],
  },
  {
    test: /\.styl$/,
    use: [
      require.resolve('style-loader'),
      {
        loader: require.resolve('css-loader'),
        options: {
          importLoaders: 1,
          modules: true,
          localIdentName: '[name]__[local]___[hash:base64:5]',
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
];

export const clientProdStyleRules = [
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
  {
    test: /\.styl$/,
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
];

export const serverStyleRules = [
  {
    test: /\.css/,
    loaders: ['css-loader/locals'],
  },
];
