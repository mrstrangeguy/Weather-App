<template>
    <div class="header" @click="closeAllPopup">
        <div class="header__top-section" >
            <div class="header__top-section__content">
              <div class="header-logo-section">
                <a class="header-logo-section__link">
                   <img class="header-logo-section__link__img header-logo" src="../images/logo-header.svg" alt="weather-app-icon">
                </a>
                <div class="header-logo-section__divider"></div>
                <a class="header-logo-section__logo2-link">
                    <img class="header-logo-section__logo2-link__img header-logo" src="../images/toi-logo.png" alt="toi-icon">
                </a>
              </div>
              <div class="header__top-section__content__main-menu-section">
                <div class="header-search-section">
                    <div class="header-search-section__input-tag-wrapper">
                    <input :class="`header-search-section__input-tag-wrapper__input-tag ${isInputFocused && 'focused-input'}`" :placeholder="searchPlaceholder" ref="inputRef" @focus="isInputFocused = true" @focusout="isInputFocused = false" type="text">
                    <img class="header-search-section__input-tag-wrapper__logo header-logo" src="../images/search-icon.svg" alt="search-icon">
                  </div>
                </div>
                <div class="header-lang-select-section">
                  <button :class="`header-lang-select-section__button header-btn ${isExpandableMenuVisible && 'temp-options-btn-outline'}`" @click.stop="onToggleTemperatureMenu()">
                    <div class="header-lang-select-section__button__icons">
                    <img src="../images/globe-icon.svg" alt="globe-icon" class="header-lang-select-section__button__icons--globe">
                    <span class="header-lang-select-section__button__icons__text--country">{{ country }}</span>
                    <span class="header-lang-select-section__button__icons__text--temp">{{ getCurrentTempIndicator }}</span>
                    <img src="../images/arrow-down.svg" alt="angle-icon" :class="`${isExpandableMenuVisible && 'rotate-icon'} header-lang-select-section__button__icons--down-arrow`">
                    
                    </div>
                  </button>
                </div>
                <div class="header-top-options-toggle-section">
                  <button  class="header-btn header-top-options-toggle-section__btn" @click.stop="onToggleTopicsMenu">
                  <span :class="`hamburger-icon ${isExpandableTopicsMenuVisible && 'close-icon'}`"></span>                  
                  </button>
                </div>
              </div>
            </div>
        </div>
        
        <div v-if="isExpandableMenuVisible" class="header-popup header__expandable-temperature-menu" @click.stop>
            <div class="header__expandable-temperature-menu__content">
              <div class="header-popup-temp-details">
                 <div class="header-popup-temp-details__temp-options">
                  <ul class="header-popup-temp-details__temp-options__list">
                    <li :class="`header-popup-temp-details__temp-options__list__line ${currentTempScale === '°F' ? 'selected-temp' : 'temp'}`" @click.stop="currentTempScale = '°F',closeAllPopup()">°F</li>
                    <li :class="`header-popup-temp-details__temp-options__list__line ${currentTempScale === '°C' ? 'selected-temp' : 'temp'}`" @click.stop="currentTempScale = '°C',closeAllPopup()">°C</li>
                    <li :class="`header-popup-temp-details__temp-options__list__line ${currentTempScale === 'Hybrid' ? 'selected-temp' : 'temp'}`" @click.stop="currentTempScale = 'Hybrid',closeAllPopup()">Hybrid</li>
                  </ul>
                  <div class="header-popup-temp-details__temp-options__temp-indicator">{{ getUnitDescription }}</div>
                 </div>

              </div>
              <div class="header__expandable-temperature-menu__content__country-list">
                   <div v-for="(elem,index) in headerCountryData" :key="index" :class="`header__expandable-temperature-menu__content__country-list__item `" @click.stop="setCurrentSelectId(elem.id)">
                    <div :class="`header__expandable-temperature-menu__content__country-list__item__header ${index === headerCountryData.length-1 && 'disable-border'} ${elem.id === currentCountryId && 'outline--black'}`">
                     <div class="header__expandable-temperature-menu__content__country-list__item__header__title">{{ elem.region }}</div>
                     <img :class="`header__expandable-temperature-menu__content__country-list__item__header__icon ${currentCountryId === elem.id && 'rotate-country-list-icon'}`" src="../images/arrow-down-blue.svg" alt="angle-icon">
                    </div>
                    <CountryList v-if="currentCountryId === elem.id"/>
                    </div>
                 </div>
            </div>
        </div>
        
        <div v-if="isExpandableTopicsMenuVisible" class="header-popup header__expandable-topics-menu" @click.stop>
          <div class="header__expandable-topics-menu__content">
              <div class="header__expandable-topics-menu__content__navs">
                <nav v-for="(elem) in headerTopicsData" :key="elem.id" class="header__expandable-topics-menu__content__navs__nav">
                  <span class="header__expandable-topics-menu__content__navs__nav__heading">{{ elem.title }}</span>
                  <button v-for="(btnData,index) in elem.details" :key="index" class="header-btn header__expandable-topics-menu__content__navs__nav__btn">{{ btnData }}</button> 
                </nav>
              </div>
          </div>
        </div>

        <div class="header__city-weather-indicator">
            <div class="header-contents-container header__city-weather-indicator__content">
              <div class="header__city-weather-indicator__content__card">
                <a class="header__city-weather-indicator__content__card__link">
                  <img src="../images/Foggy.svg" alt="angle-icon" class="header__city-weather-indicator__content__card__link__img">
                  <span class="header__city-weather-indicator__content__card__link__text">{{ currentWeatherDetails.temp }}</span>
                </a>

                <a class="header__city-weather-indicator__content__card__link">
                  <span class="header__city-weather-indicator__content__card__link__text--city-name">{{ currentWeatherDetails.city }},{{ currentWeatherDetails.state }}</span>
                </a>
              </div>
            </div>
        </div>

        <div class="header__main-nav-wrapper">
          <div class="header-contents-container  header__main-nav-wrapper__content">
           <nav class="header__main-nav-wrapper__content__nav">
            <a v-for="(item,index) in navData" :key="index" class="header__main-nav-wrapper__content__nav__link">
              <span class="header__main-nav-wrapper__content__nav__link__text">{{  item  }}</span>
            </a>
        
           </nav>
           <div :class="`header__main-nav-wrapper__content__more-forecasts-options ${isMoreForecastsOptionVisible && 'temp-options-btn-outline'}`">
            <button class="header-btn  header__main-nav-wrapper__content__more-forecasts-options__btn" @click.stop="isMoreForecastsOptionVisible = !isMoreForecastsOptionVisible">
              <span class="header__main-nav-wrapper__content__more-forecasts-options__btn__text">{{ forecastText }}</span>
              <img :class="`header__main-nav-wrapper__content__more-forecasts-options__btn__icon ${isMoreForecastsOptionVisible && 'rotate-icon margin-changes'}`" src="../images/arrow-down.svg" alt="angle-icon">
            </button>
            <div v-if="isMoreForecastsOptionVisible" :class="`header-more-forecasts-popup`">
             <h3 class="header-more-forecasts-popup__heading">Special Forecasts</h3>
             <div class="header-more-forecasts-popup__description">
              <a class="header-more-forecasts-popup__description__link" >
                <span class="header-more-forecasts-popup__description__link__text">Allergy Tracker</span>
              </a>
              <a class="header__main-nav-wrapper__content__more-forecasts-options__popup__description__link" >
                <span class="header-more-forecasts-popup__description__link__text">Air Quality Forecast</span>
              </a>
             </div>
            </div>
           </div>
          </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref,onMounted,computed } from 'vue';

