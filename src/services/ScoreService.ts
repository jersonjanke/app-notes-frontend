import { URL } from './../utils/URL'
import axios from 'axios'
import { Score } from '../types/Score'

const scoreService = {
  getByEmailScore: (email: string) => {
    return axios.get(`${URL.URL_BASE}/score?email=${email}`)
  },
  createScore: (score: Score) => {
    return axios.post(`${URL.URL_BASE}/score`, score)
  },
  updateScore: (score: Score) => {
    return axios.post(`${URL.URL_BASE}/score/${score?.id}`, score)
  },
}

export default scoreService
