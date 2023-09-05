<template>
  <div class="product">
    <product-card v-for="(product,index) in listData" :key="index" class="product-item" :product="product"/>
  </div>
</template>
<script setup>
import productCard from '@/components/ListProduct/productCard.vue'
import {ref, computed, onMounted} from 'vue';
import {store} from "~/store";

// const {data: products} = await useFetch('https://fakestoreapi.com/products');

const listData = computed(() => store.state.listProduct);

onMounted(async () => {
  await store.dispatch('setProduct');
  // await store.dispatch('otherAction');
  // await store.dispatch('anotherAction');
});


</script>
<style scoped>

.product {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  gap: 30px;

}

</style>
