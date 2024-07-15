<template>
    <div class="main-news-container">
      <div class="main-news-container__image-wrapper">
        <img class="main-news-container__image-wrapper__image" :src="image"></img>
      </div>

      <div class="main-news-container__title">
      <span class="main-news-container__title__text">{{ title }}</span>
      </div>

      <div class="main-news-container__para" v-if="para">{{ para }}</div>
    </div>
</template>

<script setup lang="ts">

 defineProps<{
  image:string | undefined,
  title:string | undefined,
  para:string | undefined
}>();

</script>

<style lang="scss" scoped>
  .main-news-container {
    margin-bottom: 16px;
    cursor: pointer;
    
    &__image-wrapper {
      margin-bottom: 8px;

      &__image {
        width: 100%;
        display: block;
        border-radius: 6px;
      }

    }

    &__title {
      margin-bottom: 10px;
      cursor: pointer;

      &:hover {
        color: rgb(27, 77, 228);
      }
 
      &__text {
       display: block;
       line-height: 30px;
       font-size: 24px;
       font-weight: 700;
       cursor: pointer;
       display: -webkit-inline-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp:3;
      line-clamp: 3;
      overflow: hidden;
      }
    }

    &__para {
        margin-top: 2px;
        line-height: 24px;

    }
  }

  @media screen and (max-width:510px) {
    .main-news-container {

      &__title {
        &__text {
          font-size: 16px;
          font-weight: 400;
          line-height: 20px;
        }
      }
    }
  }
</style>