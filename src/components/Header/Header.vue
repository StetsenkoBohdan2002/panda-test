<template>
  <header class="header">
    <nav class="header-nav nav">
      <router-link to="/" class="header-nav__link">{{ $t('home') }}</router-link>
      <router-link to="/favorites" class="header-nav__link">{{ $t('favorites') }}</router-link>
    </nav>
  </header>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.header {
  display: flex;
  justify-content: center;
  background-color: #fff;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  &-nav {
    display: flex;
    gap: 1.5rem;
    &__link {
      text-decoration: none;
      color: #333;
      font-weight: 500;
      transition: color 0.3s;

      &:hover {
        color: #007bff;
      }
    }
  }
}
</style>
