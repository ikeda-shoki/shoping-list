<script setup lang="ts">
import { Color } from "../../store/Color";
import { useGlogalStore } from "../../store/global";
import { ref } from "vue";

const props = defineProps<{
  modelValue: string;
  errorMessages: string[];
}>();

const emits = defineEmits<{ (e: "update:modelValue", text: string): void }>();

const states = useGlogalStore();

const colors = states.colors;

const defaultSelectColor = () => {
  if (props.modelValue === null || props.modelValue === "") {
    emits("update:modelValue", colors[0].color);
    return colors[0].color;
  }
  emits("update:modelValue", props.modelValue);
  return props.modelValue;
};

const isActiveColor = ref<string>(defaultSelectColor());

const onClick = (color: Color) => {
  isActiveColor.value = color.color;
  emits("update:modelValue", isActiveColor.value);
};
</script>

<template>
  <div class="color-buttons">
    <div class="input-color-radio-buttons">
      <div v-if="errorMessages.length !== 0" class="error-messaes">
        <template v-for="errorMessage in errorMessages" :key="errorMessage">
          <p>{{ errorMessage }}</p>
        </template>
      </div>
      <template v-for="color in colors" :key="color">
        <div class="input-color" :style="{ backgroundColor: color.color }" :class="{ active: isActiveColor === color.color }" @click="onClick(color)">
          <div class="inner"></div>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.color-buttons {
  margin: 20px 0 20px;
  max-width: 400px;

  .input-color-radio-buttons {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    .input-color {
      width: 30%;
      margin-bottom: 30px;
      border-radius: 10px;

      .inner {
        width: 0px;
        height: 0px;
        padding-bottom: 100%;
      }
    }
  }
}

.active {
  border: 5px solid #4a0c01;
}
</style>
