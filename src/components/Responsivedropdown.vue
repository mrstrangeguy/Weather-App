<template>
    <div class="responsive-dropdown">
     <h2 class="heading">
        <span>Menu</span>
        <span class="heading__lang-select">
        <img class="heading__lang-select__globe-icon" src="../images/responsive-globe-icon.svg" alt="globe-icon">
        <span class="heading__lang-select__text">IN</span>
        <span class="heading__lang-select__text">°C</span>
        </span>
     </h2>

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
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import topicsDataType from '../types/topicsDataType';
import topicsData from '../data/topicsData.json'

const topics = ref<topicsDataType[]>();
const selectedTopic = ref<number>(-1);
//onMounted
onMounted(() => {
   topics.value = topicsData
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
    position: absolute;
    top: 62px;
    height: calc(100% - 62px);
    z-index: 9;
    width: 100%;
    overflow-y: auto;

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

 .hello {
    margin: 25px 0px;
 }
 
</style>