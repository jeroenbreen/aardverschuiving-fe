<script setup lang="ts">
import { defineEmits, ref, watch } from "vue";
import { useMainStore } from "@/stores/main";

const store = useMainStore();
const localValue = ref(store.grid);

let timer = 0;

watch(
    () => localValue.value,
    () => {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            store.grid = localValue.value;
        }, 100);
    }
);
</script>

<template>
    <div class="GridSlider">
        <div class="GridSlider__slider">
            <v-slider
                v-model="localValue"
                :min="5"
                :max="50"
                :step="2"
                show-ticks
            />
        </div>
        <label> Grid </label>
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
