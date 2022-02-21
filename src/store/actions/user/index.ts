import { User } from 'types/Login';
import { USER_UPDATE, USER_RESET, USER_SIGNUP, VALID_PASSWORD } from '../';

export const setSignUp = (user: User) => ({
  type: USER_SIGNUP,
  payload: user,
});

export const userUpdate = (user: User) => ({
  type: USER_UPDATE,
  payload: user,
});

export const setValidPassword = (isValid: boolean) => ({
  type: VALID_PASSWORD,
  payload: isValid,
});

export const userReset = () => {
  return {
    type: USER_RESET,
  };
};
