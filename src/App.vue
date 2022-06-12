<template>
  <v-app>
    <v-main>
      <Header></Header>
      <router-view></router-view>
      <Footer></Footer>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import Header from "./components/commons/MainHeader.vue";
import Footer from "./components/commons/MainFooter.vue";
</script>
