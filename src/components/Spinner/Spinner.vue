<template>
  <div v-if="show" class="spinner">
    <img class="spinner-img" src="@/assets/icons/spinner-icon.svg" alt="Spinnet" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import emitter from '@/eventBus.ts';

const show = ref(false);

onMounted(() => {
  emitter.on('show-spinner', () => {
    show.value = true;
  });

  emitter.on('hide-spinner', () => {
    show.value = false;
  });
});
</script>

<style scoped lang="scss">
.spinner {
  position: fixed;
  z-index: 1000;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: #ececec1d;
  backdrop-filter: blur(2px);
  display: flex;
  justify-content: center;
  align-items: center;
  &-img {
    width: 200px;
    opacity: 0.7;
  }
}
</style>
