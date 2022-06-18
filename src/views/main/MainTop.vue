<script setup lang="ts">
import { MqResponsive } from "vue3-mq";
import Button from "../../components/parts/BasicButton.vue";
import { signInGoogle } from "../../logic/auth";

const signIn = () => {
  signInGoogle();
};
</script>

<template>
  <div>
    <MqResponsive target="sp">
      <div class="top-login-buttons">
        <div class="top-login-button">
          <Button title="Googleアカウントではじめる" font-color="{ text-color: white }" color="#e47863" @click="signIn()"></Button>
        </div>
      </div>
    </MqResponsive>
  </div>
</template>

<style lang="scss" scoped>
.top-login-buttons {
  text-align: center;
  padding-top: 35vh;

  .top-login-button {
    margin-bottom: 20px;
  }
}
</style>
