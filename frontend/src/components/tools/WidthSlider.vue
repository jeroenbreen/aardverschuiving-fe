<script setup lang="ts">
import { defineEmits, ref, watch } from "vue";
import { useMainStore } from "@/stores/main";

const store = useMainStore();
const localValue = ref(store.width);

let timer = 0;

watch(
    () => localValue.value,
    () => {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            store.width = localValue.value;
        }, 100);
    }
);
</script>

<template>
    <div class="GridSlider">
        <div class="GridSlider__slider">
            <v-slider
                v-model="localValue"
                :min="100"
                :max="600"
                :step="50"
                show-ticks
            />
        </div>
        <label> Poster grootte </label>
    </div>
</template>

<style lang="scss" scoped>
.GridSlider {
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
