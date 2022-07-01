<script setup lang="ts">
export type InputData = {
  titleName: string;
  required: boolean;
};

defineProps<{
  inputData: InputData;
}>();
</script>

<template>
  <div class="input-name">
    <v-icon class="input-icon">mdi-record-circle</v-icon>
    <label :for="inputData.titleName" class="input-title">{{ inputData.titleName }}</label>
    <span v-if="inputData.required" class="required-icon">必須</span>
  </div>
</template>

<style lang="scss" scoped>
.input-name {
  font-size: 18px;
  font-weight: bold;
  display: flex;
  align-items: center;
}

.input-title {
  padding-left: 8px;
}

.input-icon {
  color: #f1a598;
  font-size: 18px;
}

.required-icon {
  padding: 3px 15px;
  background-color: #ea1a1e;
  border-radius: 5px;
  font-size: 13px;
  font-weight: bold;
  color: #e5e2df;
  margin-left: 2rem;
  text-align: center;
}
</style>
