const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const config = require('./client');

config.plugins.push(
  new BundleAnalyzerPlugin({
    analyzerMode: 'server',
  })
);

module.exports = config;
