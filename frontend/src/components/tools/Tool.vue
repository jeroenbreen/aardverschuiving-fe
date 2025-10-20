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
        <label> {{ label }} </label>
        <div class="Tool__content">
            <slot />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.Tool {
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #aaa;
    padding: 6px 0;

    &__content {
        width: 100%;
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
