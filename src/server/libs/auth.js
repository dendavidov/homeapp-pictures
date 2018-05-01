import passport from 'koa-passport';
import LocalStrategy from 'passport-local';
import mongoose from 'mongoose';

const User = mongoose.model('User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id, done);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

passport.use(
  'local',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
    },
    async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
        if (!user) {
          return done(null, false);
        }
        const isMatch = await user.validatePassword(password);
        return done(null, isMatch ? user : false);
      } catch (err) {
        return done(err);
      }
    }
  )
);
