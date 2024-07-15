<template>
    <div class="sidebar-news-container">
      <div class="sidebar-news-container-image-wrapper">
      <img class="sidebar-news-container-image-wrapper__image" :src="img"/>
      </div>
      <div class="sidebar-news-container-des">
        <span :class="`${isStyleChangeEnabled ? 'modified-style':'normal-style'} sidebar-news-container-des__text`">{{ para }}</span>
      </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
  img:string;
  para:string;
  isStyleChangeEnabled:boolean;
}>();
</script>

<style lang="scss" scoped>
    .modified-style {
      font-size: 14px;
      line-height: 17.5px;
    }

    .normal-style {
     font-size: 15px;
     line-height: 18.75px;
    }
   .sidebar-news-container {
    margin-bottom: 16px;
    cursor: pointer;
   }

   .sidebar-news-container-image-wrapper {
    position: relative;
    &__image {
      display:block;
      aspect-ratio:16/9;
      width:100%;
      border-radius:6px;
      margin-bottom: 9px;
      position: relative;
     
    }
   
  }

  .sidebar-news-container-image-wrapper::after {
     position: absolute;
     content: '';
     width: 100%;
     height: 100%;
     background-color: rgba(0,0,0,.15);
     top:0;
     left: 0;
     border-radius: 6px;
  }

   .sidebar-news-container-des {
     line-height: 18.75px;
     &__text {
     display: -webkit-inline-box;
     -webkit-box-orient: vertical;
     -webkit-line-clamp:3;
     line-clamp: 3;
     overflow: hidden;

     &:hover {
      color: rgb(27, 77, 228);
     }
     }
   }
</style>