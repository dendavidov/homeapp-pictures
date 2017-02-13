const Router = require('koa-router');
const config = require('./config');

const authController = require('../controllers/authController');

function* secured(next) {
  if (this.isAuthenticated()) {
    yield next;
  } else {
    this.status = 401;
  }
}

module.exports = function routes(app) {
  const apiPrefix = config.app.apiPrefix;
  console.log('apiPrefix', apiPrefix);
  // register functions
  const router = new Router();

  router.use(function* json(next) {
    this.type = 'json';
    yield next;
  });

  router.get(`${apiPrefix}/auth`, authController.getCurrentUser);
  router.post(`${apiPrefix}/auth`, authController.signIn);

  router.post(`${apiPrefix}/signout`, authController.signOut);
  router.post(`${apiPrefix}/signup`, authController.createUser);

  // secured routes
  app.use(router.routes());
};
