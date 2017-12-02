import HTTPStatus from 'http-status';
import MongoErrors from 'mongo-errors';
import mongoose from 'mongoose';
import passport from 'koa-passport';

import Config from '../../config';

const User = mongoose.model('User');

const signUp = async ctx => {
  if (!Config.isRegEnabled) {
    ctx.throw(HTTPStatus.FORBIDDEN);
  }

  if (
    !(
      ctx.request.body &&
      ctx.request.body.username &&
      ctx.request.body.password
    )
  ) {
    ctx.throw(HTTPStatus.BAD_REQUEST);
    return;
  }

  try {
    const user = new User({
      username: ctx.request.body.username,
      password: ctx.request.body.password,
    });
    await user.save();
    await ctx.login(user);

    ctx.body = {
      success: true,
      username: ctx.state.user.username,
    };
  } catch (err) {
    if (err.code === MongoErrors.DuplicateKey) {
      ctx.throw(HTTPStatus.CONFLICT);
    }

    ctx.throw(HTTPStatus.INTERNAL_SERVER_ERROR);
  }
};

const signIn = ctx => {
  if (
    !(
      ctx.request.body &&
      ctx.request.body.username &&
      ctx.request.body.password
    )
  ) {
    ctx.throw(HTTPStatus.BAD_REQUEST);
  }

  return passport.authenticate('local', (err, user) => {
    if (user === false) {
      ctx.throw(HTTPStatus.UNAUTHORIZED);
    }
    ctx.login(user);
    ctx.body = {
      success: true,
      data: {
        username: user && user.username,
      },
    };
  })(ctx);
};

const signOut = ctx => {
  ctx.logout();
  ctx.body = {
    success: true,
  };
};

const getCurrentUser = ctx => (ctx.state.user ? ctx.state.user.username : null);

const checkAuth = (ctx, next) => {
  if (!ctx.state.user) {
    ctx.throw(HTTPStatus.UNAUTHORIZED);
  }
  return next();
};

export default {
  signUp,
  signIn,
  signOut,
  getCurrentUser,
  checkAuth,
};
