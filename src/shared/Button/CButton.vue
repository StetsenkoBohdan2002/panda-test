<template>
  <div>
    <button :class="['card-button', buttonType]" @click.stop="$emit('click')">
      <slot></slot>
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';

const props = defineProps<{
  type: 'favorite' | 'danger' | 'success';
}>();

const buttonType = computed(() => `button--${props.type}`);
</script>

<style lang="scss">
.card-button {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  border: none;
  border-radius: 0.5rem;
  color: #000000;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition:
    background-color 0.15s ease,
    transform 0.15s ease-in-out,
    box-shadow 0.15s ease;

  &:hover {
    background-color: rgb(230, 230, 230);
  }

  &:active {
    transform: scale(1.1);
  }

  &.button--favorite {
    color: #fff;
    background-color: #ffa600;

    &:hover {
      background-color: #eb9900;
    }

    &:active {
      background-color: #cc8500;
    }
  }

  &.button--danger {
    color: #fff;
    background-color: #dc3545;

    &:hover {
      background-color: #c82333;
    }

    &:active {
      background-color: #bd2130;
    }
  }
  &.button--primary {
    color: #fff;
    background-color: #356adc;

    &:hover {
      background-color: #3061cc;
    }

    &:active {
      background-color: #215abd;
    }
  }

  &.button--success {
    color: #fff;
    background-color: #28a745;

    &:hover {
      background-color: #218838;
    }

    &:active {
      background-color: #1e7e34;
    }
  }
}

.card-button span {
  margin-right: 0.5rem;
}
</style>
