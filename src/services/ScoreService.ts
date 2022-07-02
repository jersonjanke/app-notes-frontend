import { URL } from './../utils/URL';
import axios, { AxiosError } from 'axios';
import { Score, ScoreDto } from '../types/Score';

const scoreService = {
  getByEmailScore: (email: string) => {
    return new Promise<ScoreDto[]>((resolve, reject) => {
      axios;
      axios
        .get(`${URL.URL_BASE}/score?email=${email}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  },
  getByIDScore: (id: string) => {
    return new Promise<ScoreDto>((resolve, reject) => {
      axios
        .get(`${URL.URL_BASE}/score/${id}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  },
  getByIDScoreSSR: (id: string, token: string) => {
    return new Promise<ScoreDto>((resolve, reject) => {
      axios
        .get(`${URL.URL_BASE}/score/${id}`, {
          headers: { Authorization: token },
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  },
  createScore: (score: Score) => {
    return new Promise<ScoreDto>((resolve, reject) => {
      axios
        .post(`${URL.URL_BASE}/score`, score)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  },
  updateScore: (score: ScoreDto) => {
    return new Promise<ScoreDto>((resolve, reject) => {
      axios
        .put(`${URL.URL_BASE}/score/${score?._id}`, score)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  },
};

export default scoreService;
