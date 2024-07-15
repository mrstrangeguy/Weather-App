<template>
  <div>
    <div class="popup-temp-options">
      <ul class="popup-temp-list">
        <li
          :class="{
            'popup-temp-list__line': true,
            'selected-temp': isCurrentTempOption('°F'),
            temp: !isCurrentTempOption('°F'),
          }"
          @click.stop="onTempScaleChange('°F')"
        >
          °F
        </li>
        <li
          :class="{
            'popup-temp-list__line': true,
            'selected-temp': isCurrentTempOption('°C'),
            temp: !isCurrentTempOption('°C'),
          }"
          @click.stop="onTempScaleChange('°C')"
        >
          °C
        </li>
        <li
          :class="{
            'popup-temp-list__line': true,
            'selected-temp': isCurrentTempOption('Hybrid'),
            temp: !isCurrentTempOption('Hybrid'),
          }"
          @click.stop="onTempScaleChange('Hybrid')"
        >
          Hybrid
        </li>
      </ul>
      <div class="popup-temp-indicator">{{ currentUnitDescription }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import headerDataType from "../types/headerDataType";

const props = defineProps<{
  headerData: headerDataType | undefined;
  currentUnitDescription: string;
}>();

const emits = defineEmits(["closeAllPopup"]);

const isCurrentTempOption = (temperatureUnit: string) =>
  temperatureUnit === props.headerData?.currentTempScale;

const onTempScaleChange = (tempUnit: string) => {
  if (!props.headerData) return;

  props.headerData.currentTempScale = tempUnit;
  emits("closeAllPopup");
};
</script>

<style lang="scss" scoped>
.popup-temp-options {
  display: flex;
  align-items: center;
  cursor: pointer;
  flex-wrap: wrap;

  .popup-temp-list {
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
}

.selected-temp {
  background-color: rgb(27, 77, 228);
  color: white;
}

.popup-temp-indicator {
  font-size: 13px;
  padding-left: 10px;
  padding-top: 5px;
  color: rgb(111, 117, 133);
}
</style>
