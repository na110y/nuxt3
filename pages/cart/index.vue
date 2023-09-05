<template>
  <div class="container">
    <div class="list-cart"  v-for="item in listCart" :key="item.id">
      <div class="cart-title">{{ item.title }}</div>
      <div class="cart-title">{{ item.currentValue }}</div>
      <img :src="item.image" :alt="item.title" />
      <div class="cart-price">{{ item.price }}</div>
    </div>
  </div>
</template>

<script setup>
import { store } from "~/store";
import {ref,computed, onMounted,watch} from "vue";

const listCart = computed(() => store.getters.cartItems);
console.log(listCart.value);
onMounted(async () => {
  await store.dispatch('setProduct');
});
</script>

<style lang="scss" scoped>
@import "assets/scss/base/cart/myCart";
</style>
