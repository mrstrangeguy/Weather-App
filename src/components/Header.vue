<template>
  <div v-if="!visibilityChecks?.isResponsiveHeaderVisible" class="header" @click="closeAllPopup">
    <div class="top-section">
      <div class="top-section__content">
        <div class="logo-section">
          <a class="logo-section__link">
            <img class="logo-section__link__img header-logo" src="../images/logo-header.svg" alt="weather-app-icon" />
          </a>
          <div class="logo-section__divider"/>
          <a class="logo-section__logo2-link">
            <img class="logo-section__logo2-link__img header-logo" src="../images/toi-logo.png" alt="toi-icon" />
          </a>
        </div>
        <div class="top-section__content__main-menu-section">
          <div  class="search-section">
            <div class="input-wrapper" >
              <input :class="{
                'focused-input': visibilityChecks?.isInputFocused,
                'input-wrapper__input': true,
              }" :placeholder="labelData?.searchPlaceholder" ref="inputRef" @focus="onSearchFocus"
                @focusout="onSearchFocusOut" type="text" />
              <img class="input-wrapper__logo header-logo" src="../images/search-icon.svg" alt="search-icon" />
            </div>

          </div>
          <div class="lang-select">
            <button :class="{
              'temp-options-btn-outline':
                visibilityChecks?.isExpandableMenuVisible,
              'lang-select__button': true,
              'header-btn': true,
            }" @click.stop="onToggleTemperatureMenu()">
             
                <img src="../images/globe-icon.svg" alt="globe-icon" class="lang-select__button--globe" />
                <span class="lang-select__button--country">{{
                  headerData?.country
                }}</span>
                <span class="lang-select__button--temp">{{
                  currentTemperatureIndicator
                }}</span>
                <img src="../images/arrow-down.svg" alt="angle-icon" :class="{
                  'rotate-icon': visibilityChecks?.isExpandableMenuVisible,
                  'lang-select__button--down-arrow': true,
                }" />
              
            </button>
          </div>
          <div  class="options-toggle">
            <button class="header-btn options-toggle__button" @click.stop="onToggleTopicsMenu">
              <span  :class="{
                'close-icon': visibilityChecks?.isExpandableTopicsMenuVisible,
                'hamburger-icon': true,
              }"></span>
           
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="visibilityChecks?.isExpandableMenuVisible" class="header-popup temperature-menu" @click.stop>
      <div class="temperature-menu__content">
        <div class="popup-temp">
         <PopupTempOptions :headerData="headerData" :currentUnitDescription="currentUnitDescription" @closeAllPopup="closeAllPopup"/>
        </div>
        <div class="country-list">
          <div v-for="(elem, index) in headerCountryData" :key="index" class="country-list__item"
            @click.stop="setCurrentSelectId(elem.id)">
            <div :class="{
              'country-list__item__header': true,
              'disable-border': isBorderDisabled(index),
              'outline--black': isOutlinePresent(elem.id),
            }">
              <div class="country-list__item__header__title">
                {{ elem.region }}
              </div>
              <img :class="{
                'country-list__item__header__icon': true,
                'rotate-country-list-icon': isRotateEnabled(elem.id),
              }" src="../images/arrow-down-blue.svg" alt="angle-icon" />
            </div>
            <CountryList v-if="isListPresent(elem.id)" />
          </div>
        </div>
      </div>
    </div>

    <div v-if="visibilityChecks?.isExpandableTopicsMenuVisible" class="header-popup topics-menu" @click.stop>
      <div class="topics-menu__content">
        <div class="topics-menu-navs">
          <nav v-for="topicNav in headerTopicsData" :key="topicNav.id" class="topics-menu-navs__nav">
            <span class="topics-menu-navs__nav__heading">{{
              topicNav.title
            }}</span>
            <button v-for="(navItem, index) in topicNav.details" :key="index"
              class="header-btn topics-menu-navs__nav__button">
              {{ navItem }}
            </button>
          </nav>
        </div>
      </div>
    </div>

    <div class="weather-indicator">
      <div class="header-contents-container weather-indicator__content">
        <div class="weather-indicator-card">
          <a class="weather-indicator-card__link">
            <img src="../images/Foggy.svg" alt="angle-icon" class="weather-indicator-card__link__img" />
            <span class="weather-indicator-card__link__text">{{
              headerData?.currentWeatherDetails?.temp
            }}</span>
          </a>

          <a class="weather-indicator-card__link">
            <span class="weather-indicator-card__link__text--city-name">{{ headerData?.currentWeatherDetails?.city }},{{
              headerData?.currentWeatherDetails?.state
              }}</span>
          </a>
        </div>
      </div>
    </div>

    <div class="main-nav">
      <div class="header-contents-container main-nav__content">
        <nav class="main-nav__content__nav">
          <a v-for="(item, index) in navData" :key="index" class="main-nav-link">
            <span class="main-nav-link__text">{{ item }}</span>
          </a>
        </nav>
        <div :class="{
          'temp-options-btn-outline':
            visibilityChecks?.isMoreForecastsOptionVisible,
          'forecasts-options': true,
        }">
          <button class="header-btn forecasts-options__button" @click.stop="onToggleForecastOption">
            <span class="forecasts-options__button__text">{{
              labelData?.forecastText
            }}</span>
            <img :class="{
              'rotate-icon margin-changes':
                visibilityChecks?.isMoreForecastsOptionVisible,
              'forecasts-options__button__icon': true,
            }" src="../images/arrow-down.svg" alt="angle-icon" />
          </button>
          <div v-if="visibilityChecks?.isMoreForecastsOptionVisible" class="forecasts-popup">
            <h3 class="forecasts-popup__heading">
              {{ forecastOptions.title }}
            </h3>
            <div class="forecasts-popup-description">
              <a class="forecasts-popup-description__link">
                <span class="forecasts-popup-description__link__text">{{
                  forecastOptions.allergyTracker
                }}</span>
              </a>
              <a class="forecasts-popup-description__link">
                <span class="forecasts-popup-description__link__text">{{
                  forecastOptions.airQualitiy
                }}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="responsive-header">
   <div :class="{'responsive-header__content':true,'responsive-content-change':visibilityChecks?.isResponsiveDropDownVisible}">
    <a class="company-logo-1">
      <img class="company-logo-1__img" src="../images/logo-header.svg" alt="responsive-header-company-icon">
    </a>
    <a :class="{'company-logo-2':true,'change-visibility':visibilityChecks?.isResponsiveDropDownVisible}">
      <img src="../images/toi-logo.png" alt="responsive-header-company-icon-2" class="company-logo-2__img">
    </a>

    <div :class="{'responsive-search':true,'change-visibility':visibilityChecks?.isResponsiveDropDownVisible}">
      <button class="responsive-search__button">
      <h1 class="responsive-search__button__heading">{{ headerData?.currentWeatherDetails?.city }}, {{ headerData?.currentWeatherDetails?.state }} Weather</h1>
      <img class="responsive-search__button__icon" src="../images/search-icon.svg" alt="search-search-icon">  
    </button>
    </div>

    <div @click.stop="onToggleDropDownView" class="responsive-bars-icon" >
      <img v-if="!visibilityChecks?.isResponsiveDropDownVisible" class="responsive-bars-icon__image" src="../images/menu-responsive.svg" alt="responsive-header-icon">
      <img v-else class="responsive-bars-icon__image" src="../images/responsive-close-icon.svg" alt="responsive-header-icon">
    </div>
   </div>
  </div>
  <Responsivedropdown :headerData="headerData" :currentUnitDescription="currentUnitDescription"  v-if="visibilityChecks?.isResponsiveDropDownVisible"/>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted } from "vue";

