<template>
  <v-app>
    <v-main>
      <div id="main">
        <Header></Header>
        <router-view></router-view>
        <Footer></Footer>
      </div>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import Header from "./components/commons/MainHeader.vue";
import Footer from "./components/commons/MainFooter.vue";
</script>

<style lang="scss">
#main {
  background-color: #e5e2df;
  min-height: 100vh;
  width: auto;
}

a {
  text-decoration: none;
}
</style>
