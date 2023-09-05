<template>
  <header>
    <div class="header">
      <div class="header-txt"> {{ currentContent }}</div>
      <div class="search">
        <img class="search-icon" src="@/assets/img/search.svg" alt="error-search">
        <input class="search-txt" type="text" placeholder="Search everything">
      </div>

      <div class="option">
        <div class="cart-count">{{ cartItemCount }}</div>
        <div class="option-item" v-for="item in listOption" :key="item">
          <img :src="item.img" alt="error-option" @click="btnShowCart(item)">
        </div>

      </div>


      <cart-mini :isShowCart="isShowCart" @closeCartMini="isCartMini"/>
    </div>
  </header>
</template>

<script setup>
import {ref, computed, onMounted} from 'vue';
import cart from '~/assets/img/cart2.svg'
import sign from '~/assets/img/sign.svg'
import {store} from "~/store";
import cartMini from "~/components/modal/cartMini.vue";

// // gọi lên store để ấy giá trị của text router khi đã lưu
const currentContent = computed(() => store.state.textRouter)
const isShowCart = ref(false)

const isCartMini = (value) => {
  isShowCart.value = value
}

const btnShowCart = (item) => {
  if (item.img === cart) {
    isShowCart.value = true;
  }

}
const cartItemCount = computed(() => store.state.cart.length);
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
