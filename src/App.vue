<template>
  <v-app>
    <v-main>
      <Header></Header>
      <div id="main">
        <router-view></router-view>
      </div>
      <Footer></Footer>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import Header from "./components/commons/MainHeader.vue";
import Footer from "./components/commons/MainFooter.vue";
</script>

<style lang="scss" scoped>
#main {
  padding: 10px 20px;
}

footer {
  padding: 0;
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
