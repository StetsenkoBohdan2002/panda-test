import { ref, computed, watch } from 'vue';
import { defineStore } from 'pinia';
import { getHourlyTemperature, getCurrentWeather } from '@/API/weatherApi.ts';
import { uuid } from 'vue3-uuid';
import { notify } from '@kyvg/vue3-notification';

interface WeatherCard {
  id: string;
  currentData: any;
  hourlyTemperature: any;
  favorite: boolean;
}

export const useWeatherStore = defineStore('weather', () => {
  const cards = ref<WeatherCard[]>(getUserCards());

  function getUserCards(): WeatherCard[] {
    const storageData = localStorage['weatherCards']
      ? JSON.parse(localStorage['weatherCards'])
      : null;
    if (storageData?.length) {
      return storageData;
    }
    return [];
  }

  async function setDefaultCard(city: string): Promise<void> {
    if (cards.value.length < 1) {
      const [hourlyTemperature, currentData] = await Promise.all([
        getHourlyTemperature(city),
        getCurrentWeather(city)
      ]);
      addItemToCards({
        id: uuid.v4(),
        hourlyTemperature,
        currentData,
        favorite: false
      });
    }
  }

  function addItemToCards(card: WeatherCard): void {
    cards.value.push(card);
    saveDataToLocaleStorage();
  }

  function deleteCard(cardId: string): void {
    if (cards.value.length < 2) {
      notify({
        type: 'error',
        title: 'Error',
        text: 'You cannot delete last card!'
      });
      return;
    }
    cards.value = cards.value.filter((card) => card.id !== cardId);
  }

  async function changeWeatherCard(cardId: string, city: string): Promise<void> {
    const [hourlyTemperature, currentData] = await Promise.all([
      getHourlyTemperature(city),
      getCurrentWeather(city)
    ]);
    const newData = { hourlyTemperature, currentData };
    cards.value.forEach((card) => {
      if (card.id === cardId && !card.favorite) {
        card.currentData = newData.currentData;
        card.hourlyTemperature = newData.hourlyTemperature;
      }
    });
  }

  function changeWeatherStatus(cardId: string): void {
    cards.value.forEach((card) => {
      if (card.id === cardId) {
        card.favorite = !card.favorite;
      }
    });
  }

  function createNewCard(): void {
    if (cards.value.length === 5) {
      notify({
        type: 'error',
        title: 'Error',
        text: 'You cannot create more then 5 cards!'
      });
      return;
    }
    const obj: WeatherCard = {
      id: uuid.v4(),
      currentData: null,
      hourlyTemperature: null,
      favorite: false
    };
    addItemToCards(obj);
  }

  function saveDataToLocaleStorage(): void {
    localStorage['weatherCards'] = JSON.stringify(cards.value);
  }

  const getCards = computed(() => cards.value);
  const getFavoritesCards = computed(() => cards.value.filter((card) => card.favorite));
  const getUnfavoritesCards = computed(() => cards.value.filter((card) => !card.favorite));

  watch(cards, () => {
    saveDataToLocaleStorage();
  });

  return {
    setDefaultCard,
    addItemToCards,
    getCards,
    changeWeatherCard,
    createNewCard,
    changeWeatherStatus,
    getFavoritesCards,
    deleteCard,
    getUnfavoritesCards
  };
});
