import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const User = new mongoose.Schema(
  {
    type: { type: String, default: 'User' },
    name: { type: String },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        /* eslint-disable no-param-reassign, no-underscore-dangle */
        delete ret._id;
        delete ret.__v;
        ret.id = doc._id;
        /* eslint-enable no-param-reassign, no-underscore-dangle */
      },
    },
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
