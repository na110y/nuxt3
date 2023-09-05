<template>
  <div class="product">
    <div class="product-details">
      <img class="product-details_img" :src="product.image" alt="" />
      <div class="product-details_select">
        <div class="product-details_title">{{ product.title }}</div>
        <div class="product-details_category">{{ product.category }}</div>
        <div class="product-details_description">{{ product.description }}</div>
        <div class="product-details_price">{{ product.price }} <span>$</span></div>
        <div class="quantity-number">
          <div class="quantity-number_txt">Số lượng</div>
          <div class="quantity-number_num">
            <div class="fist" @click="decreaseValue">-</div>
            <div class="center">{{ currentValue }}</div>
            <div class="last" @click="increaseValue">+</div>
          </div>
        </div>
        <div class="product-details_cart" @click="addToCart">Thêm vào giỏ hàng</div>
        <nuxt-link to="/cart" class="cart-link_txt"> Đi tới giỏ hàng</nuxt-link>
      </div>
    </div>

    <toast />
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";
import { store } from "~/store";
import toast from '@/components/modal/toast.vue'



const { id } = useRoute().params;
const defaultID = "https://fakestoreapi.com/products/" + id;
const { data: product } = await useFetch(defaultID, { key: id });
const currentValue = ref(1);
const addToCart = () => {
  const productNew = { ...product };
  // Gán giá trị currentValue vào sản phẩm
  productNew.currentValue = currentValue.value;
  store.commit("ADD_TO_CART", productNew);

  // hiển thị toast khi nhấn thêm giỏ hàng
  store.dispatch('showSuccessToast', 'Thêm sản phẩm thành công!')
};


const decreaseValue = () => {
  if (currentValue.value > 1) {
    currentValue.value--;
  }
};
const increaseValue = () => {
  currentValue.value++;
};





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
    color: #12131c;
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
  transition: 0.3s ease-out;
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



    .cart-btn {
      padding: 0 16px;

      &_add {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: $gray-6;
        color: #fff;
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

.cart-link {
  padding: 0 16px;
  &_txt {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0.2px solid $gray-9;
    font-size: 18px;
    height: 53px;
    width: 100%;
    margin-bottom: 10px;
    cursor: pointer;
    background-color: $gray-6;
    color:$gray-0 ;
  }
}

.product-details_category {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 10px;
  color: $gray-6;
}
.product-details_description {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 10px;
  color: $gray-6;
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
      max-width: 500px;
      width: 100%;
    }

    &_img {
      max-width: 350px;
      width: 100%;
      height: auto;
      cursor: zoom-in;
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
  border: 0.2px solid $gray-9;
  font-size: 18px;
  height: 53px;
  width: calc(100% - 2px);
  margin-bottom: 10px;
  cursor: pointer;

  &:hover {
    transition: 0.2s ease-out;
    border: 0.2px solid $gray-4;
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
