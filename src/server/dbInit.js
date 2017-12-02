import mongoose from 'mongoose';

import './models';
import Config from '../config';

import logger from './logger';

mongoose.Promise = global.Promise;

mongoose.connect(Config.mongoDbUrl, { useMongoClient: true });
mongoose.connection.on('error', err => {
  logger.error(err);
});

export default mongoose;
