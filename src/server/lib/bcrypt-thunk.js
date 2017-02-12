const bcrypt = require('bcrypt');

module.exports.genSalt = (rounds, ignore) => (
  new Promise((resolve, reject) => {
    bcrypt.genSalt(rounds, ignore, (err, salt) => {
      if (err) { return reject(err); }
      return resolve(salt);
    });
  })
);

module.exports.hash = (data, salt) => (
  new Promise((resolve, reject) => {
    bcrypt.hash(data, salt, (err, hash) => {
      if (err) { return reject(err); }
      return resolve(hash);
    });
  })
);

module.exports.compare = (data, hash) => (
  new Promise((resolve, reject) => {
    bcrypt.compare(data, hash, (err, matched) => {
      if (err) { return reject(err); }
      return resolve(matched);
    });
  })
);
