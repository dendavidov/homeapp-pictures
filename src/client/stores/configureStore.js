import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';

const store = compose(
  applyMiddleware(thunkMiddleware),
)(createStore)(rootReducer);

if (module.hot) {
  module.hot.accept('../reducers', () => {
    /* eslint-disable global-require */
    const nextRootReducer = require('../reducers');
    /* eslint-enable global-require */
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
export const dispatch = store.dispatch;
