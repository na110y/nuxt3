<template>
  <div class="container">
    <nav>
      <the-menu></the-menu>
      <the-header/>
    </nav>
    <div class="content">
      <slot/>
    </div>
  </div>

</template>
<script>
import {defineComponent} from "vue";
import theMenu from "~/layouts/theMenu.vue";
import theHeader from "~/layouts/theHeader.vue"
import TheHeader from "~/layouts/theHeader.vue";

export default defineComponent({
  components: {TheHeader, theMenu}
})

</script>

