import mongoose from '../../src/server/dbInit';
import data from './data';
import logger from '../../src/server/logger';

async function run() {
  await mongoose.connection.dropDatabase(() => {
    logger.info('Database dropped');
  });

  const User = mongoose.model('User');
  await User.create(data.user);
  logger.info('Root user is created');
}

run()
  .then(() => {
    mongoose.disconnect();
    process.exit(0);
  })
  .catch(error => {
    logger.error(error.stack);
    mongoose.disconnect();
    process.exit(0);
  });
