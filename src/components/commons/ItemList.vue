<script setup lang="ts">
import { Item } from "../../store/Item";

defineProps<{
  items: Item[];
  type: string;
}>();

const emits = defineEmits<{
  (e: "addItem", item: Item): void;
  (e: "deleteItem", item: Item): void;
}>();

const deleteItem = (item: Item) => {
  emits("deleteItem", item);
};

const addItem = (item: Item) => {
  emits("addItem", item);
};
</script>

<template>
  <div class="item-list">
    <template v-for="item in items" :key="item">
      <div class="item">
        <p class="item-name">{{ item.itemName }}</p>
        <template v-if="type === 'registItem'">
          <button @click="deleteItem(item)"><v-icon class="item-button-icon">mdi-delete-empty</v-icon></button>
        </template>
        <template v-else-if="type === 'saveItem'">
          <button @click="addItem(item)"><v-icon class="item-button-icon">mdi-plus-circle</v-icon></button>
        </template>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.item-list {
  margin-top: 10px;

  .item {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-bottom: solid 2px #f1a598;
    padding: 10px 5px 0px 15px;

    .item-name {
      font-size: 19px;
    }
  }
}
</style>
