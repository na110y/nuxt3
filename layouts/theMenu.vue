<template>
  <menu>
    <div class="menu" :class="{menuNav:isMenuNav}">
      <nuxt-link to="/">
        <div class="logo" :class="{logoIcon:isMenuNav}">
          <img src="../public/favicon.ico" alt=""/>
          <div class="logo-txt"
               :class="{logoText:isMenuNav}"
          >HOUS SHOP
          </div>
        </div>
      </nuxt-link>
      <div class="right-icon" @click="btnClickMenu">
        <img :class="{iconRight:isMenuNav}"
             src="@/assets/img/right.svg"
             alt="error-icon">
      </div>
      <div class="menu-txt" :class="{menuText:isMenuNav}">MENU</div>
      <ul class="option">
        <nuxt-link
            v-for="option in listOption"
            :key="option" :to="option.link"
            @click="setCurrentContent(option.txt)"
            class="txtOption">
          <li class="option-item">
            <img :src="option.img"
                 alt="Error-option"
                 class="bgcColor">
            <div class="option-txt"
                 :class="{textOption:isMenuNav}"
            >{{ option.txt }}
            </div>
          </li>
        </nuxt-link>
      </ul>
      <ul class=setting>
        <nuxt-link
            v-for="tem in setting"
            :key="tem"
            :to="tem.link"
            @click="setCurrentContent(tem.txt)"
        >
          <li class="setting-img">
            <img :src="tem.img" alt="Error-option">
            <div class="setting-txt"
                 :class="{settingTxt:isMenuNav}"
            >{{ tem.txt }}
            </div>
          </li>
        </nuxt-link>

      </ul>

    </div>
  </menu>
</template>
<script setup>
import {ref} from 'vue';

import home from '~/assets/img/home.svg'
import cart from '~/assets/img/cart.svg'
import star from '~/assets/img/star.svg'
import hidde from '~/assets/img/hidde.svg'
import settings from '~/assets/img/settings.svg'
import {store} from "~/store";


const isMenuNav = ref(false);


// lưu lên store giá trị của router text khi nhấn
const setCurrentContent = (content) => {
  store.commit('SET_ROUTER_TEXT', content);
};

const btnClickMenu = () => {
  isMenuNav.value = !isMenuNav.value
}

const listOption = ref([
  {
    txt: 'Home',
    img: home,
    link: '/'
  },
  {
    txt: 'Cart',
    img: cart,
    link: '/cart'
  },
  {
    txt: 'Star',
    img: star,
    link: '/star'
  },
  {
    txt: 'Hidde',
    img: hidde,
    link: '/hidde'
  },
])


const setting = ref([
  {
    txt: 'Settings',
    img: settings,
    link: '/setting'
  },
])
</script>

<style lang="scss" scoped>
@import "@/assets/scss/base/theMenu";

</style>
