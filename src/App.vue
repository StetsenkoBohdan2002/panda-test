<script setup lang="ts">
import { onBeforeMount, onMounted } from 'vue';
import { RouterView } from 'vue-router';
import Spinner from '@/components/Spinner/Spinner.vue';
import Header from '@/components/Header/Header.vue';
import { getUserLocation } from '@/API/locationApi';
import { useLocationStore } from '@/stores/location';
const { setUserLocation } = useLocationStore();

onMounted(async () => {
  const response = await getUserLocation();
  setUserLocation(response);
});
</script>

<template>
  <div>
    <Header />
    <main class="main">
      <div class="container">
        <RouterView />
      </div>
    </main>
    <Spinner />
    <notifications position="bottom right" />
    <div id="modals"></div>
  </div>
</template>

<style scoped></style>
