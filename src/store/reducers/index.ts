import { combineReducers } from 'redux';
import userReducer from './user';
import configReducer from './config';
import progressReducer from './progress';

export default combineReducers({
  user: userReducer,
  config: configReducer,
  progress: progressReducer,
});
