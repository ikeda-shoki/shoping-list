<script setup lang="ts">
import CategoryItem from "../../components/parts/CategoryItem.vue";
import { Item } from "../../store/Item";
import { deleteItemData } from "../../logic/FirebaseAction";
import { useGlogalStore, States } from "../../store/global";
import { ref } from "vue";

const states = ref<States>(useGlogalStore());

const deleteItem = async (item: Item, categoryId: string) => {
  await deleteItemData(item, categoryId, states.value.loginUser.userId);
  states.value.categorys.map((category) => {
    if (category.categoryId === categoryId) {
      const newRegistItemsData = category.registItems.filter((itemData) => itemData.itemId !== item.itemId);
      category.registItems = newRegistItemsData;
    }
  });
};
</script>

<template>
  <div>
    <div class="category-items">
      <template v-for="category in states.categorys" :key="category">
        <CategoryItem :category="category" @delete-item="deleteItem($event, category.categoryId)"></CategoryItem>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.category-items {
  margin: 5px auto 60px;
  padding: 0 10px 50px;
  max-width: 600px;
}
</style>
