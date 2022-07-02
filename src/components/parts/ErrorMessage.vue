<script setup lang="ts">
defineProps<{
  errorMessages: string[];
}>();
</script>

<template>
  <div class="error-messages">
    <template v-for="errorMessage in errorMessages" :key="errorMessage">
      <p>{{ errorMessage }}</p>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.error-messages {
  color: #ea1a1e;
  font-weight: bold;
  padding: 0 0 7px 10px;
}
</style>
