import axios from 'axios';
import axiosRetry from 'axios-retry';
import { API_URL } from './api.constants';

export const getContentType = () => ({
  'Content-Type': 'application/json'
});

export const axiosClassic = axios.create({
  baseURL: API_URL,
  headers: getContentType(),
  withCredentials: true,
});

export const axiosNoCookies = axios.create({
  withCredentials: false // отключаем использование куки
});

axiosRetry(axiosClassic, {
  retries: 3,
  retryDelay: (retryCount) => {
    return retryCount * 1000; // время между повторными запросами
  },
  retryCondition: (error) => {
    // Проверка на наличие error.response перед доступом к error.response.status
    return (error.response && error.response.status === 503) || error.code === 'ECONNABORTED';
  }
});
