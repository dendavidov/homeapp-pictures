import mongoose from 'mongoose';

import './models';
import Config from '../config';

import logger from './logger';

mongoose.Promise = global.Promise;

mongoose.connect(Config.mongo.url);
mongoose.connection.on('error', err => {
  logger.error(err);
});

mongoose.connection.on('connected', () => {
  logger.info('Connected to database');
});

mongoose.connection.once('open', () => {
  logger.info('connection open');
});

mongoose.connection.on('reconnected', () => {
  logger.info('reconnected');
});

mongoose.connection.on('disconnected', () => {
  logger.info('disconnected');
  mongoose.connect(Config.mongo.url, {
    server: {
      auto_reconnect: true,
      socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 },
    },
    replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  });
});

export default mongoose;
