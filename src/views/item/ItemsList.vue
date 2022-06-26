<script setup lang="ts">
import { MqResponsive } from "vue3-mq";
import { useGlogalStore } from "../../store/global";
import CategoryItem from "../../components/parts/CategoryItem.vue";

const states = useGlogalStore();
</script>

<template>
  <div>
    <MqResponsive target="sp">
      <div class="category-items">
        <template v-for="category in states.categorys" :key="category">
          <CategoryItem :category="category"></CategoryItem>
        </template>
      </div>
    </MqResponsive>
  </div>
</template>

<style lang="scss" scoped>
.category-items {
  margin: 5px 10px;
}
</style>
