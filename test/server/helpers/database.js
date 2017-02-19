const mongoose = require('mongoose');
const co = require('co');
const app = require('../../../src/server/server');

app.listen();

const User = mongoose.model('User');

const Models = [
  mongoose.model('User'),
];

const data = require('./data');

function dropCollection(model) {
  return new Promise((resolve, reject) => {
    model.collection.remove((err) => {
      if (err) {
        return reject(err);
      }
      return resolve();
    });
  });
}
const dropDatabase = (cb) => {
  co(function* map() {
    yield Models.map(dropCollection);
  }).then(cb);
};

const createDatabase = () => co.wrap(
  function* createUser() {
    const user = new User(data.CREDENTIALS);
    yield user.save();
  });

module.exports = {
  dropDatabase,
  createDatabase,
};
