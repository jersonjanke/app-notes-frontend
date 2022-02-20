import { User } from 'types/Login';
import { USER_UPDATE, USER_RESET, USER_SIGNUP } from '../';

export const setSignUp = (user: User) => ({
  type: USER_SIGNUP,
  payload: user,
});

export const userUpdate = (user: User) => ({
  type: USER_UPDATE,
  payload: user,
});

export const userReset = () => {
  return {
    type: USER_RESET,
  };
};
