const mongoose = require('mongoose');
const co = require('co');

const Models = [
  mongoose.model('User'),
];

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

exports.dropDatabase = function dropDatabase(cb) {
  co(function* map() {
    yield Models.map(dropCollection);
  }).then(cb);
};
