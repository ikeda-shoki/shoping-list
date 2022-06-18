<script setup lang="ts">
import { MqResponsive } from "vue3-mq";
import Button from "../../components/parts/BasicButton.vue";
import { signInGoogle, signOutGoogle, checkLogInState } from "../../logic/auth";
import { currentUser } from "../../class/CurrentUser";

const signIn = () => {
  console.log("ログイン処理を開始します");
  signInGoogle();
};

const signOut = () => {
  console.log("ログアウト処理します");
  signOutGoogle();
};

const checkLogin = () => {
  console.log("確認中");
  if (checkLogInState()) {
    console.log("ログイン中");
  } else {
    console.log("ログアウト中");
  }
};
</script>

<template>
  <div>
    <MqResponsive target="sp">
      <p>ShopingList</p>
      <p>Hello, {{ currentUser.userName }}</p>
      <div class="top-login-buttons">
        <div class="top-login-button">
          <Button title="ログイン" color="#008b8b" @click="signIn()"></Button>
        </div>
        <div class="top-login-button">
          <Button title="ログアウト" color="#008b8b" @click="signOut()"></Button>
        </div>
        <div class="top-login-button">
          <Button title="確認" color="#008b8b" @click="checkLogin()"></Button>
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
