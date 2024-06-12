<template>
  <div :class="['card', { 'card--favorite': card.favorite }]">
    <div class="card__body">
      <div class="card__header">
        <AutocompleteInput :card="card" @getCurrentWeather="handleGetCurrentWeather" />
        <div class="card__actions">
          <CButton
            :type="!card.favorite ? 'favorite' : null"
            @click="handleChangeWeatherStatus(card.id)"
          >
            <span v-if="!card.favorite">{{ $t('favorite') }}</span>
            <span v-else>{{ $t('removeFromFavorites') }}</span>
          </CButton>
          <CButton type="danger" @click="confirmDeleteCard"> {{ $t('delete') }} </CButton>
        </div>
      </div>
      <CardBody
        v-if="card.currentData && card.hourlyTemperature"
        :chart="additionalChartData ? additionalChartData : card.hourlyTemperature"
        :weatherData="card.currentData"
        @getWeekTemperature="handleGetWeekTemperature"
        @getHourlyTemperature="handleGetHourlyTemperature"
      />
      <div v-else class="card__empty">{{ $t('empty') }}</div>
    </div>
    <Modal :show="showModal" @close="showModal = false">
      <template #header>
        <h3>{{ $t('deleteCurrentWeatherBlockHeader') }}</h3>
      </template>
      <template #body>
        <p>{{ $t('deleteCurrentWeatherBlockBody') }}</p>
      </template>
      <template #footer>
        <div class="modal__buttons">
          <button class="modal__button modal__button--cancel" @click="showModal = false">
            {{ $t('close') }}
          </button>
          <button class="modal__button modal__button--error" @click="deleteCurrentCard">
            {{ $t('deleteConfirmation') }}
          </button>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';
import { getWeekTemperature, getHourlyTemperature } from '@/API/weatherApi';
import AutocompleteInput from '@/shared/Input/AutocompleteInput.vue';
import CardBody from '@/components/Card/CardBody.vue';
import { useWeatherStore } from '@/stores/weather.ts';
import CButton from '@/shared/Button/CButton.vue';
import Modal from '@/Modal.vue';

const { changeWeatherCard, changeWeatherStatus, deleteCard } = useWeatherStore();
const props = defineProps<{
  card: object;
}>();

const showModal = ref<boolean>(false);
const additionalChartData = ref<{ time: string; temp: number }>(null);

const handleGetCurrentWeather = async (city: string): Promise<void> => {
  changeWeatherCard(props.card.id, city);
};

const confirmDeleteCard = () => {
  showModal.value = true;
};

const handleGetWeekTemperature = async () => {
  const response = await getWeekTemperature(props.card.currentData?.name);
  additionalChartData.value = response;
};

const handleGetHourlyTemperature = async () => {
  const response = await getHourlyTemperature(props.card.currentData?.name);
  additionalChartData.value = response;
};

const deleteCurrentCard = () => {
  deleteCard(props.card.id);
  showModal.value = false;
};

const handleChangeWeatherStatus = (cardId: string) => {
  changeWeatherStatus(cardId);
};
</script>

<style scoped lang="scss">
.card {
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
  padding: 20px;
  min-height: 300px;
  &--favorite {
    border-color: rgb(255, 178, 23);
    box-shadow: 0 2px 6px rgba(255, 175, 15, 0.5);
  }
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1.5px solid rgb(223, 223, 223);
    padding-bottom: 20px;
  }
  &__body {
    padding: 10px 0;
  }
  &__actions {
    display: flex;
    gap: 10px;
  }
  &__button {
    display: inline-block;
    padding: 10px 20px;
    margin-top: 20px;
    font-size: 16px;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    &--favorite {
      font-weight: 600;
      text-transform: uppercase;
      background-color: #ffa600;
      &:hover {
        background-color: #eb9900;
      }
    }
    &--delete {
      font-weight: 600;
      text-transform: uppercase;
      background-color: #cd0030;
      &:hover {
        background-color: #b10029;
      }
    }
  }
  &__empty {
    margin-top: 20px;
    text-align: center;
    font-size: 18px;
    color: #999;
  }
}

.modal {
  &__buttons {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
  &__button {
    display: inline-block;
    padding: 10px 20px;
    margin-top: 20px;
    font-size: 16px;
    width: 48%;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    &--cancel {
      background-color: #424242;
      &:hover {
        background-color: #282828;
      }
    }
    &--error {
      background-color: #c2003a;
      &:hover {
        background-color: #af0035;
      }
    }
  }
}

@media screen and (max-width: 900px) {
  .card {
    &__header {
      flex-wrap: wrap;
      & > .autocomplete {
        width: 100%;
      }
    }
    &__actions {
      width: 100%;
      margin-top: 10px;
    }
  }
}
</style>
