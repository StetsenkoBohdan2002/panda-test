<template>
  <div class="weather-card">
    <div class="weather-card__header">
      <h2 class="weather-card__city">{{ weatherData.name }}</h2>
      <img
        class="weather-card__icon"
        :src="getWeatherIcon(weatherData.weather[0].icon)"
        alt="Weather Icon"
      />
    </div>
    <div class="weather-card__details">
      <div class="weather-card__temperature">
        <p class="weather-card__title">{{ $t('temperature') }}</p>
        <p class="weather-card__value">{{ kelvinToCelsius(weatherData.main.temp) }}°C</p>
        <div class="weather-card__temperature-details">
          <p class="weather-card__temperature-max">
            {{ $t('maxTemperature') }}: {{ kelvinToCelsius(weatherData.main.temp_max) }}°C
          </p>
          <p class="weather-card__temperature-min">
            {{ $t('minTemperature') }}: {{ kelvinToCelsius(weatherData.main.temp_min) }}°C
          </p>
          <p class="weather-card__temperature-feels">
            {{ $t('feelsLike') }}: {{ kelvinToCelsius(weatherData.main.feels_like) }}°C
          </p>
        </div>
      </div>
      <div class="weather-card__detail default">
        <p class="weather-card__title">{{ $t('humidity') }}</p>
        <p class="weather-card__value">{{ weatherData.main.humidity }}%</p>
      </div>
      <div class="weather-card__detail default">
        <p class="weather-card__title">{{ $t('pressure') }}</p>
        <p class="weather-card__value">{{ weatherData.main.pressure }} гПа</p>
      </div>
      <div class="weather-card__detail default">
        <p class="weather-card__title">{{ $t('windSpeed') }}</p>
        <p class="weather-card__value">{{ weatherData.wind.speed }} м/с</p>
      </div>
      <div class="weather-card__detail default">
        <p class="weather-card__title">{{ $t('cloudiness') }}</p>
        <p class="weather-card__value">{{ weatherData.clouds.all }}%</p>
      </div>
    </div>
    <div class="chart-filters">
      <CButton
        :type="filterStatus === 'day' ? 'primary' : null"
        @click="handleGetHourlyTemperature"
        >{{ $t('day') }}</CButton
      >
      <CButton
        :type="filterStatus === '6days' ? 'primary' : null"
        @click="handleGetWeekTemperature"
        >{{ $t('sixDays') }}</CButton
      >
    </div>
    <BarChart :chartData="chart" />
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';
import BarChart from '@/components/Chart/BarChart.vue';
import CButton from '@/shared/Button/CButton.vue';
import { kelvinToCelsius } from '@/modules/helper';

const emits = defineEmits<{
  getWeekTemperature: () => void;
  getHourlyTemperature: () => void;
}>();

const filterStatus = ref('day');
const props = defineProps<{
  weatherData: {
    name: string;
    main: {
      temp: number;
      feels_like: number;
      temp_max: number;
      temp_min: number;
      humidity: number;
      pressure: number;
    };
    weather: { description: string }[];
    wind: { speed: number };
    clouds: { all: number };
  };
  chart: { time: string; temp: number }[];
}>();

const handleGetWeekTemperature = () => {
  filterStatus.value = '6days';
  emits('getWeekTemperature');
};
const handleGetHourlyTemperature = () => {
  filterStatus.value = 'day';
  emits('getHourlyTemperature');
};

const getWeatherIcon = (iconcode) => {
  return `http://openweathermap.org/img/w/${iconcode}.png`;
};
</script>

<style scoped lang="scss">
.chart-filters {
  margin-top: 10px;
  display: flex;
  gap: 5px;
}
.weather-card {
  padding: 20px;
  border-radius: 5px;
  &__header {
    text-align: center;
    margin-bottom: 20px;
  }

  &__icon {
    background-color: #eaeaea;
    padding: 5px 10px;
    border-radius: 5px;
    margin: 10px 0;
  }

  &__city {
    margin: 0;
    font-size: 2rem;
    font-weight: bold;
  }

  &__details {
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
  }

  &__temperature,
  &__detail {
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
    min-height: 200px;
    width: 180px;
    text-align: center;
  }

  &__detail {
    &.default {
      & > p:first-child {
        height: 20%;
      }
      & > p:last-child {
        height: 60%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  &__title {
    margin: 0;
    font-size: 1.2rem;
    font-weight: bold;
  }

  &__value {
    margin-top: 10px;
    font-size: 1.5rem;
    font-weight: bold;
  }

  &__temperature-details {
    margin-top: 10px;
    font-size: 1rem;
    color: #666;
  }

  &__temperature-max,
  &__temperature-min,
  &__temperature-feels {
    margin: 5px 0;
    font-size: 12px;
  }
}

@media screen and (max-width: 1080px) {
  .weather-card {
    &__details {
      & > div {
        min-height: 100px;
      }
    }
    &__title {
      font-size: 1rem;
    }
    &__value {
      font-size: 1.2rem;
    }
    &__temperature-max,
    &__temperature-min,
    &__temperature-feels {
      display: none;
    }
  }
}

@media screen and (max-width: 581px) {
  .weather-card {
    &__details {
      & > div {
        width: 100%;
        min-height: 70px;
      }
    }
  }
}
</style>
