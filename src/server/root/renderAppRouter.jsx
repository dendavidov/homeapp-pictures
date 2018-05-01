import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import {
  AsyncComponentProvider,
  createAsyncContext,
} from 'react-async-component';
import { JobProvider, createJobContext } from 'react-jobs';
import asyncBootstrapper from 'react-async-bootstrapper';

import getRoutes from '../../shared/routes';
import createStore from '../../shared/createStore';

import getClientBundleEntryAssets from './getClientBundleEntryAssets';

import Html from './Html';

import Root from '../../shared/components/root/Root';

const IGNORED_FILES = ['/favicon.ico'];

const clientEntryAssets = getClientBundleEntryAssets();

export default function renderAppRouter() {
  return (ctx, next) =>
    new Promise(resolve => {
      const location = ctx.request.url;
      if (IGNORED_FILES.indexOf(location) >= 0) {
        return next();
      }

      const initialState = {};
      const store = createStore(initialState, ctx.request);

      const asyncComponentsContext = createAsyncContext();
      const jobContext = createJobContext();

      const context = {};

      const routes = getRoutes(store);

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

      const appString = renderToString(app);

      asyncBootstrapper(app).then(() => {
        ctx.body = `<!doctype html>${renderToString(
          <Html
            reactAppString={appString}
            script={clientEntryAssets.js}
            style={clientEntryAssets.css}
            initialState={store.getState()}
            asyncState={asyncComponentsContext.getState()}
            jobsState={jobContext.getState()}
          />
        )}`;

        ctx.status = 200;
        return resolve();
      });
      return next();
    });
}
