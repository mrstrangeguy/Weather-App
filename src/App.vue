<script setup lang="ts">
   import { onMounted, onUnmounted, ref } from 'vue';
   
   import Header from './components/Header.vue';
   import Main from './components/Main.vue';
   import Footer from './components/Footer.vue';
   import Footernav from './components/Footernav.vue'

   //refs
   const isElementsVisible = ref<boolean>(false);
   const isFooterVisible = ref<boolean>(true);

   //onMounted
   onMounted(() => {
    window.addEventListener('resize',onResponsive)
   })

   //onUnMounted
   onUnmounted(() => {
    window.removeEventListener('resize',onResponsive)
   })

   //functions

   const mangeElementsVisibility = (value:boolean) => {
    
     isElementsVisible.value = value;
   }

   const onResponsive = () => {
    if(window.innerWidth <= 510) {
      isFooterVisible.value = false;
    }
    if(window.innerWidth > 500) {
      isFooterVisible.value = true;
    }
   }
</script>

<template>
  <Header @toggleElementsVisbility="mangeElementsVisibility"/>
  <Main v-if="!isElementsVisible"/>
  <Footer :isFooterVisible="isFooterVisible" id="#app-footer" v-if="!isElementsVisible"/>
 <Footernav v-if="!isElementsVisible" :isFooterVisible="isFooterVisible"/>
</template>

<style lang="scss" scoped>
.main-section {
  overflow-y: hidden;
}

//media query
@media screen and (max-width:510px) {
  #app-footer {
    display: none;
  }
}

</style>

