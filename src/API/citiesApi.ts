import { axiosInstance } from './apiConfig';
import cities from '@/data/city.list.json';

export function getCities() {
  try {
    return cities;
  } catch (error) {
    console.error('Error fetching current cities:', error);
    throw error;
  }
}
