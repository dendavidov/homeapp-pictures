const Router = require('koa-router');

const authController = require('../controllers/authController');

function* secured(next) {
  if (this.isAuthenticated()) {
    yield next;
  } else {
    this.status = 401;
  }
}

module.exports = function(app, passport) {
  // register functions
  var router = new Router();

  router.use(function *(next) {
    this.type = "json";
    yield next;
  });

  router.get("/", function *() {
    this.type = "html";
    yield indexController.index.apply(this);
  });

  router.get("/auth", authController.getCurrentUser);
  router.post("/auth", authController.signIn);

  router.post("/signout", authController.signOut);
  router.post("/signup", authController.createUser);

  // secured routes
  app.use(router.routes());
};
