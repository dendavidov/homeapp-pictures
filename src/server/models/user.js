const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const co = require('co');
const bcrypt = require('bcrypt');

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
UserSchema.pre('save', (done) => {
  // only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) {
    return done();
  }

  co.wrap(function*() {
    try {
      const salt = yield bcrypt.genSalt();
      this.password = yield bcrypt.hash(this.password, salt);
      done();
    } catch(err) {
      done(err);
    }
  }).call(this).then(done)
});

// methods
UserSchema.methods.comparePassword = function*(candidatePassword) {
  return yield bcrypt.compare(candidatePassword, this.password)
};

// statics
UserSchema.statics.passwordMatches = function*(username, password) {
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

