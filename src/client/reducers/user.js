import UserConstants from '../constants/user';

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  isLocalLoading: false,
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
        isAuthenticated: Boolean(action.data.user) && Boolean(action.data.user.username),
        isLoading: false,
        user: action.data.user,
      };
    case UserConstants.FETCH_USER_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        name: null,
      };

    case UserConstants.LOGIN_REQUEST:
      return {
        ...state,
        isLocalLoading: true,
      };
    case UserConstants.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: Boolean(action.data.user && action.data.user.id),
        isLocalLoading: false,
        user: action.data.user,
      };
    case UserConstants.LOGIN_FAIL:
      return {
        ...state,
        isLocalLoading: false,
        isAuthenticated: false,
        name: null,
      };

    case UserConstants.LOGOUT_REQUEST:
      return {
        ...state,
        isLocalLoading: true,
      };
    case UserConstants.LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        isLocalLoading: false,
        name: null,
      };
    case UserConstants.LOGOUT_FAIL:
      return {
        ...state,
        error: action.data.error,
        isLocalLoading: false,
      };

    case UserConstants.SIGNUP_REQUEST:
      return {
        ...state,
        isLocalLoading: true,
      };
    case UserConstants.SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticated: Boolean(action.data.user && action.data.user.id),
        isLocalLoading: false,
        user: action.data.user,
      };
    case UserConstants.SIGNUP_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        isLocalLoading: false,
        user: null,
      };
    default:
      return state;
  }
}
