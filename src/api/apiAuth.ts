import axios from 'axios'

export const apiAuth = axios.create({
  baseURL: 'https://compuactual.azurewebsites.net/auth'
})
