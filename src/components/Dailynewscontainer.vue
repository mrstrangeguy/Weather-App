<template>
    <div class="daily-news-grid">
    <div id="current-news-container" >

    <!--Top Stories Card-->
    <Newscard :title="pageData?.mainCard1.title" :buttontext="pageData?.mainCard1?.buttontext" class="main-content-element">
    <template v-slot:['news-cards-content']>
    <div class="card-content-grid">
        <div v-if="!isResponsive" class="card-content-grid__main-content ">
        <Mainnews class="responsive-main-news"  :image="pageData?.mainCard1.mainContentDetails.img" :title="pageData?.mainCard1.mainContentDetails.heading" :para="pageData?.mainCard1.mainContentDetails.description"/>
        </div> 
        <div class="sidebar-news-wrapper">
        <div class="card-content-grid__sidebar-content responsive-sidebar">
        <Sidebarnews class="responsive-sidebar-news" v-for="data in pageData?.mainCard1.sideBarContentDetails" :isStyleChangeEnabled="false" :img="data.img" :para="data.details"/>
        </div>
        </div> 
        <div class="card-content-grid__sidebar-content" id="responsive-sidebar">
        <Sidebarnews class="responsive-card" v-for="data in pageData?.mainCard1.sideBarContentDetails" :isStyleChangeEnabled="false" :img="data.img" :para="data.details"/>
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
    <Advertisementcard class="main-content-element main-section-ad-row1-2">
        <template v-slot:['advertisement-image']>
        <img src="https://tpc.googlesyndication.com/simgad/8755113534239921333" class="main-section-ad-row1-image advertisement-img" alt="advertisement-image">
        </template>
    </Advertisementcard>

     <!--Mapping Don't Miss,Top Video cards --> 
    <Newscard v-for="elem in sidebarCards" :title="elem.title" :buttontext="elem.buttontext" class="main-content-element">
    <template v-slot:['news-cards-content']>
    <div class="trailing-cards-row">
    <Sidebarnews v-for="data in elem.cards" :img="data.img" :para="data.description" :isStyleChangeEnabled="true" class="trailing-card"/>
    </div>
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
    <div id="advertisements-container">

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
const isResponsive = ref<boolean>(true);

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
   
}

</script>

<style lang="scss" scoped>
    
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
        }

        &__card-wrapper:nth-child(1){
            margin-left: 0;
        }
        
    }
  
    .main-card-2__side-bar-card {
        width: 147px;
        margin-bottom: 10px;
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

    @media screen and (max-width:500px) { 

       .sidebar-news-wrapper{
         overflow-x: auto;
       }

        .responsive-sidebar {
            display: flex;
            // overflow-x: auto;
            width: fit-content;
            background-color: lightblue;
            position: relative;

            .responsive-sidebar-news{
                width: 275px;
                margin-left: 16px;

                &:nth-child(1) {
                    margin-left: 0;
                }
            }
        }

        .trailing-cards-row { 
            display: grid;
            grid-template-columns: repeat(2,1fr);
            column-gap: 12px;
        }

        .trailing-card {
            margin: 0;
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