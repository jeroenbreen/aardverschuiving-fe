<script setup lang="ts">
import { useMainStore } from "@/stores/main";
import GridSlider from "@/components/tools/GridSlider.vue";
import Election from "@/components/election/Election.vue";
import { computed } from "vue";
import ThresholdSlider from "@/components/tools/ThresholdSlider.vue";

const store = useMainStore();

const loadedElections = computed(() => store.elections.filter((e) => e.loaded));
</script>

<template>
    <div class="Main" v-if="store.init">
        <div class="Main__tools">
            <GridSlider />
            <ThresholdSlider />
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

    &__tools {
        height: 70px;
        padding: 8px var(--size-4);
    }

    &__content {
        display: flex;
        height: calc(100% - 70px);
    }
}
</style>
