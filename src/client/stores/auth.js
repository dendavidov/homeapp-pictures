import request from 'superagent';

let initCalled = false;
let currentUser = null;
let changeListeners = [];

const URLS = {
  AUTH: 'auth',
  SIGN_UP: 'signup',
  SIGN_OUT: 'signout',
};

const getUrl = url => `http://localhost:3000/api/v1/${url}`;

function parseUser(user) {
  return {
    /* eslint-disable no-underscore-dangle */
    id: user._id,
    /* eslint-enable no-underscore-dangle */
    username: user.username,
  };
}

function postAndHandleParseUser(url, username, password, done) {
  request.post(url)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .send({ username, password })
    .end((err, res) => {
      if (!err && res.body && res.body.user) {
        currentUser = parseUser(res.body.user);
        /* eslint-disable no-use-before-define */
        AuthStore.notifyChange();
        /* eslint-enable no-use-before-define */
      }
      if (done) {
        done(err, currentUser);
      }
    });
}

const AuthStore = {
  init: function init() {
    if (initCalled) {
      return;
    }
    initCalled = true;
    this.fetchUser();
  },
  fetchUser: () => {
    request.get(getUrl(URLS.AUTH))
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (!err && res.body && res.body.user) {
          currentUser = parseUser(res.body.user);
        }
        AuthStore.notifyChange();
      });
  },
  signIn: (username, password, done) => {
    postAndHandleParseUser(getUrl(URLS.AUTH), username, password, done);
  },
  signUp: (username, password, done) => {
    postAndHandleParseUser(getUrl(URLS.SIGN_UP), username, password, done);
  },
  signOut: (done) => {
    currentUser = null;
    request.post(getUrl(URLS.SIGN_OUT))
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (!err) AuthStore.notifyChange();
        if (done) done(err, res);
      });
  },
  isLoggedIn: () => currentUser !== null,
  getUser: () => currentUser,
  notifyChange: () => {
    changeListeners.forEach((listener) => {
      listener();
    });
  },
  addChangeListener: (listener) => {
    changeListeners.push(listener);
  },
  removeChangeListener: (listener) => {
    changeListeners = changeListeners.filter(l => listener !== l);
  },
};

export default AuthStore;
