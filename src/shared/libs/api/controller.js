import { REQUEST_STATUSES } from './constants';

class ApiController {
  constructor(config) {
    this.config = config;
    this.initialState = {
      status: REQUEST_STATUSES.RESET,
      data: config.initialData || null,
      error: null,
    };
  }

  fetch = (params = {}) => dispatch =>
    dispatch({
      type: 'API',
      payload: { ...this.config, ...params },
    });

  reset = () => dispatch =>
    dispatch({
      type: `${this.config.prefix}_${this.config.method || 'get'}_${
        REQUEST_STATUSES.RESET
      }`,
    });

  reducer = (state = this.initialState, action) => {
    const { prefix, method = 'get' } = this.config;
    const { REQUEST, SUCCESS, ERROR, RESET } = REQUEST_STATUSES;

    switch (action.type) {
      case `${prefix}_${method}_${REQUEST}`:
        return {
          ...state,
          status: REQUEST,
          error: null,
        };
      case `${prefix}_${method}_${SUCCESS}`:
        return {
          status: SUCCESS,
          data: action.payload,
          error: null,
        };
      case `${prefix}_${method}_${ERROR}`:
        return {
          ...state,
          status: ERROR,
          error: action.payload,
        };
      case `${prefix}_${method}_${RESET}`:
        return this.initialState;
      default:
        return state;
    }
  };
}

export default ApiController;
