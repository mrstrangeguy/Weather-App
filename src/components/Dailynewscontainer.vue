<template>
    <div class="daily-news-grid">
    <div class="current-weather-details">
     <div class="heading">
        <h1 class="heading__title-text">Chennai, Tamil Nadu</h1>
        <span class="heading__time-text">As of 17:15 IST</span>
     </div>
     
     <div class="content">
     <div>
     <span class="content__temperature">32°</span>
     <div class="content__weather-des" >Mostly Cloudy</div>
     <div class="day-details">
     <span class="content__day">Day 37°</span>
     <span class="content__dot">•</span>
     <span class="content__day">Night 27°</span>
     </div>
     </div>
     
        <img class="content__main-logo" src="../images/partly-cloudy.svg" alt="">
     
     </div>
    </div>
    <div id="current-news-container" >
    <!--Top Stories Card-->
    <Newscard :title="pageData?.mainCard1.title" :buttontext="pageData?.mainCard1?.buttontext" class="main-content-element">
    <template v-slot:['news-cards-content']>
    <div class="card-content-grid">

        <div v-if="!isResponsive" class="card-content-grid__main-content responsive-main-content">
        <Mainnews :image="pageData?.mainCard1.mainContentDetails.img" :title="pageData?.mainCard1.mainContentDetails.heading" :para="pageData?.mainCard1.mainContentDetails.description"/>
        </div>

        <div class="sidebar-news-wrapper">
        <div class="card-content-grid__sidebar-content responsive-sidebar">
        <Sidebarnews class="responsive-sidebar-news" v-for="data in pageData?.mainCard1.sideBarContentDetails" :isStyleChangeEnabled="false" :img="data.img" :para="data.details"/>
        </div>
        </div> 

        <div v-if="isResponsive" class="sidebar-news-wrapper">
        <div class="card-content-grid__sidebar-content responsive-sidebar" >
        <Sidebarnews class="responsive-sidebar-news sidebar-news-v2" v-for="data in pageData?.mainCard1.sideBarContentDetails" :isStyleChangeEnabled="false" :img="data.img" :para="data.details"/>
        </div>
        </div>

    </div>
    </template>
     </Newscard>
    
    <!--Weather Access India Card--> 
    <Newscard :title="pageData?.mainCard2.title" :buttontext="pageData?.mainCard2?.buttontext" class="main-content-element">
    <template v-slot:['news-cards-content']>
    <Mainnews :image="pageData?.mainCard2.mainContentDetails.img" :title="pageData?.mainCard2.mainContentDetails.heading" :para="pageData?.mainCard2.mainContentDetails.description"/>    
    <div class="sidebar-cards-row">
    <div v-for="data in pageData?.mainCard2.sideBarContentDetails" class="sidebar-cards-row__card-wrapper">
    <Sidebarnews :img="data.img" :para="data.details" :isStyleChangeEnabled="true" class="main-card-2__side-bar-card" />
    </div>
    </div>
    </template> 
    </Newscard>

    <!--Main Section Advertisements-->
    <Advertisementcard class="main-content-element main-section-ad-row1-1">
        <template v-slot:['advertisement-image']>
        <img src="https://tpc.googlesyndication.com/simgad/8415435527389080299" class="main-section-ad-row1-image advertisement-img" alt="advertisement-image">
        </template>
    </Advertisementcard>
    <Advertisementcard v-if="!isResponsive" class="main-content-element main-section-ad-row1-2">
        <template v-slot:['advertisement-image']>
        <img src="https://tpc.googlesyndication.com/simgad/8755113534239921333" class="main-section-ad-row1-image advertisement-img" alt="advertisement-image">
        </template>
    </Advertisementcard>

     <!--Mapping Don't Miss,Top Video cards --> 
     <template v-for="(elem,index) in sidebarCards" :key="elem.id"  >
    <Newscard v-if="isTrailingDataVisible(index)" :title="elem.title" :buttontext="elem.buttontext" class="main-content-element">
    <template v-slot:['news-cards-content']>
    <div class="trailing-cards-container">
    <div class="trailing-cards-row">
    <Sidebarnews v-for="data in elem.cards" :img="data.img" :para="data.description" :isStyleChangeEnabled="true" class="trailing-card"/>
    </div>
    </div>
    </template>
    </Newscard>
    </template>

    <!--Responsive News card-->
    <Newscard class="responsive-news-card" v-if="isResponsive" :title="sidebarCards[1].title" :buttontext="sidebarCards[1].buttontext">
    <template v-slot:['news-cards-content']>
    <Mainnews image="https://v.w-x.co/1720757609165_India_2_Day_TOMORROW_Thu_11_2024_23_17_39xMproxy_9fd63395-b76b-4712-99a6-55dcc6793925.jpg?crop=16:9&width=980&format=pjpg&auto=webp&quality=60"
    title="WATCH: Latest India Weather Forecast: July 12"
    para=""
    />
    </template>
    </Newscard>
    
    <Advertisementcard class="main-content-element main-section-ad-row2">
        <template v-slot:['advertisement-image']>
        <div class="main-section-ad-row2-image-wrapper">
        <img src="https://tpc.googlesyndication.com/simgad/8419533411674054302" class="main-section-ad-row2-image-wrapper__image advertisement-img" alt="advertisement-image">
        </div>
        </template>
    </Advertisementcard>

    
    </div>
    <div v-if="!isResponsive" id="advertisements-container">

    <Advertisementcard >
    <template v-slot:['advertisement-image']>
    <img src="https://tpc.googlesyndication.com/simgad/8415435527389080299" alt="advertisement-image" class="advertisement-image advertisement-img">
    </template>
    </Advertisementcard>

    <Advertisementcard >
    <template v-slot:['header-content']>
    <div class="features-ad-header">
    <h2 class="features-ad-header__text">Stay Safe</h2>
    </div>    
    </template>

    <template v-slot:['additional-content']>
    <!--Declaring an empty div to remove the default additional content from this component-->
    <div></div>
    </template>
    

    <template v-slot:['advertisement-image']>
    <img  src="https://s.w-x.co/promo-modules-units-features.png?crop=2.85:1&width=320&format=pjpg&auto=webp&quality=60" alt="advertisement-image" class="advertisement-image features-ad-image advertisement-img">
    </template>
    </Advertisementcard>

    <Advertisementcard >
    <template v-slot:['advertisement-image']>
    <img src="https://tpc.googlesyndication.com/simgad/8415435527389080299" alt="advertisement-image" class="advertisement-image advertisement-img">
    </template>
    </Advertisementcard>

    <Advertisementcard >
    <template v-slot:['advertisement-image']>
    <img src="https://tpc.googlesyndication.com/simgad/8755113534239921333" alt="advertisement-image" class="advertisement-image advertisement-img">
    </template>
    </Advertisementcard>
    
    </div>

    <Advertisementcard class="main-content-element main-section-final-ad">
        <template v-slot:['advertisement-image']>
        <img src="https://tpc.googlesyndication.com/simgad/8419533411674054302" class="main-section-ad-row2-image-wrapper__image advertisement-img" alt="advertisement-image">
        </template>
    </Advertisementcard>
    
    </div>
    
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

