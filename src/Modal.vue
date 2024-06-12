<template>
  <teleport to="body">
    <div class="modal-mask" v-if="show">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header"> </slot>
            <button @click="closeModal" class="modal-close-button">✕</button>
          </div>
          <div class="modal-body">
            <slot name="body"> </slot>
          </div>
          <div class="modal-footer">
            <slot name="footer"> </slot>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
const props = defineProps<{
  show: boolean;
}>();
const emits = defineEmits<{
  (e: 'close'): void;
}>();
const closeModal = () => {
  emits('close');
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
}

.modal-container {
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 600px;
}

.modal-header {
  padding: 16px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-close-button {
  border: none;
  background: none;
  font-size: 20px;
  cursor: pointer;
}

.modal-body {
  padding: 16px;
}

.modal-footer {
  padding: 16px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
}
</style>
