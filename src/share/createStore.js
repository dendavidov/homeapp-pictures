import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import createReducer from './reducers';

const middlewares = [thunkMiddleware];

const enhancers = [];

if (process.env.CLIENT) {
  // eslint-disable-next-line no-underscore-dangle
  if (window.__REDUX_DEVTOOLS_EXTENSION__) {
    // eslint-disable-next-line no-underscore-dangle
    enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
  }
}

export default function configureStore(initialState = {}) {
  const store = createStore(
    createReducer(),
    initialState,
    compose(applyMiddleware(...middlewares), ...enhancers)
  );
  store.asyncReducers = {};
  return store;
}

export function injectAsyncReducer(store, name, asyncReducer) {
  // eslint-disable-next-line no-param-reassign
  store.asyncReducers[name] = asyncReducer;
  store.replaceReducer(createReducer(store.asyncReducers));
}