import { MainCardsType } from '../types/mainCardType'
import cardsData from '../data/cardsData.json'
import trailingCardsData from '../data/trailingCardsData.json'
import Newscard from './Newscard.vue';
import Mainnews from './Mainnews.vue';
import Sidebarnews from './Sidebarnews.vue'
import Advertisementcard from './Advertisementcard.vue';

const pageData = ref<MainCardsType>();
const sidebarCards = ref<any>([]);
const isResponsive = ref<boolean>(false);

//onMounted
onMounted(() => {
  pageData.value = cardsData;
  sidebarCards.value = trailingCardsData;
  window.addEventListener('resize',onResponsive)
})
  
//onUnMounted
onUnmounted(() => {
    window.removeEventListener('resize',onResponsive)
})

const onResponsive = () => {

   if(window.innerWidth <= 510) {
    isResponsive.value = true
   }
   if(window.innerWidth > 510) {
    isResponsive.value = false
   }
   
}

const isTrailingDataVisible = (index:number) => {
   if(index !== 1) return true

   return index === 1 && !isResponsive.value
}

</script>

<style lang="scss" scoped>

    .current-weather-details {
       margin: 12px 10px;
       background-color: lightgreen;
       grid-column: 1/3;
       color: white;
       text-shadow: 0 0 5px rgba(23,36,50,.5);
       border-radius: 6px;
       overflow: hidden;
       background-repeat: no-repeat;
       background-size: cover;
       background-position: 100%;
       background-image: url('https://s.w-x.co/WeatherImages_Web/WeatherImage_PartlyCloudy-day_1.jpg?crop=16:9&width=800&format=pjpg&auto=webp&quality=70');
       
       .heading {
        padding: 10px 16px;
        background-color: rgba(0, 0, 0, 0.55);
        color: white;

        &__title-text {
            margin: 0;
            font-size: 18px;
            font-weight: 600;
            display: inline;
        }

        &__time-text {
            font-size: 13px;
            padding-left: 5px;
        }
       }

       .content {
        padding: 10px 16px;
        display: flex;
        justify-content: space-between;

        .day-details {
            margin-top: 5px;
            font-size: 18px;
            line-height: 19.8px;
        }
        
        &__temperature {
            font-size: 56px;
            line-height: 56px;
            font-weight: 500;
        }

        &__weather-des {
            font-size: 20px;
            line-height: 22px;
            font-weight: 600;
        }

        &__day {
            line-height: 19.8px;
            font-size: 18px;
            font-weight: 600;
        }

        &__dot {
            font-weight: 700;
            padding: 0px 4px;
            line-height: 19.8px;
        }

        &__main-logo {
            display: block;
            aspect-ratio: 1/1;
            width: 64px;
            height: 64px;
            align-self: center;
        }

       }
    }
    
    .daily-news-grid {
        max-width:1162px;
        margin:12px auto;
        display:grid;
        grid-template-columns:minmax(0,1fr) 350px;
        column-gap: 12px;
    }

    #current-news-container {
        margin-left: 12px;
        display: grid;
        grid-template-columns: repeat(12,1fr);
        grid-column-gap: 12px;
        grid-column: 1/2;
    }

    #advertisements-container {
        margin-right: 12px;
        // grid-column: 2/3;
      
    }

    .main-content-element {
        z-index: 1;
        grid-column: 1/13;
    }

    .advertisement-img {
        width: 100%;
        display: block;
    }

    .card-content-grid {
        display: grid;
        grid-template-columns: 4fr 1fr;
  

        &__main-content {
        margin: 0px 8px 16px 0px;
        }

        &__sidebar-content {
        margin-left: 8px;
        }
    }

    .card-content-grid::-webkit-scrollbar {
        display: none;
    }

    .sidebar-cards-row {
        display: flex;
        width: calc(100% + 16px);
        margin-top: 22px;
        overflow: auto;

        &__card-wrapper {
            flex: 1;
            margin-left: 16px;

            &:nth-child(1){
            margin-left: 0;
            }
        }

        &::-webkit-scrollbar {
                display: none;
        }
        
    }
  
    .main-card-2__side-bar-card {
        width: 147px;
        margin-bottom: 10px;
    }

    .trailing-cards-container {
        overflow-y: scroll;
       
        &::-webkit-scrollbar {
            display: none;
        }
    }

    .trailing-cards-row {
        display: flex;
    }

    .trailing-card {
        flex: 1;
        margin-left: 16px;
        margin-bottom: 10px;
    }

    .trailing-card:nth-child(1) {
        margin-left: 0;
    }

    .features-ad-image {
        width: 287px;
        margin: 0 auto;
    }

    .features-ad-header {
        padding: 16px 16px 0px 16px;
        &__text {
            font-size: 20px;
            line-height: 20px;
            font-weight: 600;
            margin: 0;
        }
    }

    .main-section-ad-row1-1 {
        grid-column: 1/7;
    }
    
    .main-section-ad-row1-2 {
        grid-column: 7/13;
    }

    .main-section-ad-row1-image {
        display: block;
        margin: 0 auto;
    }

    .main-section-ad-row2-image-wrapper {
        padding: 0px ;
        &__image {
            display: block;
            margin: 0 auto;
            max-width: 728px;
            width: 100%;
        }
    }

    .main-section-final-ad {
       grid-column: 1/3;
       margin-right: 12px;
       margin-left: 12px;
    }

    @media screen and (max-width:768px) {
    .daily-news-grid {
        grid-template-columns: 1fr;
    
    }

    #current-news-container {
        grid-column: 1/3;
    }

    #advertisements-container {
        display: grid;
        grid-column: 1/4;
        column-gap: 12px;
        grid-template-columns: repeat(2,1fr);
        margin-left: 12px;
    }

    .features-ad-image {
        width: 100%;
    }

    .features-ad-header {
        &__text {
            font-size: 16px;
           
        }
    }
        
    .main-section-final-ad {
       margin-right: 0;
    }

    }

    @media screen and (max-width:510px) { 

        .responsive-news-card {
         grid-column: 1/13;
        }

        #current-news-container {
            margin-right: 10px;
            margin-left: 10px;
        }

        .sidebar-cards-row {
            padding-right: 16px;
        }

        .responsive-main-content {
            display: none;
        }

        .main-section-ad-row1-1 {
            grid-column: 1/13;
        }

       .sidebar-news-wrapper{
        width: calc(100% + 16px);
        padding-right: 16px;
         overflow-x: scroll;

         &::-webkit-scrollbar {
            display: none;
         }
       }

        .responsive-sidebar {
            display: flex;
            // overflow-x: auto;
            width: fit-content;
            position: relative;

            .responsive-sidebar-news{
                width: 275px;
                margin-left: 16px;

                &:nth-child(1) {
                    margin-left: 0;
                }
            }

        .sidebar-news-v2 {
             width: 147px;
         }

        }

        .trailing-cards-container {
            z-index: 15;
            width: calc(100% + 16px);
            padding-right: 16px;
        }

        .trailing-cards-row { 
           width: fit-content;

          .trailing-card {
            width: 147px;
           }
        }

        .card-content-grid {
            grid-template-columns: 1fr;

            &__sidebar-content {
                margin-left: 0;
            }

            &__main-content {

        margin: 0px 0px 16px 0px;
        }

        }

    }

    </style>