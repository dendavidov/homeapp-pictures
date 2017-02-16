import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../constants/user';

const initialState = JSON.parse(window.localStorage.getItem('rr_user')) || {};

export default function userState(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {};
    case LOGIN_SUCCESS:
      return {
        ...state,
        name: action.payload.name,
        isAuthenticated: action.payload.isAuthenticated,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        name: null,
        isAuthenticated: false,
      };
    case LOGOUT_SUCCESS:
      return {};
    default:
      return state;
  }
}
