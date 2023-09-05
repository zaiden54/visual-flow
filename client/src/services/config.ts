import axios from 'axios';

const apiService = axios.create({
  // baseURL: 'http://192.168.2.253:3010/api',
  baseURL: 'http://localhost:3001/api',
  withCredentials: true,
});

export default apiService;
