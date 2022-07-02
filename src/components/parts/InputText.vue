<script setup lang="ts">
import ErrorMessage from "./ErrorMessage.vue";

export type InputFieldData = {
  id: string;
  example: string;
  maxlength: number;
};

const props = defineProps<{
  inputFieldData: InputFieldData;
  errorMessages: string[];
  modelValue: string;
}>();

const emits = defineEmits<{ (e: "update:modelValue", text: string): void }>();

const onInputText = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emits("update:modelValue", target.value);
};
</script>

<template>
  <div class="input-text">
    <template v-if="errorMessages.length !== 0">
      <ErrorMessage :error-messages="props.errorMessages"></ErrorMessage>
    </template>
    <input
      :id="inputFieldData.id"
      class="input-field"
      :maxlength="inputFieldData.maxlength"
      placeholder="入力してください"
      :value="modelValue"
      @input="onInputText"
    />
    <span>例: {{ props.inputFieldData.example }}</span>
  </div>
</template>

<style lang="scss" scoped>
.input-text {
  margin-top: 10px;
  display: flex;
  flex-direction: column;

  span {
    padding: 5px 0 0 15px;
    font-size: 14px;
    opacity: 0.6;
  }
}

.input-field {
  border: 3px solid #f1a598;
  border-radius: 5px;
  padding: 5px 10px;
  width: 90%;

}

input:focus {
  background-color: #e5e2df;
  outline: none;
}
</style>
