<script setup lang="ts">
import { signInGoogle, signOutGoogle } from "../../logic/auth";
import { useGlogalStore } from "../../store/global";

const states = useGlogalStore();

const signIn = () => {
  signInGoogle();
};

const signOut = () => {
  signOutGoogle();
  states.loginUser.loginState = false;
};
</script>

<template>
  <v-toolbar>
    <div class="header-contents">
      <v-toolbar-title>
        <span class="header-title">ShopingList</span>
      </v-toolbar-title>

      <v-btn v-if="states.loginUser.loginState" icon @click="signOut()">
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
</style>
