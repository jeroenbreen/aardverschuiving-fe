<script setup lang="ts">
import { useMainStore } from "@/stores/main";

const store = useMainStore();
</script>

<template>
    <div class="ThresholdSlider">
        <div class="ThresholdSlider__slider">
            <v-slider
                v-model="store.threshold"
                :min="0"
                :max="1000000"
                :step="100000"
                show-ticks
            />
        </div>
        <label>
            Toon partijen met meer dan {{ store.threshold }} stemmen
        </label>
    </div>
</template>

<style lang="scss" scoped>
.ThresholdSlider {
    display: flex;
    align-items: center;
    gap: 10px;

    label {
        font-size: 15px;
    }

    &__slider {
        width: 150px;
    }
}
</style>
