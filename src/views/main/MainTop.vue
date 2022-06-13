<script setup lang="ts">
import { MqResponsive } from "vue3-mq";
import Button from "../../components/parts/BasicButton.vue";
</script>

<template>
  <div>
    <MqResponsive target="sp">
      <p>ShopingListをはじめる</p>
      <div class="top-login-buttons">
        <div class="top-login-button">
          <Button title="ログイン" color="#008b8b"></Button>
        </div>
        <div class="top-login-button">
          <Button title="新規登録" color="#008b8b"></Button>
        </div>
      </div>
    </MqResponsive>
  </div>
</template>

<style lang="scss" scoped>
.top-login-buttons {
  text-align: center;
  padding-top: 20vh;

  .top-login-button {
    margin-bottom: 20px;
  }
}
</style>
