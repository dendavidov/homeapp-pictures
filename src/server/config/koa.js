const bodyParser = require('koa-bodyparser');
const compress = require('koa-compress');
const responseTime = require('koa-response-time');

module.exports = (app, config, passport) => {
  app.use(bodyParser());
  app.use(passport.initialize());
  app.use(passport.session());

  // app.use(function* (next) {
  //   this.render = views(`${config.app.root}/src/server/views`, {
  //     map: { html: 'swig' },
  //     cache: config.app.env === 'development' ? 'memory' : false,
  //   });
  //   yield next;
  // });

  app.use(compress());
  app.use(responseTime());
};
