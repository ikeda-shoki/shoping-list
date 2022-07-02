<script setup lang="ts">
import { getCategoryUrlId } from '../../router';

const categoryId = getCategoryUrlId();
</script>

<template>
  <div>
    <div class="common-regist">
      <div class="regist-header">
        <router-link class="regist-header-title" :to="{ name: 'registCategory', params: { categoryId: categoryId } }">
          <h2>Category</h2>
        </router-link>
        <template v-if="categoryId !== 'new'">
          <router-link class="regist-header-title" :to="{ name: 'registItem', params: { categoryId: categoryId } }">
            <h2>Item</h2>
          </router-link>
        </template>
        <template v-else>
          <div class="regist-header-title">
            <h2>Item</h2>
          </div>
        </template>
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

    .router-link-active {
      background-color: #f1a598;

      h2 {
        font-size: 22px;
      }
    }
  }
}
</style>