import countryDataType from "../types/countryDataType";
import topicsDataType from "../types/topicsDataType";
import headerDataType from "../types/headerDataType";
import labelDataType from "../types/labelDataType";
import booleanDataType from "../types/booleanDataType";
import { forecastOptions } from "../types/foreCastOptionsEnum";
import countryData from "../data/countryData.json";
import navItems from "../data/navItems.json";
import topicsData from "../data/topicsData.json";
import headerDetails from "../data/headerDetails.json";
import labelDetails from "../data/labelDetails.json";
import visibilityDetails from "../data/visibilityDetails.json";
import Responsivedropdown from "./Responsivedropdown.vue";
import CountryList from "./Countrylist.vue";
import PopupTempOptions from './PopupTempOptions.vue'

const headerCountryData = ref<countryDataType[]>([]);
const currentCountryId = ref<number>(-1);
const headerTopicsData = ref<topicsDataType[]>([]);
const navData = ref<string[]>([]);

const headerData = ref<headerDataType>();
const labelData = ref<labelDataType>();
const visibilityChecks = ref<booleanDataType>();

//onMounted
onMounted(() => {
  headerCountryData.value = countryData;
  headerTopicsData.value = topicsData;
  navData.value = navItems;
  headerData.value = headerDetails;
  labelData.value = labelDetails;
  visibilityChecks.value = visibilityDetails;

  window.addEventListener("click", () => {
    closeAllPopup();
  });

  window.addEventListener("resize", onResponsive);
});

