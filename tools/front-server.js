const koa = require('koa');
const serve = require('koa-static');
const router = require('koa-router')();
const log4js = require('log4js');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const koaWebpackDevMiddleware = require('koa-webpack-dev-middleware');
const koaWebpackHotMiddleware = require('koa-webpack-hot-middleware');

const compiler = webpack(webpackConfig);

const PORT_UI = 3001;

const app = koa();

app.use(koaWebpackDevMiddleware(compiler, {
  noInfo: false,
  publicPath: webpackConfig.output.publicPath,
}));

app.use(koaWebpackHotMiddleware(compiler));

router.all('/*', function *() {
  this.redirect('/');
});

app.use(router.routes());

app.use(serve('../build'));

app.listen(PORT_UI);

const logger = log4js.getLogger();

logger.info(`front-server at the ${PORT_UI} port has been started`);
