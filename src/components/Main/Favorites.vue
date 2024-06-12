<template>
  <div class="main-wrapper">
    <div class="container">
      <Cards v-if="getFavoritesCards?.length" :cards="getFavoritesCards" />
      <div v-else class="cards__empty">{{ $t('empty') }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import { useWeatherStore } from '@/stores/weather.ts';
import { storeToRefs } from 'pinia';
import Cards from '@/components/Card/Cards.vue';

const { getFavoritesCards } = storeToRefs(useWeatherStore());
onMounted(() => {});
</script>
<style lang="scss">
.cards__empty {
  margin-top: 20px;
  text-align: center;
  font-size: 18px;
  color: #999;
}
</style>
