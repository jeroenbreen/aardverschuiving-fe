<script setup lang="ts">
import { useMainStore } from "@/stores/main";
import Election from "@/components/election/Election.vue";
import { computed, onMounted, ref } from "vue";
import Tools from "@/components/tools/Tools.vue";

const store = useMainStore();

const content = ref<HTMLElement | null>(null);

const loadedElections = computed(() => store.elections.filter((e) => e.loaded));

const padding = 20;

onMounted(() => {
    if (content.value) {
        const width = content.value.clientWidth - 2 * padding;
        if (width > 500) {
            store.width = 500;
        } else {
            store.width = width;
        }
        store.measured = true;
    }
});
</script>

<template>
    <div class="Main" v-if="store.init">
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

    &__content {
        display: flex;
        gap: 20px;
        justify-content: flex-start;
        overflow: auto;
        height: 100%;

        & > * {
            flex-shrink: 0;
        }
    }
}
</style>
