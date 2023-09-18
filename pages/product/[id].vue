<template>
  <div class="product">
    <div class="product-details">
      <img class="product-details_img" :src="product.image" alt=""/>
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
  </div>

  <toast/>
</template>
<script setup>
import {ref, computed, onMounted} from "vue";
import {store} from "~/store";
import toast from '@/components/modal/toast.vue'

// lấy ra giá trị id của sản phẩm đã chọn
const {id} = useRoute().params;
const defaultID = "https://fakestoreapi.com/products/" + id;

// lấy ra thông tin của sản phẩm đã chọn
const {data: product} = await useFetch(defaultID, {key: id});
const currentValue = ref(1);

// nhấn thêm sản phẩm vào giỏ hàng
const addToCart = () => {
  const productNew = {...product};
  productNew.currentValue = currentValue.value;// Gán giá trị currentValue vào sản phẩm
  store.commit("ADD_TO_CART", productNew);
  // hiển thị toast khi nhấn thêm giỏ hàng
  store.dispatch('showSuccessToast', 'Thêm sản phẩm thành công!')
};

// giảm số lượng sản phẩm
const decreaseValue = () => {
  if (currentValue.value > 1) {
    currentValue.value--;
  }
};




// tăng số lượng sản phẩm
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
  justify-content: center;
  gap: 0 20px;
  border: 1px solid $gray-8;
  border-radius: 6px;
  height: 35px;
  width: 100px;

  .fist {
    font-size: 24px;
    font-weight: 500;
    cursor: pointer;
  }

  .center {
  }

  .last {
    font-size: 24px;
    font-weight: 500;
    cursor: pointer;
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
    color: $gray-0;
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
