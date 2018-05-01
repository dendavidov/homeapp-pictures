import mongoose from '../../src/server/dbInit';
import logger from '../../src/server/logger';

const rootUser = {
  username: 'root',
  password: '12345',
  type: 'superadmin',
};

const todos = [
  {
    title: 'Buy milk',
    isDone: true,
  },
  {
    title: 'Buy tea',
    isDone: false,
  },
];

async function run() {
  await mongoose.connection.dropDatabase(() => {
    logger.info('Database dropped');
  });

  const User = mongoose.model('User');
  await User.create(rootUser);
  logger.info('Root user is created');

  const ToDoItem = mongoose.model('ToDoItem');
  await ToDoItem.create(todos);
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
