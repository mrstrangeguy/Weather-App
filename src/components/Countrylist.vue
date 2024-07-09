<template>
  <div class="country-details">
    <div class="country-details__content">
      <div v-for="countryData in CountryList" :key="countryData.id" class="country-details__content__link">
        {{ countryData.value }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

import countriesType from "../types/countriesType";
import countries from '../data/countries.json'

const CountryList = ref<countriesType[]>();

onMounted(() => {
  CountryList.value = countries;
})
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
    grid-template-rows: repeat(13, 1fr);

    &__link {

      display: block;
      padding: 7px 0px;
    }
  }
}

.country-details::after {

  content: "";
  width: 100%;
  height: 1px;
  background-color: lightgrey;
  position: absolute;
  bottom: 0px;
  left: 0;
}

@media screen and (max-width: 1024px) {

  .country-details {

    &__content {

      grid-template-columns: 1fr 1fr;
    }
  }
}

@media screen and (max-width: 790px) {

  .country-details {

    padding: 0px;

    &__content {

      grid-template-columns: 1fr 1fr;
      padding: 10px 0px 30px 0px;

      &__link {
        text-align: center;
      }
    }
  }
}

@media screen and (max-width: 425px) {

  .country-details {

    &__content {

      grid-template-columns: 1fr;
    }
  }
}
</style>
