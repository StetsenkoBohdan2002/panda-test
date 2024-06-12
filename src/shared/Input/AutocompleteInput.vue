<template>
  <div class="autocomplete" v-click-outside="() => (showSuggestions = false)">
    <input
      class="autocomplete-input"
      type="text"
      :disabled="card.favorite"
      :class="{ active: showSuggestions }"
      v-model="query"
      @focus="onInput"
      @input="onInput"
      placeholder="Введіть місто"
    />
    <img
      class="autocomplete-suggestions__icon icon-sm"
      src="@/assets/icons/search-icon.svg"
      alt="Search icon"
    />
    <div v-if="showSuggestions" class="autocomplete-suggestions">
      <ul v-if="filteredCities.length" class="autocomplete-suggestions__list">
        <li
          class="autocomplete-suggestions__item"
          v-for="city in filteredCities"
          :key="city.name"
          :class="{
            'autocomplete-suggestion--active': choosenCity && choosenCity.name === city.name
          }"
          @mousedown.prevent="selectCity(city)"
        >
          {{ city.name }}
        </li>
      </ul>
      <div v-else-if="query && !filteredCities.length" class="autocomplete-suggestions__list">
        <span class="autocomplete-suggestions__list_empty">{{ $t('notFound') }} </span>
        <span class="autocomplete-suggestions__list_find" @click="selectCity({name: query})">{{
          $t('foundCity')
        }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getCities } from '@/API/citiesApi.ts';

interface City {
  name: string;
  lon: number;
  lat: number;
  country: string;
}

const query = ref('');
const cities = ref<City[]>([]);
const filteredCities = ref<City[]>([]);
const showSuggestions = ref(false);
const choosenCity = ref<City | null>(null);

const props = defineProps<{
  card: object;
}>();
const emits = defineEmits<{
  (e: 'getCurrentWeather', city: string): void;
}>();
onMounted(() => {
  cities.value = getCities();
  if (props.card.currentData?.name) {
    query.value = props.card.currentData.name;
  }
});

const onInput = () => {
  if (query.value) {
    filteredCities.value = cities.value
      .filter((city) => city.name.toLowerCase().includes(query.value.toLowerCase()))
      .slice(0, 5);
    showSuggestions.value = true;
  } else if (query.value === '') {
    filteredCities.value = cities.value;
    showSuggestions.value = true;
  } else {
    filteredCities.value = [];
  }
};

const selectCity = async (city: City) => {
  query.value = city.name;
  filteredCities.value = [];
  showSuggestions.value = false;
  choosenCity.value = city;
  emits('getCurrentWeather', city.name);
};
</script>

<style scoped lang="scss">
.autocomplete {
  position: relative;
  width: 400px;

  &-input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    box-sizing: border-box;

    &.active {
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
    }

    &:focus {
      border-color: #007bff;
      outline: none;
    }
  }

  &-suggestions {
    position: absolute;
    border: 1px solid #ccc;
    border-top: none;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
    list-style: none;

    padding: 0;
    margin: 0;
    max-height: 150px;
    overflow-y: auto;
    width: 100%;
    background: white;
    z-index: 1;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    &__icon {
      position: absolute;
      right: 15px;
      opacity: 0.5;
      top: 50%;
      transform: translateY(-50%);
    }
    &__list {
      display: flex;
      flex-direction: column;
      &_empty {
        padding: 10px;
      }
      &_find {
        color: #007bff;
        cursor: pointer;
        padding: 10px;
        font-weight: 600;
        transition: all 0.15s ease-in-out;
        &:hover {
          background-color: #007bff;
          color: #fff;
        }
      }
    }
    &__item {
      cursor: pointer;
      padding: 10px;
      transition: background-color 0.2s;

      &--active,
      &:hover {
        background-color: #f0f0f0;
      }
    }
  }
}
</style>
