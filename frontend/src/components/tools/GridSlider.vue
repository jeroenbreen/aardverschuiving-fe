<script setup lang="ts">
import { defineEmits, ref, watch } from "vue";
import { useMainStore } from "@/stores/main";
import Tool from "@/components/tools/Tool.vue";

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
    <Tool label="Grid">
        <v-slider
            v-model="localValue"
            :min="5"
            :max="50"
            :step="2"
            show-ticks
        />
    </Tool>
</template>
