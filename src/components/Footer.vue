<template>
  <div class="footer">
    <div class="footer-content">
      <div class="footer-content__social-logs">
        <div class="footer-connect-section elements-in-middle">
          <span class="footer-connect-section__text">{{
            data?.connnectData?.title
          }}</span>
          <ul class="footer-social-icons footer-list">
            <li
              class="social-icon-wrapper"
              v-for="elem in data?.connnectData?.icons"
            >
              <a class="social-icon-wrapper__link">
                <img
                  class="social-icon-wrapper__link__icon"
                  :src="elem"
                  alt="social-media-icon"
                />
              </a>
            </li>
          </ul>
        </div>
        <div class="footer-company-icons elements-in-middle">
          <img
            v-for="elem in data?.companyIcons"
            class="footer-company-icons__icon"
            :src="elem"
            alt="company-icon"
          />
        </div>
      </div>

      <ul class="footer-corporate-links footer-list">
        <li
          class="footer-corporate-links__link-wrapper"
          v-for="elem in data?.corporateLinks"
        >
          <a
            class="footer-corporate-links__link-wrapper__link footer-list-link"
            >{{ elem }}</a
          >
        </li>
      </ul>

      <ul class="footer-legal-links footer-list">
        <li
          class="footer-legal-links__link-wrapper"
          v-for="elem in data?.legalLinks"
        >
          <a class="footer-legal-links__link-wrapper__link footer-list-link">{{
            elem
          }}</a>
        </li>
      </ul>

      <div class="footer-external-attribution">
        <a
          class="footer-external-attribution__link"
          v-for="elem in data?.attributionIcons"
        >
          <img :src="elem" alt="attribution-icon" />
        </a>
      </div>

      <div class="footer-privacy-container">
        <p class="footer-privacy-container__para">{{ data?.privacyPara }}</p>
        <ul class="footer-privacy-container-list footer-list">
          <li
            class="footer-privacy-container-list__link-wrapper"
            v-for="elem in data?.privacyLinks"
          >
            <a class="footer-privacy-container-list__link-wrapper__link">{{
              elem
            }}</a>
          </li>
        </ul>
        <div class="footer-privacy-container__copyright">
          {{ data?.copyrightText }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

import footerData from "../data/footerData.json";

const data = ref();

//onMounted
onMounted(() => {
  data.value = footerData;
});
</script>

<style lang="scss" scoped>
.footer {
  background-color: white;
}

.footer-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.footer-content {
  max-width: 1138px;
  margin: 0 auto;
  padding: 30px;

  &__social-logs {
    display: flex;
    justify-content: space-between;
  }
}

.elements-in-middle {
  display: flex;
  align-items: center;
}

.footer-social-icons {
  margin: 0;
  padding: 0;
  display: flex;

  .social-icon-wrapper {
    list-style: none;

    &__link {
      padding: 10px;
      display: block;
      border-radius: 100vw;
      background-color: #cfdaf9;
      margin-left: 10px;

      &__icon {
        width: 24px;
        height: 24px;
        display: block;
      }
    }
  }
}

.footer-company-icons {
  &__icon {
    height: 50px;
    width: 50px;
    display: inline-block;
    margin-left: 10px;
  }

  &__icon:nth-child(1) {
    margin-left: 0px;
  }

  &__icon:nth-child(2) {
    height: 35px;
    width: 35px;
  }
}

.footer-list-link {
  display: inline-block;
  font-size: 14px;
  margin-top: 10px;
  padding: 0px 7px;
  line-height: 21px;
}

.footer-corporate-links {
  display: flex;
  justify-content: center;
  margin: 35px 0px 14px 0px;

  &__link-wrapper {
    &__link {
      font-weight: 400;
    }
  }
}

.footer-legal-links {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  &__link-wrapper {
    &__link {
      display: block;
      border-right: 1px solid black;
      font-weight: 700;
    }
  }
}

.footer-external-attribution {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-top: 7px;

  &__link {
    display: block;
  }

  &__link:nth-child(1) {
    margin-right: 10px;
  }
}

.footer-privacy-container {
  &__para {
    max-width: 600px;
    text-align: center;
    margin: 18px auto;
    line-height: 19.6px;
    font-size: 14px;
  }

  .footer-privacy-container-list {
    margin: 14px 0px;
    &__link-wrapper {
      &__link {
        display: block;
        margin: 0 auto;
        width: fit-content;
        font-size: 14px;
        font-weight: 700;
      }
    }
  }

  &__copyright {
    font-size: 13px;
    line-height: 19.5px;
    text-align: center;
  }
}

//media queries
@media screen and (max-width: 600px) {
  .footer-content {
    &__social-logs {
      flex-direction: column;
      gap: 12px;
    }
  }

  .footer-legal-links {
    display: block;
    &__link-wrapper {
      flex: 1;

      &__link {
        border-right: 0;
      }
    }
  }

  .footer-connect-section {
    flex-direction: column;
    gap: 12px;
  }
}
</style>
