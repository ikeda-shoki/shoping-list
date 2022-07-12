<script setup lang="ts">
import CommonModal from "../commons/CommonModal.vue";
import BasicButton from "../parts/BasicButton.vue";
import { signInGoogle, signOutGoogle } from "../../logic/auth";
import { useGlogalStore } from "../../store/global";
import { ref } from "vue";

const states = useGlogalStore();

const isModal = ref<boolean>(false);

const signIn = () => {
  signInGoogle();
};

const signOut = () => {
  signOutGoogle();
  states.loginUser.loginState = false;
};

const openModal = () => {
  isModal.value = true;
};

const closeModal = (e: boolean) => {
  isModal.value = e;
};
</script>

<template>
  <CommonModal v-if="isModal" @close-modal="closeModal($event)">
    <p class="logout-modal-text">本当にログアウトしても良いですか？</p>
    <BasicButton title="ログアウトする" font-color="{ text-color: white }" color="#e47863" @click="signOut()"></BasicButton>
  </CommonModal>

  <v-toolbar>
    <div class="header-contents">
      <v-toolbar-title>
        <span class="header-title">ShopingList</span>
      </v-toolbar-title>

      <v-btn v-if="states.loginUser.loginState" icon @click="openModal()">
        <v-icon>mdi-login-variant</v-icon>
      </v-btn>
      <v-btn v-else icon @click="signIn()">
        <v-icon>mdi-login</v-icon>
      </v-btn>
    </div>
  </v-toolbar>
</template>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Akaya+Kanadaka&family=Fascinate&family=Permanent+Marker&display=swap");

header {
  background-color: #f1a598;
  width: 100%;
}

.header-contents {
  width: 600px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
}

.header-title {
  font-size: 23px;
  font-weight: bold;
  font-family: "Fascinate", cursive;
}

.modal-contents {
  .logout-modal-text {
    font-size: 20px;
    font-weight: bold;
    margin: 0 40px;
    position: absolute;
    top: 50%;
    transform: translateY(-80%);
    right: 5px;
  }

  button {
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
