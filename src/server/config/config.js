const path = require('path');
const _ = require('lodash');

const env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const base = {
  app: {
    root: path.normalize(`${__dirname}/../../..`),
    env,
    apiPrefix: '/api/v1',
  },
};

const config = {
  app: {
    port: 3001,
    keys: ['super-secret-key'],
  },
  mongo: {
    url: 'mongodb://localhost/koareactfullexample_dev',
  },
};

module.exports = _.merge(base, config);
