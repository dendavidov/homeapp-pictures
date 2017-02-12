const mongoose = require('mongoose');
const co = require('co');

const bcrypt = require('../lib/bcrypt-thunk');

const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
}, {
  toJSON: {
    transform: (doc, ret, options) => {
      delete ret.password;
    },
  },
});

// middlewares:
UserSchema.pre('save', function (done) {
  // only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) {
    return done();
  }

  return co.wrap(function* wrap() {
    try {
      const salt = yield bcrypt.genSalt();
      this.password = yield bcrypt.hash(this.password, salt);
      done();
    } catch (err) {
      done(err);
    }
  }).call(this).then(done);
});

// methods
UserSchema.methods.comparePassword = function* comparePassword(candidatePassword) {
  return yield bcrypt.compare(candidatePassword, this.password)
};

// statics
UserSchema.statics.passwordMatches = function* passwordMatches(username, password) {
  const user = yield this.findOne({ username: username.toLowerCase() }).exec();
  if (!user) {
    throw new Error('User not found');
  }

  if (yield user.comparePassword(password)) {
    return user;
  }

  throw new Error('Password does not match');
};

mongoose.model('User', UserSchema);

