import Axios from 'axios'
import { baseURL } from '../env'
export const api = Axios.create({
  baseURL,
  timeout: 8000
})

export const dndApi = Axios.create({
  baseURL: 'https://www.dnd5eapi.co/api/spells',
  timeout: 5000
})