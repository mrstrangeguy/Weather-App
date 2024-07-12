<template>
    <div v-if="!isFooterVisible" class="footer-nav">

      <a v-for="navLink in FooterNavData" class="footer-nav__link">

      <span v-if="navLink.iconText" class="icon-text">{{ navLink.iconText }}</span>

      <img class="icon" :src="navLink.icon" alt="footer-nav-image">

      <div class="description">{{ navLink.description }}</div>

      </a>
     
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import FooterNavData from '../data/footerNavData.json'

//ref
const navData = ref();

defineProps<{
    isFooterVisible:boolean;
}>();

//onMounted
onMounted(() => {
  navData.value = FooterNavData
})

</script>

<style lang="scss" scoped>
.footer-nav {
    z-index: 100;
    width: 100%;
    position: sticky;
    bottom: 0;
    width: 100%;
    display: flex;
    background-color: white;
    box-shadow: 0 -4px 5px -2px rgba(0,0,0,.2);

    &__link {
        display: block;
        flex: 1;
        padding: 5px 0px;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
    }

    .icon-text {
      position: absolute;
      top: 16px;
      font-size: 11px;
      line-height: 13.2px;
      color: rgb(43, 43, 43);  
    }

    .description {
      font-size: 12px
    }
}
</style>