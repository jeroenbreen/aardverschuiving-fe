<script setup lang="ts">
import { useMainStore } from "@/stores/main";
import Tool from "@/components/tools/Tool.vue";

const store = useMainStore();
</script>

<template>
    <Tool
        :label="'Toon partijen met meer dan <' + store.threshold + '> stemmen'"
    >
        <v-slider
            v-model="store.threshold"
            :min="0"
            :max="100000"
            :step="5000"
            show-ticks
        />
    </Tool>
</template>
