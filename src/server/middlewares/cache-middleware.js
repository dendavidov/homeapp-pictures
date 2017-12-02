import koaStaticCache from 'koa-static-cache';
import koaConvert from 'koa-convert';

const cacheLayer = app => {
  app.use(
    koaConvert(
      koaStaticCache('static', { gzip: true, maxAge: 14 * 24 * 60 * 60 })
    )
  );

  return app;
};

export default cacheLayer;
