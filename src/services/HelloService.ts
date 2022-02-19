import { URL } from './../utils/URL';
import axios from 'axios';

const HelloService = {
  getHello: () => {
    return axios.get(`${URL.URL_BASE_OPEN}/hello`);
  },
};

export default HelloService;