//onUnmounted
onUnmounted(() => {
  window.removeEventListener("click", closeAllPopup);
  window.removeEventListener("resize", onResponsive);
});

//emits
const emits = defineEmits(['toggleElementsVisbility'])

//computed
const currentUnitDescription = computed(() => {
  if (headerData?.value?.currentTempScale === "°F") {
    return "Imperial - F / mph / miles / inches";
  } else if (headerData?.value?.currentTempScale === "°C") {
    return "Metric - C / millimeters / km / kmh / millibars";
  } else {
    return "Hybrid - C / millimeters / miles / mph / millibars";
  }
});

const currentTemperatureIndicator = computed(() =>
  headerData?.value?.currentTempScale === "Hybrid"
    ? "°C"
    : headerData?.value?.currentTempScale
);

const isListPresent = (id: number) => currentCountryId.value === id;

//functions
const setCurrentSelectId = (id: number) => {
  if (currentCountryId.value === id) {
    currentCountryId.value = -1;
  } else {
    currentCountryId.value = id;
  }
};

const onToggleTemperatureMenu = () => {
  if (!visibilityChecks.value) return;

  visibilityChecks.value.isExpandableMenuVisible =
    !visibilityChecks.value.isExpandableMenuVisible;

  visibilityChecks.value.isExpandableTopicsMenuVisible = false;
};

const onToggleTopicsMenu = () => {
  if (!visibilityChecks.value) return;
  visibilityChecks.value.isExpandableTopicsMenuVisible =
    !visibilityChecks.value.isExpandableTopicsMenuVisible;

  visibilityChecks.value.isExpandableMenuVisible = false;
  visibilityChecks.value.isMoreForecastsOptionVisible = false;
};

const closeAllPopup = () => {
  if (!visibilityChecks.value) return;

  visibilityChecks.value.isExpandableMenuVisible = false;
  visibilityChecks.value.isExpandableTopicsMenuVisible = false;
  visibilityChecks.value.isMoreForecastsOptionVisible = false;
};

const onSearchFocus = () => {
  if (!visibilityChecks.value) return;
  visibilityChecks.value.isInputFocused = true;
};

const onSearchFocusOut = () => {
  if (!visibilityChecks.value) return;
  visibilityChecks.value.isInputFocused = false;
};



const onToggleForecastOption = () => {
  if (!visibilityChecks.value) return;

  visibilityChecks.value.isMoreForecastsOptionVisible =
    !visibilityChecks.value.isMoreForecastsOptionVisible;
};

const onResponsive = () => {
  if (!labelData.value) return;

  if (window.innerWidth > 790) {
    labelData.value.forecastText = "More Forecasts";
  }
  if (window.innerWidth <= 790) {
    labelData.value.forecastText = "More";
  }

  if (window.innerWidth <= 630) {
    labelData.value.forecastText = "";
  }

  if(window.innerWidth <= 510 && visibilityChecks.value) {
    visibilityChecks.value.isResponsiveHeaderVisible = true
  }

  if(window.innerWidth > 510 && visibilityChecks.value) {
    visibilityChecks.value.isResponsiveHeaderVisible = false
  }

  if(window.innerWidth > 510 && visibilityChecks.value?.isResponsiveDropDownVisible) {
    visibilityChecks.value.isResponsiveDropDownVisible = false;
   emits('toggleElementsVisbility',visibilityChecks.value.isResponsiveDropDownVisible);
  }

};

