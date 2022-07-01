<script setup lang="ts"></script>

<template>
  <v-footer>
    <v-card-text>
      <router-link to="/itemsList" class="footer-link">
        <v-icon class="footer-icon">mdi-format-list-bulleted-square</v-icon>
      </router-link>
      <router-link to="/regist/category" class="footer-link">
        <v-icon class="footer-icon">mdi-playlist-plus</v-icon>
      </router-link>
      <router-link to="/itemRegist" class="footer-link">
        <v-icon class="footer-icon">mdi-account-cog</v-icon>
      </router-link>
    </v-card-text>
  </v-footer>
</template>

<style lang="scss" scoped>
footer {
  background-color: #f1a598;
  padding: 0;
  position: fixed;
  bottom: 0;
  width: 100%;
}
.v-card-text {
  display: flex;
  flex-direction: row;
  text-align: center;
  justify-content: space-around;
  padding: 0.8rem;
}

.footer-link {
  color: #4a0c01;
  font-size: 23px;
  opacity: 0.5;
}

.router-link-active {
  opacity: 1;
}

.footer-icon {
  text-decoration: none;
}
</style>
