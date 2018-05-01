import loremIpsum from 'lorem-ipsum';

import mongoose from '../../src/server/dbInit';
import logger from '../../src/server/logger';

const rootUser = {
  username: 'root',
  password: '12345',
  type: 'superadmin',
};

// eslint-disable-next-line import/prefer-default-export
export const getTodos = length => {
  const result = [];
  for (let i = 0; i < length; i += 1) {
    result.push({
      title: loremIpsum({
        count: 1,
        sentenceLowerBound: 8,
        sentenceUpperBound: 15,
      }),
      isDone: true,
    });
  }

  return result;
};

async function run() {
  await mongoose.connection.dropDatabase(() => {
    logger.info('Database dropped');
  });

  const User = mongoose.model('User');
  await User.create(rootUser);
  logger.info('Root user is created');

  const ToDoItem = mongoose.model('ToDoItem');
  await ToDoItem.create(getTodos(100));
  logger.info('ToDoItems are created');
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
