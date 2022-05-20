import { FREQUENCY } from './../../actions/index';

const initialState = {
  value: 0,
};

type FrequencyConfig = {
  type: 'FREQUENCY';
  payload: number;
};

const reducer = (state = initialState, action: FrequencyConfig) => {
  switch (action.type) {
    case FREQUENCY: {
      return { ...state, value: action.payload };
    }
    default:
      return state;
  }
};

export default reducer;
