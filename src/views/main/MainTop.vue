<script setup lang="ts">
import { MqResponsive } from "vue3-mq";
import Button from "../../components/parts/BasicButton.vue"
</script>

<template>
  <div>
    <MqResponsive target="sp">
      <p>ShopingListをはじめる</p>
      <Button title="ログイン" color="#008b8b"></Button>
    </MqResponsive>
  </div>
</template>

<style lang="scss" scoped></style>
