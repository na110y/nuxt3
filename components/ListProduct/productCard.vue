<template>
  <div class="itemProduct">
    <div class="product">
      <img class="product_img" :src="product.image" alt="">
      <nuxt-link :to="`/product/${product.id}`">
        <div class="product_title">{{ product.title }}</div>
      </nuxt-link>
      <div class="product_detail">
        {{ product.price }} <span>$</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    product: {
      type: Array,
      default: true
    }
  }
}
</script>
<style lang="scss" scoped>
@import "assets/scss/_reset.scss";
@import "assets/scss/_variables.scss";

.itemProduct {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
}

.product {
  display: flex;
  flex-direction: column;
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
  height: 300px;
  border-radius: 9px;
  padding: 8px;
  width: 100%;

  &_title {
    width: 100%;
    text-align: center;
    color: $gray-1;
    font-size: 14px;
    font-weight: 550;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &_price {
    margin: 8px 0;
    display: flex;
    justify-content: center;
    align-items: center;

    &--price {
      color: $gray-10;
    }
  }

  &_img {
    display: flex;
    margin: auto;
    width: 100%;
    max-height: 200px;
    height: 100%;
    mix-blend-mode:color-burn;

  }

  &_detail {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 8px;
    font-weight: 550;
    color: $gray-11;

    span {
      color: $gray-11;
      font-weight: 550;
      margin-left: 4px;
    }

    &--txt {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: auto;
      border-radius: 8px;

      font-weight: 550;


    }

  }
}

</style>
