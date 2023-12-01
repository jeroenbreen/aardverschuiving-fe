<script setup lang="ts">
import { defineEmits, ref, watch } from "vue";
import { useMainStore } from "@/stores/main";

const emit = defineEmits<{
    select: (value: number) => void;
}>();

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
            emit("select", localValue.value);
        }, 100);
    }
);
</script>

<template>
    <div class="GridSlider">
        <label> Grid </label>
        <v-slider v-model="localValue" :min="5" :max="80" :step="2" />
    </div>
</template>

<style lang="scss" scoped>
.GridSlider {
}
</style>