const isBorderDisabled = (index: number) => index === headerCountryData.value.length - 1;

const isOutlinePresent = (id: number) => id === currentCountryId.value;

const isRotateEnabled = (id: number) => currentCountryId.value === id;

const onToggleDropDownView = () => {
  if(!visibilityChecks.value) return

  visibilityChecks.value.isResponsiveDropDownVisible = !visibilityChecks.value.isResponsiveDropDownVisible;

  emits('toggleElementsVisbility',visibilityChecks.value.isResponsiveDropDownVisible);
}
</script>

<style lang="scss" scoped>
.outline--black {
  outline: 2px solid rgb(43, 43, 43);
}

.focused-input::placeholder {
  transition: opacity 0.4s ease;
  opacity: 0;
  text-overflow: ellipsis;
}

.temp-options-btn-outline {
  outline: 5px auto #1b4de4;
}

.rotate-country-list-icon {
  transform: rotate(180deg);
}

.header-logo {
  cursor: pointer;
}

.hamburger-icon {
  display: block;
  position: relative;
  width: 30px;
  border: 0;
  height: 3px;
  background-color: rgb(255, 255, 255);
  cursor: pointer;
  border-radius: 2px;

  &::before {
    display: block;
    position: absolute;
    content: "";
    transform: 50% 50%;
    background: #fff;
    width: 30px;
    background-color: white;
    font-size: 16px;
    border-radius: 2px;
    height: 3px;
    line-height: 18.4px;
    bottom: -8px;
    transition: all 0.3s ease;
  }

  &::after {
    display: block;
    position: absolute;
    content: "";
    transform: 50% 50%;
    background: #fff;
    width: 30px;
    max-width: 30px;
    background-color: white;
    font-size: 16px;
    border-radius: 2px;
    height: 3px;
    line-height: 18.4px;
    bottom: 50%;
    top: -8px;
    transition: all 0.3s ease;
  }
}

.close-icon {
  transition: all 0.3s ease;
  background: transparent;

  &::before {
    transform: rotate(45deg);
    top: 0;
    transition: all 0.3s ease;
  }

  &::after {
    transform: rotate(-45deg);
    top: 0;
    transition: all 0.3s ease;
  }
}

.header-popup {
  background-color: white;
  z-index: 200;
}

.header-btn {
  border: 0;
  padding: 0;
  margin: 0;
  background: transparent;
  cursor: pointer;
}

.disable-border::after {
  display: none;
}

.temp {
  color: rgb(27, 77, 228);
}

.header {

  position: relative;
  z-index: 100;

  .top-section {

    background-color: rgb(0, 89, 134);

    &__content {
      max-width: 1280px;
      margin: 0 auto;
      padding: 11px 11px 11px 6px;
      display: flex;
      height: 82px;

      &__main-menu-section {
        flex-grow: 1;
        display: flex;
        align-items: center;
      }
    }
  }

  .temperature-menu {

    width: 100%;
    box-shadow: 3px 3px 20px rgba(0, 0, 0, 0.2);
    position: absolute;

    &__content {
      max-width: 1280px;
      box-sizing: content-box;
      margin: 0 auto;
      padding: 10px 15px;
      background-color: white;

      .country-list {

        &__item {

          &__header {

            padding: 10px 31px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: relative;
            line-height: 27px;
            cursor: pointer;
            border-radius: 2px;

            &__title {

              font-size: 18px;
              font-weight: 700;
              text-transform: uppercase;
              line-height: 27px;
            }

            &__title:hover {

              color: #1b4de4;
            }

            &__icon {

              display: block;
              margin-left: 6px;
              line-height: 27px;
              font-size: 18px;
              height: 18px;
            }
          }

          &__header::after {

            content: "";
            height: 1px;
            background-color: #dee0e3;
            position: absolute;
            bottom: 0;
            width: 100%;
            left: 0;
          }
        }
      }
    }
  }

  .topics-menu {

    width: 100vw;
    box-shadow: 3px 3px 20px rgba(0, 0, 0, 0.2);
    position: absolute;
    background: white;

    &__content {

      max-width: 1280px;
      padding: 0px 60px;
      margin: 0 auto;

      .topics-menu-navs {

        padding: 22px 11px 11px 11px;
        width: 100%;
        display: flex;
        justify-content: space-evenly;
        align-items: flex-start;
        flex-wrap: wrap;

        &__nav {

          display: block;
          flex-basis: calc(25% - 20px);
          flex-grow: 0;
          flex-shrink: 1;
          padding: 4px 0px 14px 48px;

          &__heading {

            text-transform: uppercase;
            font-size: 18px;
            font-weight: 700;
            line-height: 27px;
          }

          &__button {

            display: block;
            text-align: left;
            width: 100%;
            line-height: 27px;
            font-size: 16px;
            padding: 6px 0px;
            cursor: pointer;
          }

          &__button:hover {

            color: #1b4de4;
          }
        }
      }
    }
  }

  .weather-indicator {

    width: 100%;
    background-color: #33789e;
    color: white;
  }

  .main-nav {

    background-color: #003550;
    color: white;

    &__content {

      display: flex;
      align-items: center;

      &__nav {

        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        align-items: center;
        height: 40px;
        flex-grow: 1;
      }
    }
  }
}

