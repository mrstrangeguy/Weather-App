<template>
    <div class="header">
        <div class="header__top-section">
            <div class="header__top-section__content">
              <div class="header__top-section__content__logo-section">
                <a class="header__top-section__content__logo-section__link">
                   <img class="header__top-section__content__logo-section__link__img" src="../images/logo-header.svg" alt="">
                </a>
                <div class="header__top-section__content__logo-section__divider"></div>
                <a class="header__top-section__content__logo-section__logo2-link">
                    <img class="header__top-section__content__logo-section__logo2-link__img" src="../images/toi-logo.png" alt="">
                </a>
              </div>
              <div class="header__top-section__content__main-menu-section">
                <div class="header__top-section__content__main-menu-section__search-section">
                    <div class="header__top-section__content__main-menu-section__search-section__input-tag-wrapper">
                    <input class="header__top-section__content__main-menu-section__search-section__input-tag-wrapper__input-tag" :placeholder="searchPlaceholder" type="text">
                    <img class="header__top-section__content__main-menu-section__search-section__input-tag-wrapper__logo" src="../images/search-icon.svg" alt="">
                  </div>
                </div>
                <div class="header__top-section__content__main-menu-section__lang-select-section">
                  <button class="header-btn header__top-section__content__main-menu-section__lang-select-section__btn" @click="onToggleTemperatureMenu">
                    <div class="header__top-section__content__main-menu-section__lang-select-section__btn__icons">
                    <img src="../images/globe-icon.svg" alt="" class="header__top-section__content__main-menu-section__lang-select-section__btn__icons__icon--globe">
                    <span class="header__top-section__content__main-menu-section__lang-select-section__btn__icons__text--country">{{ country }}</span>
                    <span class="header__top-section__content__main-menu-section__lang-select-section__btn__icons__text--temp">{{ temperature }}</span>
                    <img src="../images/arrow-down.svg" alt="" class="header__top-section__content__main-menu-section__lang-select-section__btn__icons__icon--down-arrow">
                    
                    </div>
                  </button>
                </div>
                <div class="header__top-section__content__main-menu-section__options-toggle-section">
                  <button class="header-btn header__top-section__content__main-menu-section__options-toggle-section__btn" @click="onToggleTopicsMenu">
                   <div class="header__top-section__content__main-menu-section__options-toggle-section__btn__line"></div>
                   <div class="header__top-section__content__main-menu-section__options-toggle-section__btn__line"></div>
                   <div class="header__top-section__content__main-menu-section__options-toggle-section__btn__line"></div>
                  </button>
                </div>
              </div>
            </div>
        </div>
        
        <div v-if="isExpandableMenuVisible" class="header__expandable-temperature-menu" >
            <div class="header__expandable-temperature-menu__content">
              <div class="header__expandable-temperature-menu__content__temp-details">
                 <div class="header__expandable-temperature-menu__content__temp-details__temp-options">
                  <ul class="header__expandable-temperature-menu__content__temp-details__temp-options__list">
                    <li :class="`header__expandable-temperature-menu__content__temp-details__temp-options__list__line ${currentTempScale === '°F' ? 'selected-temp' : 'temp'}`" @click="currentTempScale = '°F'">°F</li>
                    <li :class="`header__expandable-temperature-menu__content__temp-details__temp-options__list__line ${currentTempScale === '°C' ? 'selected-temp' : 'temp'}`" @click="currentTempScale = '°C'">°C</li>
                    <li :class="`header__expandable-temperature-menu__content__temp-details__temp-options__list__line ${currentTempScale === 'Hybrid' ? 'selected-temp' : 'temp'}`" @click="currentTempScale = 'Hybrid'">Hybrid</li>
                  </ul>
                  <div class="header__expandable-temperature-menu__content__temp-details__temp-options__temp-indicator">{{ getUnitDescription }}</div>
                 </div>

              </div>
              <div class="header__expandable-temperature-menu__content__country-list">
                   <div v-for="(elem,index) in headerCountryData" :key="index" class="header__expandable-temperature-menu__content__country-list__item" @click="setCurrentSelectId(elem.id)">
                    <div  :class="`header__expandable-temperature-menu__content__country-list__item__header ${index === headerCountryData.length-1 && 'disable-border'}`">
                     <div class="header__expandable-temperature-menu__content__country-list__item__header__title">{{ elem.region }}</div>
                     <img class="header__expandable-temperature-menu__content__country-list__item__header__icon" src="../images/arrow-down-blue.svg" alt="">
                    </div>
                    <CountryList v-if="currentCountryId === elem.id"/>
                    </div>
                 </div>
            </div>
        </div>
        
        <div v-if="isExpandableTopicsMenuVisible" class="header__expandable-topics-menu">
          <div class="header__expandable-topics-menu__content">
              <div class="header__expandable-topics-menu__content__navs">
                <nav v-for="(elem,index) in headerTopicsData" :key="elem.id" class="header__expandable-topics-menu__content__navs__nav">
                  <span class="header__expandable-topics-menu__content__navs__nav__heading">{{ elem.title }}</span>
                  <button v-for="(btnData,index) in elem.details" class="header-btn header__expandable-topics-menu__content__navs__nav__btn">{{ btnData }}</button> 
                </nav>
              </div>
          </div>
        </div>

        <div class="header__city-weather-indicator">
            <div class="header-contents-container header__city-weather-indicator__content">
              <div class="header__city-weather-indicator__content__card">
                <a class="header__city-weather-indicator__content__card__link">
                  <img src="../images/Foggy.svg" alt="" class="header__city-weather-indicator__content__card__link__img">
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
           <div class="header__main-nav-wrapper__content__more-forecasts-options">
            <button class="header-btn  header__main-nav-wrapper__content__more-forecasts-options__btn">
              <span class="header__main-nav-wrapper__content__more-forecasts-options__btn__text">{{ forecastText }}</span>
              <img class="header__main-nav-wrapper__content__more-forecasts-options__btn__icon" src="../images/arrow-down.svg" alt="">
            </button>
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
import CountryList from './Countrylist.vue'
import topicsData from '../data/topicsData.json'
import navItems from '../data/navItems.json'

  const searchPlaceholder = ref('Search City or Postcode');
  const headerCountryData = ref<countryDataType[]>([]);
  const currentCountryId = ref<number>(-1);
  const isExpandableMenuVisible = ref<boolean>(false);
  const headerTopicsData = ref<topicsDataType[]>([]);
  const isExpandableTopicsMenuVisible = ref<boolean>(false)
  const currentTempScale = ref<string>('°C')
  const navData = ref<string[]>([]);
  const country = ref<string>('IN');
  const temperature = ref<string>('°C');
  const forecastText = ref<string>('More Forecasts');
  const currentWeatherDetails = ref<{temp:string,city:string,state:string}>({ temp:'31°',city:'Chennai',state:'Tamil Nadu' })
