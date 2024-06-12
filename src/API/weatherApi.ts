import { axiosInstance } from './apiConfig';
import { notify } from '@kyvg/vue3-notification';

export async function getCurrentWeather(city: string): Promise<any> {
  try {
    const response = await axiosInstance.get(`/weather`, {
      params: {
        q: city
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching current weather:', error);
    notify({
      type: 'error',
      title: 'Error',
      text: 'Something went wrong!'
    });
    throw error;
  }
}

export async function getWeeklyWeather(city: string): Promise<any> {
  try {
    const response = await axiosInstance.get(`/forecast`, {
      params: {
        q: city
      }
    });
    return response.data;
  } catch (error) {
    notify({
      type: 'error',
      title: 'Error',
      text: 'Something went wrong!'
    });
    console.error('Error fetching weekly weather:', error);
    throw error;
  }
}

export async function getFiveDayForecast(city: string): Promise<any> {
  try {
    const response = await axiosInstance.get(`/forecast`, {
      params: {
        q: city
      }
    });
    return response.data;
  } catch (error) {
    notify({
      type: 'error',
      title: 'Error',
      text: 'Something went wrong!'
    });
    console.error('Error fetching five day forecast:', error);
    throw error;
  }
}

export async function getHourlyTemperature(city: string): Promise<number[]> {
  try {
    const response = await getFiveDayForecast(city);
    const currentDate = new Date().toISOString().split('T')[0];
    const hourlyTemperature: number[] = [];

    console.log(currentDate);
    console.log(response.list);

    response.list.forEach((forecast: any) => {
      if (forecast.dt_txt.includes(currentDate)) {
        hourlyTemperature.push({ time: forecast.dt_txt, temp: forecast.main.temp });
      }
    });

    return hourlyTemperature;
  } catch (error) {
    notify({
      type: 'error',
      title: 'Error',
      text: 'Something went wrong!'
    });
    console.error('Error fetching hourly temperature:', error);
    throw error;
  }
}
export async function getWeekTemperature(city: string): Promise<number[]> {
  try {
    const response = await getFiveDayForecast(city);
    const hourlyTemperature = [];

    console.log(response.list);

    response.list.forEach((forecast: any) => {
      const date = forecast.dt_txt.split(' ')[0];
      let temp = 0;
      let n = 0;
      response.list.forEach((obj) => {
        if (obj.dt_txt.includes(date)) {
          temp += obj.main.temp;
          n += 1;
        }
      });
      if (!hourlyTemperature.find((item) => item.time === date)) {
        hourlyTemperature.push({ time: date, temp: +(temp / n).toFixed(2) });
      }
    });
    return hourlyTemperature;
  } catch (error) {
    notify({
      type: 'error',
      title: 'Error',
      text: 'Something went wrong!'
    });
    console.error('Error fetching hourly temperature:', error);
    throw error;
  }
}
