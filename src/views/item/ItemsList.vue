<script setup lang="ts">
import CategoryItem from "../../components/parts/CategoryItem.vue";
import { Item } from "../../store/Item";
import { deleteItemData } from "../../logic/FirebaseAction";
import { MqResponsive } from "vue3-mq";
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
    <MqResponsive target="sp">
      <div class="category-items">
        <template v-for="category in states.categorys" :key="category">
          <CategoryItem :category="category" @delete-item="deleteItem($event, category.categoryId)"></CategoryItem>
        </template>
      </div>
    </MqResponsive>
  </div>
</template>

<style lang="scss" scoped>
.category-items {
  margin: 5px 10px 60px;
  padding-bottom: 50px;
}
</style>
