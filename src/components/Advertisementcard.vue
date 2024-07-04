<template>
    <div class="advertisement-card">
        <slot name="header-content"></slot>
        <div class="advertisement-card__content">
        <slot name="additional-content">
        <div class="advertisement-label">Advertisement</div>
        </slot>
        <div class="advertisement-card-image-wrapper">
            <slot name="advertisement-image"> </slot>
        </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>

 .advertisement-label {
        text-align:right;
        padding:3px 16px;
        color:rgb(111, 117, 133);
        font-size:10px;
        line-height:15px;
    }

.advertisement-card {
    background-color: white;
    margin-bottom:12px;
    border-radius:6px;
    box-shadow:rgba(0, 0, 0, 0.2) 0px 0px 12px 0px;

    &__content {
    padding: 0px 16px 16px 16px; 
    }
}

.advertisement-card-image-wrapper {
    &__image {
        display:block;
        width:100%;
    }
}
</style>