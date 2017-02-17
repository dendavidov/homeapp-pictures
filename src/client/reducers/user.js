import UserConstants from '../constants/user';

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  user: null,
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case UserConstants.FETCH_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case UserConstants.FETCH_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: Boolean(action.user) && Boolean(action.user.username),
        user: action.user,
      };
    case UserConstants.FETCH_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        name: null,
      };

    case UserConstants.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case UserConstants.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: action.user !== undefined,
        user: action.user,
      };
    case UserConstants.LOGIN_FAIL:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        name: null,
      };

    case UserConstants.LOGOUT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case UserConstants.LOGOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        name: null,
      };
    case UserConstants.LOGOUT_FAIL:
      return {
        ...state,
        isLoading: false,
      };

    case UserConstants.SIGNUP_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case UserConstants.SIGNUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: action.user !== undefined,
        user: action.user,
      };
    case UserConstants.SIGNUP_FAIL:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        name: null,
      };
    default:
      return state;
  }
}
