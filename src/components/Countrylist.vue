<template>
    <div class="country-details">
      <div class="country-details__content">
       <div v-for="(elem,index) in data" :key="index" class="country-details__content__link">{{ elem }}</div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const data = ref<string[]>(new Array(39).fill('Coutry | Language'));
  
</script>

<style lang="scss" scoped>

   .country-details {
    min-height: 25vh;
    width: 100%;
    padding: 10px 21px;
    position: relative;

    &__content {
    display: grid;
    padding: 10px 10px 30px 10px;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: repeat(13,1fr);
    
    &__link {
        display: block;
        padding: 7px 0px;
    }
    }
   }

   .country-details::after {
    content: '';
    width: 100%;
    height: 1px;
    background-color: lightgrey;
    position: absolute;
    bottom: 0px;
    left: 0;
   }

   @media screen and (max-width:1024px) {
     .country-details {
        &__content {
            grid-template-columns: 1fr 1fr;
        }
     }
   }

   @media screen and (max-width:768px) {
     .country-details {
        &__content {
            grid-template-columns: 1fr;
            padding: 10px 15px 10px 60px;
        }
     }
   }

</style>