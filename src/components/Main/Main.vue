<template>
  <div class="main-wrapper">
    <div class="container">
      <CButton type="primary" @click="addNewCard">
        <span class="new-card-text">{{ $t('addNewCard') }}</span
        ><img src="@/assets/icons/plus-icon.svg" alt="Plus icon" class="icon" />
      </CButton>
      <Cards :cards="getCards" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWeatherStore } from '@/stores/weather.ts';
import { storeToRefs } from 'pinia';
import Cards from '@/components/Card/Cards.vue';
import CButton from '@/shared/Button/CButton.vue';

const { getCards } = storeToRefs(useWeatherStore());
const { createNewCard } = useWeatherStore();

const addNewCard = (): void => {
  createNewCard();
};
</script>
<style lang="scss">
.main {
  &-wrapper {
    padding: 20px 0;
  }
}
.new-card-text {
  text-transform: uppercase;
  font-weight: 600;
}
</style>
