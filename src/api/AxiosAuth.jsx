import axios from 'axios';

const AxiosAuth = axios.create({
  baseURL: 'https://mytshop.runasp.net/api/',
});

AxiosAuth.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default AxiosAuth;