import countryData from '../data/countryData.json'
import countryDataType from '../types/coutryDataType';
import topicsDataType from '../types/topicsDataType';
import weatherDetailsType from '../types/weatherDetailsType'
import CountryList from './Countrylist.vue'
import topicsData from '../data/topicsData.json'
import navItems from '../data/navItems.json'

  const searchPlaceholder = ref('Search City or Postcode');
  const headerCountryData = ref<countryDataType[]>([]);
  const currentCountryId = ref<number>(-1);
  const isExpandableMenuVisible = ref<boolean>(false);
  const headerTopicsData = ref<topicsDataType[]>([]);
  const isExpandableTopicsMenuVisible = ref<boolean>(false);
  const currentTempScale = ref<string>('°C');
  const navData = ref<string[]>([]);
  const country = ref<string>('IN');
  const forecastText = ref<string>('More Forecasts');
  const currentWeatherDetails = ref<weatherDetailsType>({ temp:'31°',city:'Chennai',state:'Tamil Nadu' });
  const isInputFocused = ref<boolean>(false);
  const isMoreForecastsOptionVisible = ref<boolean>(false)
;
  //onMounted
  onMounted(() => {
  headerCountryData.value = countryData;
  headerTopicsData.value = topicsData;
  navData.value = navItems;
  
  window.addEventListener('click',() => {

   closeAllPopup();

  });

  window.addEventListener('resize',onResponsive);

  return () => {
     window.removeEventListener('click',closeAllPopup);
     window.removeEventListener('resize',onResponsive);
   }

  })

  //computed
  const getUnitDescription = computed(() => {
    if(currentTempScale.value === '°F') return 'Imperial - F / mph / miles / inches'
    else if(currentTempScale.value === '°C') return 'Metric - C / millimeters / km / kmh / millibars'
    else return 'Hybrid - C / millimeters / miles / mph / millibars'
  })

  const getCurrentTempIndicator = computed(() => {
    return currentTempScale.value === 'Hybrid' ? '°C' : currentTempScale.value
  })

  //functions
  const setCurrentSelectId = (id:number) => {
    if(currentCountryId.value === id) currentCountryId.value = -1
    else currentCountryId.value = id
  }

  const onToggleTemperatureMenu = () => {
  
    isExpandableMenuVisible.value = !isExpandableMenuVisible.value;
    isExpandableTopicsMenuVisible.value = false;
  }

  const onToggleTopicsMenu = () => {
    isExpandableTopicsMenuVisible.value = !isExpandableTopicsMenuVisible.value;
    isExpandableMenuVisible.value = false;
    isMoreForecastsOptionVisible.value = false;
  }

  const closeAllPopup = () => {
    isExpandableMenuVisible.value = false;
    isExpandableTopicsMenuVisible.value = false;
    isMoreForecastsOptionVisible.value = false;
  }

  const onResponsive = () => {

      if(window.innerWidth > 790) {
        forecastText.value = 'More Forecasts'
      }
     if(window.innerWidth <= 790) {
      forecastText.value = 'More';
     }

     if(window.innerWidth <= 630) {
      forecastText.value = '';
     }
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

  .rotate-icon {
    transform: rotate(180deg);
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

   }
   
   .hamburger-icon::before {
      display: block;
      position: absolute;
      content: '';
      transform: 50% 50%;
      background: #fff;
      width: 30px;
      max-width: 30px;
      // border: 2px solid #fff;
      background-color: white;
      font-size: 16px;
      border-radius: 2px;
      height: 3px;
      line-height: 18.4px;
      bottom: -8px;
      // left: -1px;
     transition: all 0.3s ease;
     
   }

   .hamburger-icon::after {
    display: block;
      position: absolute;
      content: '';
      transform: 50% 50%;
      background: #fff;
      width: 30px;
      max-width: 30px;
      // border: 2px solid #fff;
      background-color: white;
      font-size: 16px;
      border-radius: 2px;
      height: 3px;
      line-height: 18.4px;
      bottom: 50%;
      // left: -1px;
      top: -8px;
     transition: all 0.3s ease;


   }

   .close-icon {
     transition: all 0.3s ease;
     background:transparent;
   }

   .close-icon::before {
      transform: rotate(45deg);
      top: 0;
      transition: all 0.3s ease;
   }

   .close-icon::after {
    transform: rotate(-45deg);
    top: 0;
    transition: all 0.3s ease;
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

  .selected-temp {
    background-color: rgb(27, 77, 228);
    color: white;
  }

  .temp {
    color: rgb(27, 77, 228); 
  }

  .header {
      position: relative;
      z-index: 100;

      &__top-section {
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

      &__expandable-temperature-menu {
        width: 100%;
        box-shadow: 3px 3px 20px rgba(0, 0, 0,0.2);
        position: absolute;

        &__content {
          max-width: 1280px;
          box-sizing: content-box;
          margin: 0 auto;
          padding: 10px 15px;
          background-color: white;

          &__country-list {
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
                color:#1b4de4 ;
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
                content: '';
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

      &__expandable-topics-menu {
        width: 100vw;
        box-shadow: 3px 3px 20px rgba(0, 0, 0,0.2);
        position: absolute;
        background: white;

         &__content {
          max-width: 1280px;
          padding: 0px 60px;
          margin: 0 auto;
         
          &__navs {
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
              &__btn {
                display: block;
                text-align: left;
                width: 100%;
                line-height: 27px;
                font-size: 16px;
                padding: 6px 0px;
                cursor: pointer;
              }

              &__btn:hover {
                color: #1b4de4;
              }
            }
          }

         }
      }

      &__city-weather-indicator {
        width: 100%;
        background-color: #33789e;
        color: white;

        &__content {
          &__card {
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
        }
      }

      &__main-nav-wrapper {
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

            &__link {
              padding: 0px 15px;
              display: block;
              cursor: pointer;
              position: relative;
            }

            &__link:hover::after {
              position: absolute;
              content: '';
              width: 100%;
              height: 2px;
              background-color: white;
              bottom: -8px;
              left: 0;
            }
          }

          &__more-forecasts-options {
            padding: 0px 65px 0px 20px;
            position: relative;
            height: 40px;
            display: flex;
            align-items: center;

            &__btn {
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
        }
      }
  }

  .header-top-options-toggle-section {
      &__btn {
        margin: 0px 11px 0px 25px;
        padding: 1px 6px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 5px;
        height: 30px;
        width: 30px;

        &__line {
          background-color: white;
          height: 3px;
          width: 30px;
          border-radius: 2px;
        }
      }
    }

  .header-logo-section {
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

   .header-popup-temp-details {
      margin: 0 30px 14px;
      padding: 5px 30px 0px 0px;

      &__temp-options {
        display: flex;
        align-items: center;
        cursor: pointer;
        flex-wrap: wrap;

        &__list {
          display: flex;
          list-style: none;
          border: 1px solid #dee0e3;
          padding: 0px;
          border-radius: 27px;
          width: fit-content;
          margin: 0;

          &__line {
            padding: 3px 18px;
            font-size: 14px;
            line-height: 21px;
            border-radius: 27px;
          }

        
        }

        &__temp-indicator {
        font-size: 13px;
        padding-left: 10px;
        padding-top: 5px;
        color: rgb(111, 117, 133);
        }
      }

          }


  .header-search-section {
      max-width: 380px;
      width: 100%;
      margin: 0 auto;

      &__input-tag-wrapper {

        display: flex;
        align-items: center;
        position: relative;

      &__input-tag {
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

      &__input-tag::placeholder {
        color: white;
        transition: opacity 0.4s ease;
        text-overflow: ellipsis;

      }

      &__input-tag:placeholder-shown {
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

    .header-lang-select-section {
      padding-top: 10px;
      margin-left: 16px;
      &__button {
        
        line-height: 18.4px;

        &__icons {
          display: flex;
          align-items: center;
          color: white;
          font-size: 16px;
          line-height: 16.1px;

          &__icon {
            &--globe {
              padding-left: 10px;
              line-height: 16.1px;

            }

            &--down-arrow {
              width: 22px;
              height: 17px;
              display: block;
              
            }
          }

          &__text {
            
            &--temp {
              border-left: 1px solid white;
            }
            &--country,
            &--temp
            {
              display: block;
              padding: 0px 10px;
              line-height: 18.4px;
              text-align: center;
              height: fit-content;
            }
          }
        }
      }
    }

    .header-more-forecasts-popup {
              position: absolute;
              top: 40px;
              right:0px;
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

              &__description {
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
     }

  //media query
  @media screen and (max-width:850px){
    .header-search-section { 
      &__input-tag-wrapper {
        &__input-tag { 
         padding-right: 30px;  
        }
      }
    }
  }

  @media screen and (max-width:790px) {
    .header__main-nav-wrapper__content__more-forecasts-options {
      padding-right: 20px;
    }
  }

  @media screen and (max-width:600px){
    .header__main-nav-wrapper__content__nav__link:nth-last-child(1) {
      display: none;
    }
  }

  @media screen and (max-width:525px){
    .header__main-nav-wrapper__content__nav__link:nth-last-child(2) {
      display: none;
    }
  }

  @media screen and (max-width:500px){
   
   .header__top-section__content {
    flex-direction: column;
    height: fit-content;
    gap: 15px;
   }

   .header__city-weather-indicator__content__card {
    margin: 0;
   }
   .header__main-nav-wrapper__content__more-forecasts-options {
      padding-left: 0px;
      padding-right: 10px;
      margin: 0px;
    }

    .header__main-nav-wrapper__content__nav__link {
      padding: 0px;
    }
  }

  @media screen and (max-width:425px) {
     .header-popup-temp-details {
      margin: 0px 10px 14px 10px;

      &__temp-options {
        &__temp-indicator {
          padding-left: 0px;
        }
      }
     }
  }

</style>