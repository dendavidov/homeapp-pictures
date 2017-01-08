const path = require('path');
const _ = require('lodash');

const env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const base = {
  app: {
    root: path.normalize(`${__dirname}/../../..`),
    env: env,
  }
};

const config = {
  app: {
    port: 3000,
  },
  mongo: {
    url: "mongodb://localhost/koareactfullexample_dev",
  }
};

module.exports = _.merge(base, config);
