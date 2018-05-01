import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

import { toJSON } from './helpers';

const User = new mongoose.Schema(
  {
    type: { type: String, default: 'user' },
    name: { type: String },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    toJSON,
  }
);

User.pre('save', function preSave(next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return reject(err);
      return resolve(salt);
    });
  })
    .then(salt => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) {
          throw new Error(err);
        }

        user.password = hash;

        next(null);
      });
    })
    .catch(next);
});

User.methods.validatePassword = function validatePassword(password) {
  const user = this;
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return reject(err);
      }
      return resolve(isMatch);
    });
  });
};

mongoose.model('User', User);
