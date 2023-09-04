<template>
  <div class="product">
    <div class="product-details">
      <img class="product-details_img" :src="product.image" alt="">
      <div class="product-details_select">
        <div class="product-details_title">{{ product.title }}</div>
        <div class="product-details_price">{{ product.price }} <span>$</span></div>
        <div class="quantity-number">
          <div class="quantity-number_txt">Số lượng</div>
          <div class="quantity-number_num">
            <div class="fist" @click="decreaseValue">-</div>
            <div class="center">{{ currentValue }}</div>
            <div class="last" @click="increaseValue">+</div>
          </div>
        </div>
        <div class="product-details_cart" @click="btnShowCart">Thêm vào giỏ hàng</div>
        <div class="product-addCart">Mua ngay</div>
      </div>
    </div>

    <div class="cart-mini" v-if="isShowCart ">
      <div class="cart-mini_head">
        <div class="cart-name">Giỏ hàng</div>
        <img @click="btnCancel" class="cart-close" src="@/assets/img/close.svg" alt="error">
      </div>
      <div class="cart-mini_content">
        <img class="cart-mini_img" :src="product.image" alt="">
        <div class="">
          <div class="cart-mini_title"> {{ product.title }}</div>
          <div class="cart-mini_quantity">
            <div class="fist" @click="decreaseValue">-</div>
            <div class="center">{{ currentValue }}</div>
            <div class="last" @click="increaseValue">+</div>

          </div>

        </div>
      </div>
      <div class="cart-mini_footer">
        <div class="cart-priceAll">
          <div class="cart-priceAll_txt">Tạm tính</div>
          <div class="cart-priceAll_number"> {{ product.price }} <span>$</span></div>
        </div>
        <div class="cart-link">
          <nuxt-link to="/cart" class="cart-link_txt"> Đi tới giỏ hàng</nuxt-link>
        </div>
        <div class="cart-btn">
          <div class="cart-btn_add" @click="addtocart">Thêm vào giỏ hàng</div>
        </div>
      </div>

    </div>
  </div>
</template>
<script setup>
import {ref, computed, onMounted} from 'vue';
import {store} from "~/store";

const {id} = useRoute().params
const defaultID = 'https://fakestoreapi.com/products/' + id;
const {data: product} = await useFetch(defaultID, {key: id})

const isShowCart = ref(false)
const currentValue = ref(1);
const decreaseValue = () => {
  currentValue.value--;
}
const increaseValue = () => {
  currentValue.value++;
}
const btnCancel = () => {
  isShowCart.value = false
}

const selectedProduct = computed(() => store.state.selectedProduct);

const addtocart = () => {
  // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
  const existingProduct = store.state.cart.find((item) => item.id === product.id);
  if (existingProduct) {
    // Nếu đã tồn tại, tăng số lượng
    existingProduct.currentValue++;
  } else {
    // Nếu chưa tồn tại, thêm sản phẩm mới vào giỏ hàng
    const newProduct = {...product, currentValue: 1};
    store.commit('ADD_TO_CART', newProduct);
  }
}
const btnShowCart = () => {
  isShowCart.value = true
  // Lưu sản phẩm đã chọn vào store
  store.commit('SET_SELECTED_PRODUCT', selectedProduct);
}

</script>
<style lang="scss" scoped>
@import "assets/scss/_reset.scss";

.quantity-number {
  display: flex;
  align-items: center;
  gap: 0 15px;
  margin-bottom: 10px;

  &_txt {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 10px;
    color: #12131C;
  }
}

.quantity-number_num {
  display: flex;
  align-items: center;
  gap: 0 15px;

  .fist {
    font-size: 24px;
    font-weight: 500;
    cursor: pointer;
    padding: 1px 12px;
    border: 1px solid $gray-6;
  }

  .center {
    padding: 6px 12px;
    border: 1px solid $gray-6;
  }

  .last {
    font-size: 24px;
    font-weight: 500;
    cursor: pointer;
    padding: 1px 8px;
    border: 1px solid $gray-6;
  }
}


.cart-mini {
  position: fixed;
  top: 85px;
  right: 0;
  max-width: 350px;
  width: 100%;
  height: 100vh;
  z-index: 1;
  transition: .3s ease-out;
  border-left: 1px solid $gray-10;


  &_head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px 16px;
    margin-top: 16px;
    border-bottom: 1px solid $gray-10;

    .cart-name {
      font-weight: 550;
      font-size: 18px;
      color: $gray-6;
    }

    .cart-close {
      width: 15px;
      height: 15px;
      cursor: pointer;
    }
  }

  &_content {
    display: flex;
    gap: 0 15px;
  }

  &_footer {
    position: absolute;
    bottom: 110px;
    left: 0;
    width: 100%;
    margin-top: 50px;
    border-top: 1px solid $gray-10;


    .cart-priceAll {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      border-bottom: 1px solid $gray-10;
      margin-bottom: 16px;

      &_txt {
        font-weight: 550;
        font-size: 16px;
        color: $gray-6;
      }

      &_number {
        font-weight: 550;
        font-size: 16px;
        color: $gray-6;
      }
    }

    .cart-link {
      padding: 0 16px;

      &_txt {
        display: flex;
        justify-content: center;
        align-items: center;
        border: 0.2px solid $gray-6;
        font-size: 18px;
        height: 53px;
        width: 100%;
        margin-bottom: 10px;
        cursor: pointer;
        color: $gray-6;

        &:hover {
          transition: .2s ease-out;
          border: .2px solid $gray-4;
          background-color: $gray-4;
          color: $gray-0;
        }
      }
    }

    .cart-btn {
      padding: 0 16px;

      &_add {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: $gray-6;
        color: #FFF;
        font-size: 18px;
        height: 53px;
        width: 100%;
        cursor: pointer;

      }
    }

  }

  &_img {
    padding: 16px;
    width: 150px;
    height: 150px;

  }

  &_title {
    font-weight: 500;
    font-size: 16px;
    color: $gray-6;
    margin-top: 16px;
  }


  &_quantity {
    display: flex;
    align-items: center;
    gap: 0 8px;
    margin: 8px 0;

    .fist {
      font-size: 24px;
      font-weight: 500;
      cursor: pointer;
      padding: 1px 12px;
      border: 1px solid $gray-6;
    }

    .center {
      padding: 6px 12px;
      border: 1px solid $gray-6;
    }

    .last {
      font-size: 24px;
      font-weight: 500;
      cursor: pointer;
      padding: 1px 8px;
      border: 1px solid $gray-6;
    }
  }
}


.product {
  padding: 16px;
  overflow: auto;

  &-details {
    display: flex;

    &_select {
      margin-left: 30px;
      display: flex;
      flex-direction: column;
    }

    &_img {
      max-width: 350px;
      width: 100%;
      height: auto;
    }
  }
}

.product-details_title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
  color: $gray-6;
}

.product-details_price {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
  color: $gray-6;
}

.product-details_cart {
  display: flex;
  justify-content: center;
  align-items: center;
  border: .2px solid $gray-6;
  font-size: 18px;
  height: 53px;
  width: calc(100% - 2px);
  margin-bottom: 10px;
  cursor: pointer;

  &:hover {
    transition: .2s ease-out;
    border: .2px solid $gray-4;
    background-color: $gray-4;
    color: $gray-0;
  }
}

.product-addCart {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $gray-6;
  color: $gray-0;
  font-size: 18px;
  height: 53px;
  width: 100%;
  cursor: pointer;
}

</style>
