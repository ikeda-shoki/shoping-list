<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";

const categoryId = ref<string>(useRoute().path);
</script>

<template>
  <div>
    <div class="common-regist">
      <div class="regist-header">
        <div class="regist-header-title" :class="{ active: categoryId.indexOf('item') < 0 }">
          <h2>Category</h2>
        </div>
        <div class="regist-header-title" :class="{ active: categoryId.indexOf('item') >= 0 }">
          <h2>Item</h2>
        </div>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.common-regist {
  .regist-header {
    padding: 10px 5px 0 5px;
    border-bottom: #f1a598 5px solid;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .regist-header-title {
      width: 100px;
      flex-grow: 1;
      border-radius: 15px 15px 0 0;
      border: #f1a598 3px solid;
      border-bottom: none;
      text-align: center;

      h2 {
        font-size: 18px;
        color: #4a0c01;
        line-height: 35px;
      }
    }

    .active {
      background-color: #f1a598;

      h2 {
        font-size: 22px;
      }
    }
  }
}
</style>
