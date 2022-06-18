<script setup lang="ts"></script>

<template>
  <v-footer>
    <v-card-text>
      <v-btn class="mx-7" icon="mdi-home" variant="plain" size="35px"></v-btn>
      <v-btn class="mx-7" icon="mdi-email" variant="plain" size="35px"></v-btn>
      <v-btn class="mx-7" icon="mdi-calendar" variant="plain" size="35px"></v-btn>
    </v-card-text>
  </v-footer>
</template>

<style lang="scss" scoped>
.v-card-text {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.8rem;
}
</style>
