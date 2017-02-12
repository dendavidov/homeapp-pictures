const bodyParser = require('koa-bodyparser');
const compress = require('koa-compress');
const responseTime = require('koa-response-time');

module.exports = (app, config, passport) => {
  app.use(bodyParser());
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(compress());
  app.use(responseTime());
};
