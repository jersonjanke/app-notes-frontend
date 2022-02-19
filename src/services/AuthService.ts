import { URL } from './../utils/URL';
import axios from 'axios';
import { Login, User } from '../types/Login';

const AuthService = {
  signUp: (user: User) => {
    return axios.post(`${URL.URL_BASE_OPEN}/signup`, user);
  },
  login: (login: Login) => {
    return axios.post(`${URL.URL_BASE_OPEN}/login`, login);
  },
};

export default AuthService;
