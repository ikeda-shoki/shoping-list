<script setup lang="ts">
import RegistItem from "./RegistItem.vue";
import { Category } from "../../store/Category";
import { Item } from "../../store/Item";
import router from "../../router";

defineProps<{
  category: Category;
}>();

const emits = defineEmits<{
  (e: "deleteItem", item: Item): void;
}>();

const deleteItem = (item: Item) => {
  emits("deleteItem", item);
};

function toRegistItemPage(categoryId: string) {
  router.push({ name: "registItem", params: { categoryId: categoryId } });
}
</script>

<template>
  <div :style="{ backgroundColor: category.categoryColor }" class="category-item">
    <div class="category-header">
      <h3 class="category-name">{{ category.categoryName }}</h3>
      <span class="category-regist-button" @click="toRegistItemPage(category.categoryId)">
        <v-icon>mdi-plus-circle-outline</v-icon>
      </span>
    </div>
    <div class="save-items">
      <template v-for="item in category.registItems" :key="item">
        <RegistItem :item="item" :color="category.categoryColor" @delete-item="deleteItem($event)"></RegistItem>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.category-item {
  margin-bottom: 10px;
  border-radius: 10px;
  border: solid 5px #4a0c01;
  padding: 10px 8px;

  .category-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .category-name {
      padding: 0px 5px 15px;
      border-radius: 8px;
    }

    .category-regist-button {
      display: block;
      padding: 0px 5px 15px;
    }
  }

  .save-items {
    border: solid 2px #4a0c01;
    background-color: #e5e2df;
    padding: 10px 8px;
    border-radius: 5px;
  }
}
</style>
