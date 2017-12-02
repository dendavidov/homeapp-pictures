import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import asyncBootstrapper from 'react-async-bootstrapper';
import { JobProvider } from 'react-jobs';
import { AsyncComponentProvider } from 'react-async-component';

import getRoutes from './share/routes';
import Root from './share/components/root';
import createStore from './share/createStore';

const store = createStore(window.INITIAL_STATE);
const asyncComponentsRehydrateState = window.ASYNC_STATE;
const jobsState = window.JOBS_STATE;

const supportsHistory = 'pushState' in window.history;

function initialize() {
  const routes = getRoutes(store);
  const app = (
    <AsyncComponentProvider rehydrateState={asyncComponentsRehydrateState}>
      <JobProvider rehydrateState={jobsState}>
        <Provider key="provider" store={store}>
          <BrowserRouter forceRefresh={!supportsHistory}>
            <Root routes={routes} />
          </BrowserRouter>
        </Provider>
      </JobProvider>
    </AsyncComponentProvider>
  );

  asyncBootstrapper(app).then(() => {
    ReactDOM.render(app, document.getElementById('react-root'));
  });
}

initialize();
