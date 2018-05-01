import Router from 'koa-router';
import session from 'koa-session';
import bodyParser from 'koa-bodyparser';
import passport from 'koa-passport';
import indexController from '../controllers/index-controller';
import authController from '../controllers/auth-controller';
import todosController from '../controllers/todos-controller';

import Config from '../../config';

import '../libs/auth';
import logger from '../logger';

const API_PREFIX = Config.apiPrefix;

const crudConfig = [
  {
    domain: 'todos',
    controller: todosController,
    authRequired: ['editItem', 'addItem', 'deleteItems'],
  },
];

// todo refactor it
const addCrud = router => {
  crudConfig.forEach(item => {
    if (typeof item.controller.getList === 'function')
      router.get(
        `${API_PREFIX}${item.domain}`,
        item.authRequired.includes('getList')
          ? authController.checkAuth
          : authController.ignoreAuth,
        item.controller.getList
      );
    if (typeof item.controller.getItem === 'function')
      router.get(
        `${API_PREFIX}${item.domain}/:id`,
        item.authRequired.includes('getItem')
          ? authController.checkAuth
          : authController.ignoreAuth,
        item.controller.getItem
      );

    if (typeof item.controller.editItem === 'function')
      router.put(
        `${API_PREFIX}${item.domain}/:id`,
        item.authRequired.includes('editItem')
          ? authController.checkAuth
          : authController.ignoreAuth,
        item.controller.editItem
      );
    if (typeof item.controller.addItem === 'function')
      router.post(
        `${API_PREFIX}${item.domain}`,
        item.authRequired.includes('addItem')
          ? authController.checkAuth
          : authController.ignoreAuth,
        item.controller.addItem
      );
    if (typeof item.controller.deleteItems === 'function')
      router.delete(
        `${API_PREFIX}${item.domain}`,
        item.authRequired.includes('deleteItems')
          ? authController.checkAuth
          : authController.ignoreAuth,
        item.controller.deleteItems
      );
  });
};

const apiLayer = app => {
  // eslint-disable-next-line no-param-reassign
  app.keys = [Config.token];
  app.use(session({}, app));

  app.use(bodyParser());

  app.use(async (ctx, next) => {
    const body = { ...ctx.request.body };
    if (body.password) body.password = '[PASSWORD IS HIDDEN]';

    logger.info(`Body: ${JSON.stringify(body)}`);
    await next();
  });

  app.use(passport.initialize());
  app.use(passport.session());

  const router = new Router();

  router.post(`${API_PREFIX}user/sign-up`, authController.signUp);
  router.get(`${API_PREFIX}user`, authController.getCurrentUser);
  router.post(`${API_PREFIX}user/sign-in`, authController.signIn);
  router.post(`${API_PREFIX}user/sign-out`, authController.signOut);

  addCrud(router);

  router.get(`${API_PREFIX}`, indexController.getIndex);

  app.use(router.routes());

  return app;
};

export default apiLayer;
