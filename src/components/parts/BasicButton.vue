<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  title: { type: String, required: true },
});
</script>

<template>
  <v-btn elevation="2" outlined>
    <span class="button-font">{{ props.title }}</span>
  </v-btn>
</template>

<style lang="scss" scoped>
.button-font {
  font-weight: bold;
  color: #e5e2df;
  text-transform: capitalize;
}
</style>
