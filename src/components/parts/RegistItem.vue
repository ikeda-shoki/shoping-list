<script setup lang="ts">
import { Item } from "../../store/Item";

defineProps<{
  item: Item;
  color: string;
}>();

const emits = defineEmits<{
  (e: "deleteItem", item: Item): void;
}>();

const deleteItem = (item: Item) => {
  emits("deleteItem", item);
};
</script>

<template>
  <div :style="{ 'border-bottom-color': color }" class="regist-item">
    <p class="item-name">{{ item.itemName }}</p>
    <button @click="deleteItem(item)"><v-icon>mdi-close-circle</v-icon></button>
  </div>
</template>

<style lang="scss" scoped>
.regist-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border: 2px;
  border-bottom-style: dotted;
  padding-top: 8px;

  .item-name {
    font-weight: bold;
    font-size: 16px;
  }
}
</style>
