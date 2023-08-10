import axios from 'axios'

export const apiResources = axios.create({
  baseURL: 'https://compuactualca.azurewebsites.net/api'
})
