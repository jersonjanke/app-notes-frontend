import { PROGRESS } from './../../actions/index';

const initialState = {
  value: 0,
};

type DataConfig = {
  type: 'PROGRESS';
  payload: number;
};

const reducer = (state = initialState, action: DataConfig) => {
  switch (action.type) {
    case PROGRESS: {
      return { ...state, value: action.payload };
    }
    default:
      return state;
  }
};

export default reducer;
