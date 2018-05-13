import axios from 'axios';

import { REQUEST_STATUSES } from './constants';

const apiMiddleware = ({ dispatch, getState }) => next => action => {
  if (action.type !== 'API') {
    return next(action);
  }
  const {
    prefix,
    method = 'get',
    url,
    body = null,
    onSuccess,
    onError,
    headers = {},
    urlPostfix,
    dataProcessor,
    ...axiosParams
  } = action.payload;

  if (typeof prefix !== 'string' || prefix.length === 0)
    throw new Error('payload.prefix should be string and have length > 0');

  if (typeof url !== 'string' || url.length === 0)
    throw new Error('payload.url should be string and have length > 0');

  const { REQUEST, SUCCESS, ERROR } = REQUEST_STATUSES;

  dispatch({
    type: `${prefix}_${method}_${REQUEST}`,
    payload: {
      status: REQUEST,
    },
  });

  const server =
    process.env.SERVER === 'true' ? `http://localhost:${process.env.PORT}` : '';

  return axios({
    method,
    url: urlPostfix ? `${server}${url}/${urlPostfix}` : `${server}${url}`,
    data: body,
    headers: { ...headers },
    ...axiosParams,
  })
    .then(({ data }) => {
      if (!data.success) {
        throw new Error(data.message || 'Unknown error');
      }

      const payload =
        typeof dataProcessor === 'function'
          ? dataProcessor(data.data)
          : data.data;

      dispatch({
        type: `${prefix}_${method}_${SUCCESS}`,
        payload,
      });
      if (typeof onSuccess === 'function') onSuccess(data, dispatch, getState);
      return payload;
    })
    .catch(error => {
      dispatch({
        type: `${prefix}_${method}_${ERROR}`,
        payload: error.message,
      });
      if (typeof onError === 'function')
        onError(error.message, dispatch, getState);
      return false;
    });
};

export default apiMiddleware;
