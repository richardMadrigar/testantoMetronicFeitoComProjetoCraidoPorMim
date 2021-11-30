import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3001/',
})

export default api

export const SECRET = "6df573@8oc0203kla278dsfs6533$%5"