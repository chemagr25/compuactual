import axios from "axios";

export const apiAuth = axios.create( {
    baseURL: 'https://compuactualca.azurewebsites.net/auth'
})

