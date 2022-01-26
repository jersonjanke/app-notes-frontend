import { URL } from './../utils/URL'
import axios from 'axios'
import { Login, User } from 'types/login'

const AuthService = {
  signup: (user: User) => {
    return axios.post(`${URL.URL_BASE_OPEN}/signup`, user)
  },
  login: (login: Login) => {
    return axios.post(`${URL.URL_BASE_OPEN}/login`, login)
  },
}

export default AuthService
