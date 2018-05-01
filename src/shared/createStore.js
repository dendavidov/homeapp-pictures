import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from './redux';

const middlewares = [thunkMiddleware];

const enhancers = [];

if (
  process.env.NODE_ENV === 'development' &&
  typeof window !== 'undefined' &&
  typeof window.devToolsExtension === 'function'
) {
  enhancers.push(window.devToolsExtension());
}

export default function configureStore(initialState = {}) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middlewares), ...enhancers)
  );
  store.asyncReducers = {};

  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./redux', () => {
      // eslint-disable-next-line global-require
      const nextRootReducer = require('./redux').default;

      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
