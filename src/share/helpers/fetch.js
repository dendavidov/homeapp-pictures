import isomorphicFetch from 'isomorphic-fetch';
import { createAction } from 'redux-actions';
import qs from 'qs';

import Config from '../../config';

export const FETCH_STATUSES = {
  NOT_FETCHED: 'NOT_FETCHED',
  FETCHING: 'FETCHING',
  FETCHED: 'FETCHED',
  ERROR: 'ERROR',
};

const getBaseUrl = () => {
  if (process.env.CLIENT) {
    return '';
  }
  const protocol = process.env.PROTOCOL || 'http';
  const hostname = process.env.HOSTNAME || 'localhost';
  const port = process.env.PORT || 3000;

  if (process.env.HOSTNAME === 'dendavidov.com') {
    return `${protocol}://${hostname}`;
  }

  if (!port) {
    throw new Error("Missing 'process.env.PORT'.");
  }

  return `${protocol}://${hostname}:${port}`;
};

const baseUrl = getBaseUrl();

const fetch = (url, options) =>
  isomorphicFetch(`${baseUrl}${url}`, {
    mode: baseUrl ? 'cors' : 'same-origin',
    credentials: baseUrl ? 'include' : 'same-origin',
    ...options,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(options && options.headers),
    },
  });

export const get = async (url, options) => {
  const queryString =
    (options &&
      options.params &&
      qs.stringify(options.params, { addQueryPrefix: true })) ||
    '';

  const response = await fetch(Config.apiPrefix + url + queryString, options);
  if (response.status > 400) {
    throw new Error(response.statusText);
  }
  const responseBody = await response.json();
  if (responseBody && responseBody.success) {
    return responseBody.data;
  }
  throw new Error(responseBody && responseBody.message);
};

export const post = async (url, body, options = {}) => {
  const response = await fetch(Config.apiPrefix + url, {
    ...options,
    method: 'POST',
    body: JSON.stringify(body),
  });
  if (response.status > 400) {
    throw new Error(response.statusText);
  }
  const responseBody = await response.json();
  if (responseBody && responseBody.success) {
    return responseBody.data;
  }
  throw new Error(responseBody && responseBody.message);
};

export const createFetchConstAndActions = mountPoint => ({
  START: `${mountPoint}.START`,
  ERROR: `${mountPoint}.ERROR`,
  SUCCESS: `${mountPoint}.SUCCESS`,
  CLEAR: `${mountPoint}.CLEAR`,
  start: createAction(`${mountPoint}.START`),
  error: createAction(`${mountPoint}.ERROR`),
  success: createAction(`${mountPoint}.SUCCESS`),
  clear: createAction(`${mountPoint}.CLEAR`),
});
