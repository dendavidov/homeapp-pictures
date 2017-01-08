const mongoose = require('mongoose');
const koa = require('koa');

const logger = require('./logger');

// 1. config
const config = require('./config');

// 2. connect to database
mongoose.connect(config.mongo.url);
mongoose.connection.on('error', (err) => {
  logger.error(err);
});

// 3. load the models

// 4. server
const app = module.exports = koa();

// 5. routes

// 6. start app
if (!module.parent) {
  app.listen(config.app.port);
  logger.info(`Server started, listening on port: ${config.app.port}`);
}

logger.info(`Environment: ${config.app.env}`);
