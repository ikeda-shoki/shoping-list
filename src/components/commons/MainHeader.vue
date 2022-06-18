<script setup lang="ts">
import { signInGoogle } from "../../logic/auth";
import { useGlogalStore } from "../../store/global";

const states = useGlogalStore();

const signIn = () => {
  signInGoogle();
};
</script>

<template>
  <v-toolbar dense>
    <v-toolbar-title>
      <span class="header-title">ShopingList</span>
    </v-toolbar-title>

    <v-btn v-if="states.currentUser.userLogInState" icon>
      <v-icon>mdi-login-variant</v-icon>
    </v-btn>
    <v-btn v-else icon @click="signIn()">
      <v-icon>mdi-login</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Akaya+Kanadaka&family=Fascinate&family=Permanent+Marker&display=swap");
.header-title {
  font-size: 23px;
  font-weight: bold;
  font-family: "Fascinate", cursive;
}
</style>
