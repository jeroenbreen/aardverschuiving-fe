<script setup lang="ts">
import WidthSlider from "@/components/tools/WidthSlider.vue";
import ThresholdSlider from "@/components/tools/ThresholdSlider.vue";
import GridSlider from "@/components/tools/GridSlider.vue";
import DrawSwitch from "@/components/tools/DrawSwitch.vue";
import WinnerTakesAllSwitch from "@/components/tools/WinnerTakesAllSwitch.vue";
import { useMainStore } from "@/stores/main";

const store = useMainStore();
</script>

<template>
    <div class="Tools">
        <GridSlider />
        <ThresholdSlider />
        <WidthSlider v-if="store.measured" />
        <DrawSwitch />
        <WinnerTakesAllSwitch />
    </div>
</template>

<style lang="scss" scoped>
.Tools {
    height: var(--h);
    padding: 8px var(--size-4);
    display: flex;
    gap: 10px;
    flex-direction: column;
}
</style>
