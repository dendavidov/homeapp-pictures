import request from 'superagent';

import { dispatch } from '../stores/configureStore';
import UserConstants from '../constants/user';

const URLS = {
  AUTH: 'auth',
  SIGN_UP: 'signup',
  SIGN_OUT: 'signout',
};

const getUrl = url => `http://localhost:3000/api/v1/${url}`;

const fetchUser = () => new Promise((resolve, reject) => {
  dispatch({
    type: UserConstants.FETCH_USER_REQUEST,
  });
  request.get(getUrl(URLS.AUTH))
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .end((err, res) => {
      if (err) {
        reject(dispatch({
          type: UserConstants.FETCH_USER_FAIL,
          error: err,
        }));
      }
      if (!err && res.body && res.body.user) {
        resolve(dispatch({
          type: UserConstants.FETCH_USER_SUCCESS,
          user: res.body.user,
        }));
        return;
      }
      resolve(dispatch({
        type: UserConstants.FETCH_USER_SUCCESS,
        user: null,
      }));
    });
});

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
          error: err,
        }));
      }
      if (!err && res.body && res.body.user) {
        resolve(dispatch({
          type: UserConstants.LOGIN_SUCCESS,
          user: res.body.user,
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
    .end((err, res) => {
      if (!err && res.body && res.body.user) {
        resolve(dispatch({
          type: UserConstants.LOGOUT_SUCCESS,
        }));
        return;
      }
      reject(dispatch({
        type: UserConstants.LOGOUT_FAIL,
        error: err,
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
      if (!err && res.body && res.body.user) {
        resolve(dispatch({
          type: UserConstants.SIGNUP_SUCCESS,
          user: res.body.user,
        }));
        return;
      }
      reject(dispatch({
        type: UserConstants.SIGNUP_FAIL,
        error: err,
      }));
    });
});

export default {
  fetchUser,
  signIn,
  signOut,
  signUp,
};
