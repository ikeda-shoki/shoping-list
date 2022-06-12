<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  title: { type: String, required: true },
})
</script>

<template>
  <v-btn
  elevation="2"
  outlined
  >
  <span>{{ props.title }}</span>
  </v-btn>
</template>

<style lang="scss" scoped>
</style>
