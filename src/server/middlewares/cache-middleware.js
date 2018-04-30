import koaStaticCache from 'koa-static-cache';

const cacheDirectory =
  process.env.NODE_ENV === 'production' ? 'distr' : 'build';

const cacheLayer = app => {
  app.use(
    koaStaticCache(cacheDirectory, { gzip: true, maxAge: 14 * 24 * 60 * 60 })
  );

  return app;
};

export default cacheLayer;
