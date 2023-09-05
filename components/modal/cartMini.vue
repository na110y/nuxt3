<template>
  <div class="modal" v-if="isShowCart">
    <div class="modal-cart">
      <div class="modal-cart--mini">
        <div class="modal-mini--title">GIỎ HÀNG MINI</div>
        <div class="modal-mini--close" @click="closeCartMini">
          <img src="@/assets/img/close.svg" alt="error">
        </div>
      </div>

      <div class="item-cart--container">
        <div class="item-cart" v-for="(item,index) in listCart" :key="index">
          <div class="cart-item cart-item-product">
            <div class="cart-item-container">
              <div class="cart-item--img">
                <img :src="item._value.image" :alt="item._value.title"/>
              </div>
              <div class="cart-item_product">
                <div class="cart-item--title">{{ item._value.title }}</div>
                <div class="cart-mini-quantity">
                  <div class="cart-quantity--number">Số lượng:</div>
                  <div class="cart-description cart-item-quantity"> {{ item.currentValue }}</div>
                </div>
                <div class="cart-mini-price">
                  <div class="cart-price--number">Giá tiền:</div>
                  <div class="cart-price cart-item-price"> {{ item._value.price }} <span>$</span></div>
                </div>
                <div class="cart-delele" @click="deleteCart(item._value.id, index)">Xóa sản phẩm</div>

              </div>
            </div>
          </div>

        </div>
      </div>


      <div class="submit">
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

        <div class="btn-nuxtLink">
          <nuxt-link to="/">Tiếp tục đặt hàng</nuxt-link>
        </div>
        <div class="btn-order">Mua luôn</div>
      </div>
    </div>
    <toast/>
  </div>
</template>

<script>
import {store} from "~/store";
import {ref, computed, onMounted, watch} from "vue";
import toast from '@/components/modal/toast.vue'

export default {
  props: {
    isShowCart: {
      type: Boolean,
    }
  },
  components: {toast},
  setup(props, context) {
    // lấy ra danh sách của mảng cart
    const listCart = computed(() => store.getters.cartItems);
    const closeCartMini = () => {
      context.emit("closeCartMini", false)
    }

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

      store.dispatch('showSuccessToast', 'Xóa thành công!')
    }


    onMounted(async () => {
      await store.dispatch('setProduct');
    });
    return {
      listCart,
      totalQuantity,
      totalPrice,
      deleteCart,
      closeCartMini
    }
  }
}


</script>

<style lang="scss" scoped>
@import "assets/scss/base/cart/cartMini";
</style>
