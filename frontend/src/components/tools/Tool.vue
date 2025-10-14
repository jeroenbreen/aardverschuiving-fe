<script setup lang="ts">
import { defineProps } from "vue";

defineProps({
    label: {
        type: String,
        required: true,
    },
    forSwitch: {
        type: Boolean,
        default: false,
    },
});
</script>

<template>
    <div class="Tool" :data-for-switch="forSwitch">
        <div class="Tool__content">
            <slot />
        </div>
        <label> {{ label }} </label>
    </div>
</template>

<style lang="scss" scoped>
.Tool {
    display: flex;
    align-items: center;
    gap: 10px;

    &__content {
        width: 150px;
    }

    label {
        font-size: 15px;
    }

    &[data-for-switch="true"] {
        & .Tool__content {
            width: 55px;
        }
    }
}
</style>
