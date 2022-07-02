import axios from 'axios'

const BASE_URL = 'http://167.71.2.138:5000/api'
/*const BASE_URL = 'http://localhost:5000/api'*/


export const adminRequest = axios.create({
    baseURL: BASE_URL,
    headers: { token: localStorage.getItem('accessToken') && null }
})

