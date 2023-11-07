import axios from 'axios'

export const apiResources = axios.create({
  baseURL: 'https://compuactual.azurewebsites.net/api'
})
