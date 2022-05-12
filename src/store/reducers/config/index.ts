import { ConfigData } from 'types/Config';
import { CONFIG } from './../../actions/index';

const initialState = {
  microphone: false,
};

type DataConfig = {
  type: 'CONFIG';
  payload: ConfigData;
};

const reducer = (state = initialState, action: DataConfig) => {
  switch (action.type) {
    case CONFIG: {
      return { ...state, ...action.payload };
    }
    default:
      return state;
  }
};

export default reducer;
