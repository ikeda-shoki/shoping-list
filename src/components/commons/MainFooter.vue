<script setup lang="ts">
import { useGlogalStore } from "../../store/global";

const states = useGlogalStore();
</script>

<template>
  <template v-if="states.loginUser.loginState">
    <v-footer>
      <v-card-text>
        <router-link to="/itemsList" class="footer-link">
          <v-icon class="footer-icon">mdi-format-list-bulleted-square</v-icon>
        </router-link>
        <router-link :to="{ name: 'commonRegist' }" class="footer-link">
          <v-icon class="footer-icon">mdi-playlist-plus</v-icon>
        </router-link>
        <!-- <router-link to="/" class="footer-link">
          <v-icon class="footer-icon">mdi-account-cog</v-icon>
        </router-link> -->
      </v-card-text>
    </v-footer>
  </template>
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
  max-width: 600px;
  margin: 0 auto;
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
