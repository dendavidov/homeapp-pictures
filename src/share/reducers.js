import { combineReducers } from 'redux';
import user from './pages/backdoor/controller';

const createReducer = asyncReducers =>
  combineReducers({
    user,
    ...asyncReducers,
  });

export default createReducer;
