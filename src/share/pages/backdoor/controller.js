import { handleActions } from 'redux-actions';

import {
  post,
  FETCH_STATUSES,
  createFetchConstAndActions,
} from '../../helpers/fetch';

export const mountPoint = 'user';

const fetch = createFetchConstAndActions(mountPoint);

export const signIn = credentials => async dispatch => {
  dispatch(fetch.start());
  try {
    const data = await post('user/sign-in', credentials);
    dispatch(fetch.success(data.username));
  } catch (error) {
    dispatch(fetch.error(error.message));
  }
};

export const signOut = () => async dispatch => {
  dispatch(fetch.start());
  try {
    await post('user/sign-out');
    dispatch(fetch.success(null));
  } catch (error) {
    dispatch(fetch.error(error.message));
  }
};

export const setUser = fetch.success;

export default handleActions(
  {
    [fetch.START]: state => ({
      ...state,
      errorMessage: null,
      status: FETCH_STATUSES.FETCHING,
    }),
    [fetch.SUCCESS]: (state, { payload: username }) => ({
      ...state,
      errorMessage: null,
      status: FETCH_STATUSES.FETCHED,
      username,
    }),
    [fetch.ERROR]: (state, { payload: errorMessage }) => ({
      ...state,
      errorMessage,
      status: FETCH_STATUSES.ERROR,
    }),
  },
  {
    status: FETCH_STATUSES.NOT_FETCHED,
    errorMessage: null,
    username: null,
  }
);
