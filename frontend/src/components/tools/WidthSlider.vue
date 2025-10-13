<script setup lang="ts">
import { defineEmits, ref, watch } from "vue";
import { useMainStore } from "@/stores/main";
import Tool from "@/components/tools/Tool.vue";

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
    <Tool label="Poster grootte">
        <v-slider
            v-model="localValue"
            :min="100"
            :max="600"
            :step="50"
            show-ticks
        />
    </Tool>
</template>