.weather-indicator-card {

  display: flex;
  padding: 5px 15px;
  margin-left: 60px;

  &__link {

    display: flex;
    padding: 3px 5px 3px 0px;
    align-items: center;
    cursor: pointer;

    &__img {

      width: 18px;
      height: 18px;
      margin-right: 8px;
    }

    &__text {

      font-size: 14px;
      line-height: 21px;

      &--city-name {

        font-size: 14px;
      }
    }
  }
}

.main-nav-link {

  padding: 0px 15px;
  display: block;
  cursor: pointer;
  position: relative;
}

.main-nav-link:hover::after {

  position: absolute;
  content: "";
  width: 100%;
  height: 2px;
  background-color: white;
  bottom: -8px;
  left: 0;
}

.forecasts-options {

  padding: 0px 65px 0px 20px;
  position: relative;
  height: 40px;
  display: flex;
  align-items: center;

  &__button {

    display: flex;
    align-items: center;
    color: white;
    height: 100%;

    &__text {

      color: white;
      font-size: 16px;
      line-height: 18.4px;
    }

    &__icon {

      width: 22px;
      height: 17px;
      display: block;
      margin-left: 5px;
    }
  }
}

.options-toggle {

  &__button {

    margin: 0px 11px 0px 25px;
    padding: 1px 6px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    height: 30px;
    width: 30px;

    &__icon {
      height: 32px;
      width: 32px;
      display: block;
    }

    &__line {

      background-color: white;
      height: 3px;
      width: 30px;
      border-radius: 2px;
    }
  }
}

.logo-section {

  display: flex;
  align-items: center;
  padding-right: 30px;

  &__link {

    display: block;
    padding: 5px;

    &__img {

      display: block;
      height: 60px;
      width: 60px;
    }
  }

  &__divider {

    margin: 0px 15px;
    border-left: 2px solid rgb(255, 255, 255);
    height: 27px;
  }

  &__logo2-link {

    display: block;

    &__img {

      display: block;
      aspect-ratio: 1567/302;
      max-height: 24px;
    }
  }
}

.popup-temp {

  margin: 0 30px 14px;
  padding: 5px 30px 0px 0px;

}

.search-section {

  max-width: 380px;
  width: 100%;
  margin: 0 auto;

  .input-wrapper {

    display: flex;
    align-items: center;
    position: relative;

    &__input {

      display: block;
      height: 38px;
      padding: 5px 6px;
      width: 100%;
      border-radius: 20px;
      outline: none;
      border: 0;
      background-color: rgba(255, 255, 255, 0.2);
      position: relative;
      min-width: 36px;
      color: white;
      text-align: center;
      line-height: 18.4px;
      font-size: 16px;
    }

    &__input::placeholder {

      color: white;
      transition: opacity 0.4s ease;
      text-overflow: ellipsis;
    }

    &__input:placeholder-shown {

      text-overflow: ellipsis;
    }

    &__logo {

      position: absolute;
      display: block;
      height: 38px;
      top: 0;
      right: 8px;
      width: 24px;
    }
  }
}

