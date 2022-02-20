import { User } from 'types/Login';
import { USER_UPDATE, USER_RESET, USER_SIGNUP } from '../../actions';

const initialState = {
  name: '',
  email: '',
  token: '',
};

type DataUser = {
  type: 'USER_SIGNUP' | 'USER_UPDATE' | 'USER_RESET';
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
    case USER_RESET:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
