import { combineReducers } from 'redux';
import userReducer from './user';
import configReducer from './config';
import progressReducer from './progress';
import frequencyReducer from './frequency';

export default combineReducers({
  user: userReducer,
  config: configReducer,
  progress: progressReducer,
  frequency: frequencyReducer,
});
