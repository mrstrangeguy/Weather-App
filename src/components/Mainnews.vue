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
 
      &__text {
       display: block;
       line-height: 30px;
       font-size: 24px;
       font-weight: 700;
       cursor: pointer;
      }
    }

    &__para {
        margin-top: 2px;
        line-height: 24px;

    }
  }
</style>