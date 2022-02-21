import { User } from 'types/Login';
import {
  USER_UPDATE,
  USER_RESET,
  USER_SIGNUP,
  VALID_PASSWORD,
} from '../../actions';

const initialState = {
  name: '',
  email: '',
  token: '',
  validPassword: false,
};

type DataUser = {
  type: 'USER_SIGNUP' | 'USER_UPDATE' | 'USER_RESET' | 'VALID_PASSWORD';
  payload: User;
};

const reducer = (state = initialState, action: DataUser) => {
  switch (action.type) {
    case USER_SIGNUP: {
      return { ...state, ...action.payload };
    }
    case USER_UPDATE: {
      return { ...state, ...action.payload };
    }
    case VALID_PASSWORD: {
      return { ...state, validPassword: action.payload };
    }
    case USER_RESET:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
