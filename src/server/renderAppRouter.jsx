import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import Helmet from 'react-helmet';
import {
  AsyncComponentProvider,
  createAsyncContext,
} from 'react-async-component';
import { JobProvider, createJobContext } from 'react-jobs';
import asyncBootstrapper from 'react-async-bootstrapper';

import createStore from '../share/createStore';
import renderIndexPage from './libs/index-page';
import Root from '../share/components/root';

import getRoutes from '../share/routes';

import Auth from './controllers/authController';

import { setUser } from '../share/pages/backdoor/controller';

const IGNORED_FILES = ['/favicon.ico'];

export default function renderAppRouter() {
  return (ctx, next) =>
    new Promise(resolve => {
      const location = ctx.request.url;
      if (IGNORED_FILES.indexOf(location) >= 0) {
        resolve();
        return next();
      }

      const initialState = {};

      const store = createStore(initialState);

      store.dispatch(setUser(Auth.getCurrentUser(ctx)));

      const asyncComponentsContext = createAsyncContext();
      const jobContext = createJobContext();

      const routes = getRoutes(store);

      global.navigator = global.navigator || {};
      global.navigator.userAgent = ctx.request.headers['user-agent'] || 'all';

      const context = {};
      const app = (
        <AsyncComponentProvider asyncContext={asyncComponentsContext}>
          <JobProvider jobContext={jobContext}>
            <StaticRouter location={location} context={context}>
              <Provider store={store}>
                <Root routes={routes} />
              </Provider>
            </StaticRouter>
          </JobProvider>
        </AsyncComponentProvider>
      );

      asyncBootstrapper(app).then(() => {
        const jobsState = jobContext.getState();
        const head = Helmet.rewind();
        ctx.body = renderIndexPage(
          renderToString(app),
          head,
          store.getState(),
          asyncComponentsContext.getState(),
          jobsState
        );

        ctx.status = context.status;
        return resolve();
      });
      return next();
    });
}