.lang-select {

  padding-top: 10px;
  margin-left: 16px;

  &__button {

    line-height: 18.4px;

    display: flex;
    align-items: center;
    color: white;
    font-size: 16px;
    line-height: 16.1px;

    &--globe {

      padding-left: 10px;
      line-height: 16.1px;
    }

    &--down-arrow {

      width: 22px;
      height: 17px;
      display: block;
    }

    &--temp {

      border-left: 1px solid white;
    }

    &--country,
    &--temp {

      display: block;
      padding: 0px 10px;
      line-height: 18.4px;
      text-align: center;
      height: fit-content;
    }
  }
}

.forecasts-popup {

  position: absolute;
  top: 40px;
  right: 0px;
  width: 350px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 12px 0px;
  padding: 10px 15px;
  border-radius: 6px;

  &__heading {

    margin: 0;
    padding: 6px 15px 8px 15px;
    color: black;
    text-transform: uppercase;
  }
}

.forecasts-popup-description {

  display: flex;
  color: black;

  &__link {

    font-size: 1rem;
    flex: 1 0 160px;

    &__text {

      display: block;
      padding: 5px 15px;
    }
  }
}

//media query
@media screen and (max-width: 850px) {
  .search-section {

    .input-wrapper {

      &__input {

        padding-right: 30px;
      }
    }
  }
}

@media screen and (max-width: 790px) {
  .forecasts-options {

    padding-right: 20px;
  }
}

@media screen and (max-width: 600px) {

  .main-nav-link:nth-last-child(1) {

    display: none;
  }
}

@media screen and (max-width: 525px) {

  .main-nav-link:nth-last-child(2) {

    display: none;
  }
}

@media screen and (max-width: 510px) {

 .responsive-header {
 
    background-color: #005986;
    z-index: 10;
  .responsive-content-change {
    margin: 0;
    max-width: none;
    width: 100%;
  }

  &__content {
    height: 100%;
    max-width: 80%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;

   
    .change-visibility {
      visibility: hidden;
    }

    .company-logo-1 {
    
      // display: block;
      padding: 11px 10px;

      &__img {
        display: block;
        height: auto;
        width: 40px;
      }
    }

    .company-logo-2 {
      display: block;
      margin-right: 7px;

      &__img {
        display: block;
        max-height: 20px;
        aspect-ratio: 1567 / 302;
      }
    }

    .responsive-search {
      max-width: 42%;
      margin-left: 2px;
      flex: 1 1 0;
      width: 0 !important;
      line-height: 28px;

      &__button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        padding: 0px 5px 0px 10px;
        border-radius: 20px;
        border: 0;
        min-height: 28px;
        background-color: rgba(255, 255, 255, 0.1);

        &__heading {
          font-size: 14px;
          text-wrap: nowrap;
          white-space: nowrap;
          color: white;
          font-weight: 400;
          margin: 0;
          line-height: 16.1px;
          text-overflow: ellipsis;
          overflow: hidden;
        }

        &__icon {
          display: block;
          aspect-ratio: 1/1;
          height: 20px;
          width: 20px;
          margin-left: 5px;
          font-size: 16px;
        }
      }
    }

    .responsive-bars-icon {
      padding: 5px;
      &__image {
        display: block;
        margin-right: 4px;
      }
    }
  }
 }
}

@media screen and (max-width:480px) {
  .responsive-header {
    // height: 62px;
   
    &__content {
      max-width: none;
      width: 100%;
    }
  }
}

// @media screen and (max-width: 425px) {

//   .popup-temp {

//     margin: 0px 10px 14px 10px;
//   }

//   .popup-temp-indicator {

//     padding-left: 0px;
//   }
// }

// @media screen and (max-width: 350px) {

//   .forecasts-popup {

//     height: fit-content;
//     padding: 10px 0px;

//     &__heading {
//       text-align: right;
//     }
//   }

//   .forecasts-popup-description {

//     display: block;

//     &__link {

//       &__text {

//         text-align: right;
//       }
//     }
//   }
// }
</style>
