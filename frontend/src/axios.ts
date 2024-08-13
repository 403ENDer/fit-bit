import axios from 'axios'

const token = sessionStorage.getItem('token')
const axiosObj = axios.create({
  baseURL: import.meta.env.VITE_APP_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

axiosObj.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axiosObj
