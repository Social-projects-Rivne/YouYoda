import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/'
})

const requestHandler = (request) => {
    request.headers['Authorization'] = "Token " + localStorage.getItem('token')
  return request
}

const token = localStorage.getItem('token')
if (token != null) {
axiosInstance.interceptors.request.use(
  request => requestHandler(request)
)}

export const API = axiosInstance;
