<template>
  <div class="container">
    <div class="cart-content">
      <div class="cart-head">GIỎ HÀNG</div>
      <div class="cart-body">
        <table>
          <thead class="thead-cart">
          <tr class="head-cart">
            <th class="cart-head--title">Sản Phẩm</th>
            <th class="cart-head--option">Chỉnh sửa</th>
            <th class="cart-head--quantity">Số lượng</th>
            <th class="cart-head--quantity">Giá</th>
          </tr>
          </thead>
          <tbody class="list-cart">
          <tr class="item-cart" v-for="(item,index) in listCart" :key="index">
            <td class="cart-item cart-item-product">
              <div class="cart-item-container">
                <div class="cart-item--img">
                  <img :src="item._value.image" :alt="item._value.title"/>
                </div>
                <div class="cart-item_product">
                  <div class="cart-item--title">{{ item._value.title }}</div>
                  <div class="cart-item--category">{{ item._value.category }}</div>
                  <div class="cart-item--description">{{ item._value.description }}</div>
                </div>
              </div>
            </td>
            <td class="cart-delele" @click="deleteCart(item._value.id, index)">Xóa</td>
            <td class="cart-description cart-item-quantity">{{ item.currentValue }}</td>
            <td class="cart-price cart-item-price">{{ item._value.price }} <span>$</span></td>
          </tr>
          </tbody>
        </table>
      </div>
      <div id="cart">
        <div class="cart-all">
          <div class="cart-all_quantity">
            <div class="quantity-txt"> Tổng sản phẩm:</div>
            <div class="quantity-number">{{ totalQuantity }}</div>
          </div>
          <div class="cart-all_price">
            <div class="price-txt">Tạm tính:</div>
            <div class="price-number">{{ totalPrice }} <span>$</span></div>
          </div>
        </div>
      </div>
      <div class="submit">
        <div class="btn-nuxtLink">
          <nuxt-link to="/">Tiếp tục đặt hàng</nuxt-link>
        </div>
        <div class="btn-order">Mua
          <hàng></hàng>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import {store} from "~/store";
import {ref, computed, onMounted, watch} from "vue";


// lấy ra danh sách của mảng cart
const listCart = computed(() => store.getters.cartItems);

// tính số lượng sản phẩm
const totalQuantity = computed(() => {
  return listCart.value.reduce((total, item) => total + item.currentValue, 0);
});

// Tính tổng số tiền tạm tính
const totalPrice = computed(() => {
  return listCart.value.reduce((total, item) => total + item._value.price * item.currentValue, 0);
});

// xóa sản phẩm khỏi mảng cart
const deleteCart = (productId, index) => {
  // Xóa sản phẩm khỏi danh sách giỏ hàng trong store
  store.commit("REMOVE_FROM_CART", productId);
}


onMounted(async () => {
  await store.dispatch('setProduct');
});



</script>

<style lang="scss" scoped>
@import "assets/scss/base/cart/myCart";
</style>
