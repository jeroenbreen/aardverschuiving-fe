<script setup lang="ts">
import { useMainStore } from "@/stores/main";
import Election from "@/components/election/Election.vue";
import { onMounted, ref } from "vue";
import { ratio, a4ratio } from "./../../components/map/map/settings";

const store = useMainStore();

const content = ref<HTMLElement | null>(null);

const padding = 20;

onMounted(() => {
    if (content.value) {
        const buffer = 4;
        const width = content.value.clientWidth - buffer;
        const height = content.value.clientHeight - buffer;
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
    <div class="Main" :style="{ padding: padding + 'px' }">
        <div class="Main__content" ref="content">
            <template v-if="store.init">
                <Election
                    v-for="election in store.elections"
                    :key="election.id"
                    :election="election"
                />
            </template>
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
