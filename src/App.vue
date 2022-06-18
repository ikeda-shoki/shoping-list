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

<style lang="scss" scoped>
#main {
  background-color: #e5e2df;
  min-height: 100vh;
}

header {
  background-color: #f1a598;
}

footer {
  background-color: #f1a598;
  padding: 0;
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
