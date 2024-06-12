import axios from 'axios';

const BASE_URL = 'https://ipinfo.io/json';
const API_KEY = '57155318270ff4';

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  params: {
    token: API_KEY
  }
});

export const getUserLocation = async (): Promise<any> => {
  const response = await axiosInstance.get();
  return response.data;
};
