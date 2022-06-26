<script setup lang="ts">
import { defineProps } from "vue";
import { Category } from "../../store/Category";
import { useGlogalStore } from "../../store/global";
import SaveItem from "../../components/parts/SaveItem.vue";

const states = useGlogalStore();

defineProps<{
  category: Category;
}>();
</script>

<template>
  <div :style="{ backgroundColor: category.categoryColor }" class="category-item">
    <div class="category-header">
      <h3 class="category-name">{{ category.categoryName }}</h3>
      <span class="category-regist-button">
        <v-icon>mdi-plus-circle-outline</v-icon>
      </span>
    </div>
    <div class="save-items">
      <template v-for="saveItem in states.saveItems" :key="saveItem">
        <SaveItem></SaveItem>
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
