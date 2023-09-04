<template>
  <div class="container">
    <div>zxcszc</div>
    <div class="list-cart" v-for="item in listCart" :key="item">
      <div class="cart-title">{{ item.title }}</div>
      <div class="cart-img">
        <img :src="item.image" :alt="item.title"/>
      </div>
      <div class="cart-price">{{ item.price }}</div>
    </div>
  </div>

</template>
<script setup>
import {store} from "~/store";
import {computed, onMounted} from "vue";

const listCart = computed(() => store.state.cart);
</script>
<style lang="scss" scoped>
@import "assets/scss/base/cart/myCart";
</style>
