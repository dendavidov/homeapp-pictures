import Koa from 'koa';

import './dbInit';
import middlewares from './middlewares';

const app = new Koa();

middlewares.errorLayer(app);
middlewares.cacheLayer(app);
middlewares.apiLayer(app);
middlewares.renderLayer(app);

export default app;
