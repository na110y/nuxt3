<template>
  <header>
    <div class="header">
      <div class="header-txt"> {{ currentContent }}</div>
      <div class="search">
        <img class="search-icon" src="@/assets/img/search.svg" alt="error-search">
        <input class="search-txt" type="text" placeholder="Search everything">
      </div>
      <ul class="option">
        <li class="option-item" v-for="item in listOption" :key="item">
          <img :src="item.img" alt="error-option">
        </li>
      </ul>
    </div>
  </header>
</template>

<script setup>
import {ref, computed, onMounted} from 'vue';
import cart from '~/assets/img/cart2.svg'
import sign from '~/assets/img/sign.svg'
import {store} from "~/store";


// // gọi lên store để ấy giá trị của text router khi đã lưu
const currentContent = computed(() => store.state.textRouter)


const listOption = ref([
  {
    img: cart
  },
  {
    img: sign
  },
])


</script>
<style lang="scss" scoped>
@import "assets/scss/base/theHeader";
</style>
