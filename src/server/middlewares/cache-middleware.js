import koaStaticCache from 'koa-static-cache';

const cacheLayer = app => {
  app.use(
    koaStaticCache('build/client', { gzip: true, maxAge: 14 * 24 * 60 * 60 })
  );

  return app;
};

export default cacheLayer;
