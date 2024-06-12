import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { useWeatherStore } from '@/stores/weather.ts';
export const useLocationStore = defineStore('location', () => {
  const location = ref({});
  const { setDefaultCard } = useWeatherStore();

  function setUserLocation(locationData) {
    location.value = locationData;
    setDefaultCard(getUserCity.value);
  }

  const getUserCity = computed(() => {
    return location.value.city;
  });

  return { setUserLocation, getUserCity };
});
