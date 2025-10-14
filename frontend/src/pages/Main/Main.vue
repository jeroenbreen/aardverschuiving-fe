<script setup lang="ts">
import { useMainStore } from "@/stores/main";
import GridSlider from "@/components/tools/GridSlider.vue";
import Election from "@/components/election/Election.vue";
import { computed, onMounted, ref } from "vue";
import ThresholdSlider from "@/components/tools/ThresholdSlider.vue";
import WidthSlider from "@/components/tools/WidthSlider.vue";
import DrawSwitch from "@/components/tools/DrawSwitch.vue";
import WinnerTakesAllSwitch from "@/components/tools/WinnerTakesAllSwitch.vue";

const store = useMainStore();

const content = ref<HTMLElement | null>(null);

const loadedElections = computed(() => store.elections.filter((e) => e.loaded));

const padding = 20;
const measured = ref(false);

onMounted(() => {
    if (content.value) {
        const width = content.value.clientWidth - 2 * padding;
        if (width > 500) {
            store.width = 500;
        } else {
            store.width = width;
        }
        measured.value = true;
    }
});
</script>

<template>
    <div class="Main" v-if="store.init">
        <div class="Main__tools">
            <div>
                <GridSlider />
                <ThresholdSlider />
                <WidthSlider v-if="measured" />
            </div>

            <div>
                <DrawSwitch />
                <WinnerTakesAllSwitch />
            </div>
        </div>

        <div
            ref="content"
            class="Main__content"
            :style="{ padding: padding + 'px' }"
        >
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
    --h: 110px;

    &__tools {
        height: var(--h);
        padding: 8px var(--size-4);
        display: flex;
        gap: 40px;
        align-items: flex-start;
    }

    &__content {
        display: flex;
        gap: 20px;
        justify-content: flex-start;
        height: calc(100% - var(--h));
        overflow: auto;

        & > * {
            flex-shrink: 0;
        }
    }
}
</style>
