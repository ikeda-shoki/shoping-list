<script setup lang="ts">
const emits = defineEmits<{
  (e: "closeModal", modalStatus: boolean): void;
}>();

const closeModal = () => {
  emits("closeModal", false);
};
</script>

<template>
  <div class="modal" @click="closeModal()">
    <div class="modal-contents">
      <slot></slot>
      <button @click="closeModal()"><v-icon class="item-button-icon">mdi-close-circle</v-icon></button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal {
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.74);
  position: fixed;
  top: 0;
  z-index: 100;

  .modal-contents {
    max-width: 700px;
    background-color: #e5e2df;
    height: 70vh;
    border-radius: 15px;
    margin: 70px 30px;
    position: relative;

    button {
      position: absolute;
      top: 5px;
      right: 5px;
      .item-button-icon {
        font-size: 45px;
      }
    }
  }
}
</style>
