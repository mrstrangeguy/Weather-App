<template>
    <div class="menu-items">
     <button v-for="(item,index) in data" class="common-button-style menu-item" @click.stop="selectOption(index)">
    <div  class="menu-item__header" >
        <span class="title" >{{ item.title || item.region }}</span>
        <img :class="{'icon':true,'rotate-icon':(index === selectedTopic)}" src="/src/images/arrow-down-blue.svg" alt="image" >
    </div>
    <div v-if="selectedItem === index" class="menu-item-options" @click.stop>
     <button v-for="currentDetails in (item.details | item.countries)" class="common-button-style menu-item-options__option">{{ currentDetails }}</button>
    </div>
    </button>
     </div>
</template>

<script setup lang="ts">
import {ref} from "vue"
import topicsDataType from "../types/topicsDataType";
import countryDataType from "../types/countryDataType";

const selectedItem = ref<number>(-1);
defineProps<{
    data:topicsDataType | countryDataType | undefined;
}>()

</script>

<style lang="scss" scoped>
 .menu-items {
       
       *{
           cursor: pointer;
       }
           .menu-item {
               padding: 0;
               margin: 0;
               border: 0;
               width: 100%;
             
               &__header {
                   display: flex;
                   justify-content: space-between;
                   align-items: center;
                   padding: 10px 31px;
                   border-top: 1px solid rgb(222, 222, 222);
                   background-color: white;

                   .title {
                       font-size: 16px;
                   }

                   .icon {
                       height: 18px;
                       width:18px;
                       display: block;
                   }
               }
              
           }
}

.menu-item-options {
    
    &__option {
    background-color: white;
    width: 100%;
    text-align: left;
    padding: 10px 15px 10px 60px;
    background-color: rgb(241, 241, 241);

    border: 1px solid rgb(222, 222, 222);
    font-size: 16px;
    line-height: 18.4px;
    }
}
</style>