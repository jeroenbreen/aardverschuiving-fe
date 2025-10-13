<script setup lang="ts">
import { defineProps } from "vue";

defineProps({
    label: {
        type: String,
        required: true,
    },
});
</script>

<template>
    <div class="Tool">
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
}
</style>
