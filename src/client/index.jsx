import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer as ReactHotLoader } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import asyncBootstrapper from 'react-async-bootstrapper';
import { JobProvider } from 'react-jobs';
import { AsyncComponentProvider } from 'react-async-component';

import Root from '../shared/components/root/Root';

import getRoutes from '../shared/routes';
import createStore from '../shared/createStore';

const store = createStore(window.INITIAL_STATE);
const asyncComponentsRehydrateState = window.ASYNC_STATE;
const jobsState = window.JOBS_STATE;

const supportsHistory = 'pushState' in window.history;

const initialize = () => {
  const routes = getRoutes(store);
  const app = (
    <ReactHotLoader>
      <AsyncComponentProvider rehydrateState={asyncComponentsRehydrateState}>
        <JobProvider rehydrateState={jobsState}>
          <Provider key="provider" store={store}>
            <BrowserRouter forceRefresh={!supportsHistory}>
              <Root routes={routes} />
            </BrowserRouter>
          </Provider>
        </JobProvider>
      </AsyncComponentProvider>
    </ReactHotLoader>
  );
  asyncBootstrapper(app).then(() => {
    ReactDOM.hydrate(app, document.getElementById('app'));
  });
};

window.addEventListener('DOMContentLoaded', initialize);
