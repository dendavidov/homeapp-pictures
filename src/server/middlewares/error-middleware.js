import HTTPStatus from 'http-status';

const errorLayer = app => {
  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      ctx.status = err.status || HTTPStatus.INTERNAL_SERVER_ERROR;
      ctx.body = {
        success: false,
        message: err.message,
      };
      ctx.app.emit('error', err, ctx);
    }
  });
  return app;
};

export default errorLayer;
