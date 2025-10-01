<script setup lang="ts">
import { useMainStore } from "@/stores/main";
import GridSlider from "@/components/tools/GridSlider.vue";
import Election from "@/components/election/Election.vue";
import { computed } from "vue";
import ThresholdSlider from "@/components/tools/ThresholdSlider.vue";
import WidthSlider from "@/components/tools/WidthSlider.vue";

const store = useMainStore();

const loadedElections = computed(() => store.elections.filter((e) => e.loaded));
</script>

<template>
    <div class="Main" v-if="store.init">
        <div class="Main__tools">
            <GridSlider />
            <ThresholdSlider />
            <WidthSlider />
        </div>
        <div class="Main__content">
            <Election
                v-for="election in loadedElections"
                :key="election.id"
                :election="election"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.Main {
    height: 100%;
    background: #ddd;
    --h: 100px;

    &__tools {
        height: var(--h);
        padding: 8px var(--size-4);
    }

    &__content {
        display: flex;
        gap: 20px;
        justify-content: flex-start;
        height: calc(100% - var(--h));
        padding: 20px;
        overflow: auto;

        & > * {
            flex-shrink: 0;
        }
    }
}
</style>