;
  //onMounted
  onMounted(() => {
  headerCountryData.value = countryData;
  headerTopicsData.value = topicsData;
  navData.value = navItems
  })

  //computed
  const getUnitDescription = computed(() => {
    if(currentTempScale.value === '°F') return 'Imperial - F / mph / miles / inches'
    else if(currentTempScale.value === '°C') return 'Metric - C / millimeters / km / kmh / millibars'
    else return 'Hybrid - C / millimeters / miles / mph / millibars'
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
    isExpandableMenuVisible.value = false
  }

</script>

<style lang="scss" scoped>

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

            &__logo-section {
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

            &__main-menu-section {
              flex-grow: 1;
              display: flex;
              align-items: center;

              &__search-section {
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

              &__lang-select-section {
                padding-top: 10px;

                &__btn {
                 
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

              &__options-toggle-section {
                &__btn {
                  margin: 1px 11px 0px 25px;
                  padding: 1px 6px;
                  display: flex;
                  flex-direction: column;
                  gap: 5px;

                  &__line {
                    background-color: white;
                    height: 3px;
                    width: 30px;
                    border-radius: 2px;
                  }
                }
              }
            }

           }
      }

      &__expandable-temperature-menu {
        width: 100vw;
        box-shadow: 3px 3px 20px rgba(0, 0, 0,0.2);
        position: absolute;

        &__content {
          max-width: 1280px;
          margin: 0 auto;
          padding: 10px 0px;
          background-color: white;

          &__temp-details {
            margin: 0 30px 14px;
            padding: 5px 30px 0px 0px;

            &__temp-options {
              display: flex;
              align-items: center;
              cursor: pointer;

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

              &__title {
                font-size: 18px;
                font-weight: 700;
                text-transform: uppercase;
                line-height: 27px;
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
              }
            }
          }

         }
      }

      &__city-weather-indicator {
        width: 100vw;
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
            &__btn {
             display: flex;
             align-items: center;
             color: white;

             &__text {
              color: white;
              font-size: 16px;
              line-height: 18.4px;
             }

             &__icon {
              width: 22px;
              height: 22px;
              display: block;
              padding-left: 5px;
             }
            }
          }
        }
      }
  }

</style>