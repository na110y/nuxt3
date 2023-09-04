<template>
  <div class="container">
    <div class="listProduct">
      <div class="listProduct_title">
        <div class="listProduct_title--txt">Danh sách Sản Phẩm</div>
        <div class="listProduct_title--btn">Thêm sản phẩm</div>
      </div>
      <div class="listProduct_item">
        <product/>
      </div>
    </div>
  </div>
</template>

<script setup>
import product from '@/pages/product/index.vue'


</script>
<style lang="scss" scoped>
@import "@/assets/scss/base/theContent";

body {
  margin: 0;
  padding: 0;
}
</style>
