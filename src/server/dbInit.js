import mongoose from 'mongoose';

import './models';
import Config from '../config';

import logger from './logger';

mongoose.Promise = global.Promise;

const options = {
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
};

mongoose.connect(Config.mongo.url, options);
mongoose.connection.on('error', err => {
  logger.error(err);
});

mongoose.connection.on('connected', () => {
  logger.info('Connected to database');
});

mongoose.connection.once('open', () => {
  logger.info('Connection open');
});

mongoose.connection.on('reconnected', () => {
  logger.info('Reconnected');
});

mongoose.connection.on('disconnected', () => {
  logger.info('Disconnected');
});

export default mongoose;
