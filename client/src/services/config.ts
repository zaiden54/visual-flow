import axios from 'axios';

const apiService = axios.create({
  baseURL: 'http://192.168.2.253:8080/api',
  withCredentials: true,
});

export default apiService;
