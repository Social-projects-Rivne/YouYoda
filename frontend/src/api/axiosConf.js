import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/'
})

axiosInstance.interceptors.request.use(function(config) {
  const token = localStorage.getItem('token');

  if ( token != null ) {
    config.headers.Authorization = "Token " + token;
  }
  return config;
}, function(err) {
  return Promise.reject(err);
});

export const API = axiosInstance;
