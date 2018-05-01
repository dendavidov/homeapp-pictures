import apiLayer from './api-middleware';
import renderLayer from './render-middleware';
import cacheLayer from './cache-middleware';
import errorLayer from './error-middleware';
import loggerLayer from './logger-middleware';

export default {
  apiLayer,
  loggerLayer,
  renderLayer,
  cacheLayer,
  errorLayer,
};
