import Router from 'koa-router';
import session from 'koa-session';
import bodyParser from 'koa-bodyparser';
import passport from 'koa-passport';
import apiController from '../controllers/apiController';
import authController from '../controllers/authController';
import Config from '../../config';

import '../libs/auth';

const API_PREFIX = Config.apiPrefix;

const apiLayer = app => {
  // eslint-disable-next-line no-param-reassign
  app.keys = [Config.token];
  app.use(session({}, app));

  app.use(bodyParser());

  app.use(passport.initialize());
  app.use(passport.session());

  const router = new Router();

  router.post(`${API_PREFIX}user/sign-up`, authController.signUp);
  router.get(`${API_PREFIX}user`, authController.getCurrentUser);
  router.post(`${API_PREFIX}user/sign-in`, authController.signIn);
  router.post(`${API_PREFIX}user/sign-out`, authController.signOut);


  router.get(`${API_PREFIX}`, apiController.getIndex);

  app.use(router.routes());

  return app;
};

export default apiLayer;
