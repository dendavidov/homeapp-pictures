const bodyParser = require('koa-bodyparser');
const errorHandler = require('koa-error');
const session = require('koa-generic-session');
const MongoStore = require('koa-generic-session-mongo');
const compress = require('koa-compress');
const responseTime = require('koa-response-time');

module.exports = (app, config, passport) => {
  if (!config.app.keys) { throw new Error('Please add session secret key in the config file!'); }
  /* eslint-disable no-param-reassign */
  app.keys = config.app.keys;
  /* eslint-enable no-param-reassign */

  app.use(errorHandler());

  app.use(session({
    key: 'koareactfullexample.sid',
    store: new MongoStore({ url: config.mongo.url }),
  }));

  app.use(bodyParser());
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(compress());
  app.use(responseTime());
};
