import logger from '../logger';

const loggerLayer = app => {
  app.use(async (ctx, next) => {
    const log = [];
    log.push(`New request from ip ${ctx.ip}:`);
    log.push(`UserAgent: ${ctx.request.header['user-agent']}`);
    log.push(`Method: ${ctx.request.method}`);
    log.push(`Url: ${ctx.request.url}`);

    logger.info(log.join('\n'));
    await next();
  });
  return app;
};

export default loggerLayer;
