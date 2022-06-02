import { combineReducers } from 'redux';
import userReducer from './user';
import configReducer from './config';
import frequencyReducer from './frequency';

export default combineReducers({
  user: userReducer,
  config: configReducer,
  frequency: frequencyReducer,
});
