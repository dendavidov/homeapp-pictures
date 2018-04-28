import React from 'react';
import { renderToString } from 'react-dom/server';

import getClientBundleEntryAssets from './middlewares/getClientBundleEntryAssets';

import Html from '../client/Html';

import App from '../client/App';

const IGNORED_FILES = ['/favicon.ico'];

const clientEntryAssets = getClientBundleEntryAssets();

export default function renderAppRouter() {
  return (ctx, next) => {
    const location = ctx.request.url;
    if (IGNORED_FILES.indexOf(location) >= 0) {
      return next();
    }

    const app = <App />;

    const appString = renderToString(app);

    console.log('clientEntryAssets', clientEntryAssets);

    ctx.body = `<!doctype html>${renderToString(
      <Html reactAppString={appString} script={clientEntryAssets.js}/>
    )}`;

    ctx.status = 200;
    next();
  };
}
