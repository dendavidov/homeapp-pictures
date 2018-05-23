import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import indexController from '../controllers/index-controller';

import Config from '../../config';

import logger from '../logger';

const API_PREFIX = Config.apiPrefix;

const apiLayer = app => {
  // eslint-disable-next-line no-param-reassign

  app.use(bodyParser());

  app.use(async (ctx, next) => {
    const body = { ...ctx.request.body };
    if (body.password) body.password = '[PASSWORD IS HIDDEN]';

    logger.info(`Body: ${JSON.stringify(body)}`);
    await next();
  });
  const router = new Router();

  router.get(`${API_PREFIX}`, indexController.getIndex);
  router.get(`${API_PREFIX}photoLabels`, indexController.getPhotoLabel);

  app.use(router.routes());

  return app;
};

export default apiLayer;
