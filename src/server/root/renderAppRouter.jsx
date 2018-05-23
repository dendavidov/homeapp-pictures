import React from 'react';
import { renderToString } from 'react-dom/server';

import getClientBundleEntryAssets from './getClientBundleEntryAssets';

import Html from './Html';

const IGNORED_FILES = ['/favicon.ico'];

const clientEntryAssets = getClientBundleEntryAssets();

export default function renderAppRouter() {
  return (ctx, next) => {
    const location = ctx.request.url;
    if (IGNORED_FILES.indexOf(location) >= 0) {
      return next();
    }

    ctx.body = `<!doctype html>${renderToString(
      <Html script={clientEntryAssets.js} style={clientEntryAssets.css} />
    )}`;
    ctx.status = 200;

    return next();
  };
}
