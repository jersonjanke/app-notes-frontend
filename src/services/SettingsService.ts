import { URL } from './../utils/URL';
import axios, { AxiosError } from 'axios';

export type SettingsData = {
  _id: string;
  update?: boolean;
  email: string;
  autoplay: boolean;
  microphone: boolean;
};

export type SettingsDataCreate = {
  update?: boolean;
  email: string;
  autoplay: boolean;
  microphone: boolean;
};

const SettingsService = {
  getSettings: (email: string) => {
    return new Promise<SettingsData[]>((resolve, reject) => {
      axios
        .get(`${URL.URL_BASE}/settings?email=${email}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  },
  createSettings: (settings: SettingsDataCreate) => {
    return new Promise<SettingsData[]>((resolve, reject) => {
      axios
        .post(`${URL.URL_BASE}/settings`, settings)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  },
  updateSettings: (settings: SettingsData) => {
    return new Promise<SettingsData[]>((resolve, reject) => {
      axios
        .put(`${URL.URL_BASE}/settings/${settings?._id}`, settings)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  },
};

export default SettingsService;
