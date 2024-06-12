<template>
  <div class="cards">
    <WeatherCard v-for="card in cards" :key="card.id" :card="card" />
  </div>
</template>
<script setup lang="ts">
import WeatherCard from '@/components/Card/WeatherCard.vue';

const props = defineProps<{
  cards: object;
}>();
</script>
<style lang="scss"></style>
