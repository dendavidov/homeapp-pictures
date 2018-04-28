import Koa from 'koa';

import middlewares from './middlewares';

const app = new Koa();

middlewares.errorLayer(app);
middlewares.cacheLayer(app);
middlewares.renderLayer(app);

export default app;
