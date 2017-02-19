import request from 'superagent';

import { dispatch } from '../stores/configureStore';
import UserConstants from '../constants/user';

const URLS = {
  AUTH: 'auth',
  SIGN_UP: 'signup',
  SIGN_OUT: 'signout',
};

const getUrl = url => `http://localhost:3000/api/v1/${url}`;

const fetchUser = () => {
  dispatch({
    type: UserConstants.FETCH_USER_REQUEST,
  });
  request.get(getUrl(URLS.AUTH))
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .end((err, res) => {
      if (err) {
        dispatch({
          type: UserConstants.FETCH_USER_FAIL,
          data: {
            error: err.message,
          },
        });
        return;
      }
      if (!err && res.body && res.body.user && res.body.user.id) {
        dispatch({
          type: UserConstants.FETCH_USER_SUCCESS,
          data: {
            user: res.body.user,
          },
        });
        return;
      }
      dispatch({
        type: UserConstants.FETCH_USER_FAIL,
      });
    });
};

const signIn = (username, password) => new Promise((resolve, reject) => {
  dispatch({
    type: UserConstants.LOGIN_REQUEST,
  });

  request.post(getUrl(URLS.AUTH))
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .send({ username, password })
    .end((err, res) => {
      if (err) {
        reject(dispatch({
          type: UserConstants.LOGIN_FAIL,
          data: {
            error: err,
          },
        }));
      }
      if (!err && res.body && res.body.user) {
        resolve(dispatch({
          type: UserConstants.LOGIN_SUCCESS,
          data: {
            user: res.body.user,
          },
        }));
      }
    });
});

const signOut = () => new Promise((resolve, reject) => {
  dispatch({
    type: UserConstants.LOGOUT_REQUEST,
  });

  request.post(getUrl(URLS.SIGN_OUT))
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .end((err) => {
      if (!err) {
        resolve(dispatch({
          type: UserConstants.LOGOUT_SUCCESS,
        }));
        return;
      }
      reject(dispatch({
        type: UserConstants.LOGOUT_FAIL,
        data: {
          error: err,
        },
      }));
    });
});

const signUp = (username, password) => new Promise((resolve, reject) => {
  dispatch({
    type: UserConstants.SIGNUP_REQUEST,
  });

  request.post(getUrl(URLS.SIGN_UP))
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .send({ username, password })
    .end((err, res) => {
      if (!err && res.body && res.body.user && res.body.user.id) {
        resolve(dispatch({
          type: UserConstants.SIGNUP_SUCCESS,
          data: {
            user: res.body.user,
          },
        }));
        return;
      }
      reject(dispatch({
        type: UserConstants.SIGNUP_FAIL,
        data: {
          error: err.message,
        },
      }));
    });
});

export default {
  fetchUser,
  signIn,
  signOut,
  signUp,
};
