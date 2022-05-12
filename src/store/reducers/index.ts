import { combineReducers } from 'redux';
import userReducer from './user';
import configReducer from './config';

export default combineReducers({
  user: userReducer,
  config: configReducer,
});
