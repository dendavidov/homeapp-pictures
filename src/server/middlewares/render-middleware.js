import Router from 'koa-router';

import renderAppRouter from '../renderAppRouter';

const renderLayer = app => {
  const router = new Router();

  router.get('/(.*)', renderAppRouter());
  app.use(router.routes());

  return app;
};

export default renderLayer;
