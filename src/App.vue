<script setup lang="ts">
   import { ref } from 'vue';
   
   import Header from './components/Header.vue';
   import Main from './components/Main.vue';
   import Footer from './components/Footer.vue';

   //refs
   const isElementsVisible = ref<boolean>(false);
   //functions
   const mangeElementsVisibility = (value:boolean) => {
    
     isElementsVisible.value = value;
   }
</script>

<template>
  <Header @toggleElementsVisbility="mangeElementsVisibility"/>
  <Main v-if="!isElementsVisible"/>
  <Footer v-if="!isElementsVisible"/>

</template>

<style lang="scss" scoped>
.main-section {
  overflow-y: hidden;
}
</style>
