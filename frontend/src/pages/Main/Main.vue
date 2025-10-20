<script setup lang="ts">
import { useMainStore } from "@/stores/main";
import Election from "@/components/election/Election.vue";
import { computed, onMounted, ref } from "vue";
import { ratio, a4ratio } from "./../../components/map/map/settings";

const store = useMainStore();

const content = ref<HTMLElement | null>(null);

const loadedElections = computed(() => store.elections.filter((e) => e.loaded));

const padding = 20;

onMounted(() => {
    if (content.value) {
        const width = content.value.clientWidth;
        const height = content.value.clientHeight;
        const realRatio = width / height;
        if (realRatio > ratio) {
            store.width = Math.min(height / a4ratio, 500);
        } else {
            store.width = Math.min(width, 500);
        }
        store.measured = true;
    }
});
</script>

<template>
    <div class="Main" v-if="store.init" :style="{ padding: padding + 'px' }">
        <div class="Main__content" ref="content">
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
    overflow: auto;

    &__content {
        display: flex;
        gap: 20px;
        justify-content: flex-start;
        height: 100%;

        & > * {
            flex-shrink: 0;
        }
    }
}

main {
    height: 100%;
}
</style>
