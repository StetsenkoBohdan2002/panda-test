import axios from 'axios';
import type { AxiosInstance, AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import emitter from '@/eventBus';

const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const API_KEY = '7ae7d88a124a0fbd950cba595da15a36';

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  params: {
    appid: API_KEY
  }
});

const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  emitter.emit('show-spinner');
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  emitter.emit('hide-spinner');
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  emitter.emit('hide-spinner');
  return response;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  emitter.emit('hide-spinner');
  return Promise.reject(error);
};

axiosInstance.interceptors.request.use(onRequest, onRequestError);
axiosInstance.interceptors.response.use(onResponse, onResponseError);
