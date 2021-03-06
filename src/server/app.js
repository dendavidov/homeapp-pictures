import Koa from 'koa';

import './mysqlInit';

import middlewares from './middlewares';

const app = new Koa();

middlewares.loggerLayer(app);
middlewares.errorLayer(app);
middlewares.cacheLayer(app);
middlewares.apiLayer(app);
middlewares.renderLayer(app);

export default app;
