import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer as ReactHotLoader } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import Root from '../shared/components/root/Root';

import getRoutes from '../shared/routes';
import createStore from '../shared/createStore';

const store = createStore();

const supportsHistory = 'pushState' in window.history;

const initialize = () => {
  const routes = getRoutes(store);
  const app = (
    <ReactHotLoader>
      <Provider key="provider" store={store}>
        <BrowserRouter forceRefresh={!supportsHistory}>
          <Root routes={routes} />
        </BrowserRouter>
      </Provider>
    </ReactHotLoader>
  );

  ReactDOM.render(app, document.getElementById('app'));
};

window.addEventListener('DOMContentLoaded', initialize);
