<script setup lang="ts">
import { MqResponsive } from "vue3-mq";
import { useRoute } from "vue-router";

const route = useRoute();

const categoryId = route.params;
</script>

<template>
  <div>
    <MqResponsive target="sp">
      <div class="common-regist">
        <div class="regist-header">
          <router-link class="regist-header-title" to="/regist/category">
            <h2>Category</h2>
          </router-link>
          <div v-if="Object.keys(categoryId).length">
            <router-link class="regist-header-title" :to="{ name: 'registItem', params: { id: categoryId } }">
              <h2>Item</h2>
            </router-link>
          </div>
          <div v-else class="regist-header-title">
            <h2>Item</h2>
          </div>
        </div>
        <router-view></router-view>
      </div>
    </MqResponsive>
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
        font-size: 26px;
      }
    }
  }
}
</style>
