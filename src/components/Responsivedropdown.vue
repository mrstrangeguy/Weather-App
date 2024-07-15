<template>
    <div class="responsive-dropdown">
     <h2 class="heading">
        <span>{{ headingText }}</span>
        <span class="heading__lang-select" @click="isMenuSectionSelected = !isMenuSectionSelected">
        <img class="heading__lang-select__globe-icon" src="../images/responsive-globe-icon.svg" alt="globe-icon">
        <span class="heading__lang-select__text">IN</span>
        <span class="heading__lang-select__text">°C</span>
        </span>
     </h2>

     <button class="common-button-style back-button" @click="isMenuSectionSelected=false">
      <img class="back-button__icon" src="../images/arrow-left.svg" alt="back-button-icon">
      <span class="back-button__text">Back to Menu</span>
     </button>

     <div class="popup-unit-select">
     <PopupTempOptions :headerData="headerData" :currentUnitDescription="currentUnitDescription"/>
     </div>

     <div class="menu-items">
     <button v-for="(topic,index) in topics" class="common-button-style menu-item" @click.stop="selectOption(index)">
    <div  class="menu-item__header" >
        <span class="title" >{{ topic.title }}</span>
        <img :class="{'icon':true,'rotate-icon':(index === selectedTopic)}" src="/src/images/arrow-down-blue.svg" alt="image" >
    </div>
    <div v-if="selectedTopic === index" class="menu-item-options" @click.stop>
     <button v-for="currentDetails in topic.details" class="common-button-style menu-item-options__option">{{ currentDetails }}</button>
    </div>
    </button>
     </div>

     <ResponsiveMenuItems/>
     
    </div>
    <Footer :isFooterVisible="true"/>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

import topicsDataType from '../types/topicsDataType';
import headerDataType from '../types/headerDataType';
import topicsData from '../data/topicsData.json'
import PopupTempOptions from './PopupTempOptions.vue';
import ResponsiveMenuItems from './ResponsiveMenuItems.vue'
import Footer from './Footer.vue';

const topics = ref<topicsDataType[]>();
const selectedTopic = ref<number>(-1);
const isMenuSectionSelected = ref<boolean>(true);

defineProps<{
    headerData:headerDataType | undefined;
    currentUnitDescription:string;
}>()

//onMounted
onMounted(() => {
   topics.value = topicsData
})

//computed
const headingText = computed(() => {
    return isMenuSectionSelected.value ? 'Menu' : 'Units';
})

//function
const selectOption = (index:number) => {
    if(index === selectedTopic.value) selectedTopic.value = -1;
    else selectedTopic.value = index;
}


</script>

<style lang="scss" scoped>
 .responsive-dropdown {
    background-color: white;
   
    height: calc(100% - 62px);
    z-index: 9;
    width: 100%;
    overflow-y: auto;
    grid-column: 1/3;

   
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
 }

  .popup-unit-select {
    margin: 0px 30px 14px 30px;
  }

 .back-button {
    display: block;
    margin: 0px 0px 32px 31px;
    display: flex;
    align-items: center;
    background-color: white;

    &__icon {
        display: block;
        width: 20px;
        height: 20px;
    }

    &__text {
        display: block;
        font-size: 16px;
        line-height: 18.4px;
        font-weight: 400;
        color: rgb(27, 77, 228);
        padding-left: 8px;
    }
 }

 .heading {
        font-size: 24px;
        margin: 0;
        line-height: 36px;
        padding: 20px 20px 25px 30px;
        display: flex;
        justify-content: space-between;

        &__lang-select {
          display: flex;
          align-items: center;
          padding: 1px 6px;

          &__globe-icon {
            padding-right: 10px;
          }

          &__text {
            font-size: 13px;
            font-weight: 400;
            color: rgb(27, 77, 228);
            display: block;
            line-height: 14.95px;

            &:nth-child(3) {
                padding-left: 6px;
                border-left: 1px solid rgb(27, 77, 228);
                margin-left: 6px;
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