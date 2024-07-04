<template v-slot:['current-news-container']>
    <div class="news-card">
     <div class="news-card-heading">
     <h2 class="news-card-heading__text">{{ title }}</h2>
     </div>
     <div id="news-card-content">
      <slot name="news-cards-content"></slot>
     </div>

     <div class="news-card-button-wrapper">
      <button class="news-card-button-wrapper__button">{{ buttontext }}</button>
     </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
  title:string | undefined;
  buttontext:string | undefined;
}>()
</script>

<style lang="scss" scoped>
  .news-card {
    background-color:white;
    padding:17px 16px 16px 19px;
    border-radius: 6px;
    box-shadow: 0 0 12px 0 rgba(0,0,0,.2);
    margin-bottom: 12px;
  }

  .news-card-heading {
    padding-bottom: 16px;
    &__text {

      margin: 0;
      font-size:20px;
      line-height: 24px;
    }
  }

  .news-card-button-wrapper {
    display: flex;
    justify-content: flex-start;
    &__button {
      display: block;
      padding: 8px 14px;
      margin: 10px 5px 5px 5px;
      color: white;
      background-color: rgb(27, 77, 228);
      border: 1px solid rgb(27, 77, 228);
      border-radius: 16px;
      line-height: 14.95px;
      outline-width: 0px;
      font-weight: 700;
    }
  }

</style>