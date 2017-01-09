const mongoose = require('mongoose');
const koa = require('koa');
const passport = require('koa-passport');
const fs = require('fs');

const logger = require('./logger');

// 1. config
const config = require('./config/config');

// 2. connect to database
mongoose.connect(config.mongo.url);
mongoose.connection.on('error', (err) => {
  logger.error(err);
});

// 3. load the models
const modelPath = `${config.app.root}/src/server/models`;
fs.readdirSync(modelPath).forEach((file) => {
  if (~file.indexOf('js')) {
    require(`${modelPath}/${file}`);
  }
});

// 4. server
const app = module.exports = koa();
require('./config/passport')(passport, config);
require('./config/koa')(app, config, passport);

// 5. routes
require("./config/routes")(app, passport);

// 6. start app
if (!module.parent) {
  app.listen(config.app.port);
  logger.info(`Server started, listening on port: ${config.app.port}`);
}

logger.info(`Environment: ${config.app.env}`);
