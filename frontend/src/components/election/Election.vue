<script setup lang="ts">
import { computed, defineProps } from "vue";
import ElectionMap from "@/components/map/Map.vue";
import { Election, Party } from "@/types";
import { useMainStore } from "@/stores/main";

const props = defineProps<{
    election: Election;
}>();

const store = useMainStore();

const parties = computed(() => {
    if (!props.election.totals) {
        return [];
    } else {
        return props.election.totals
            .filter((t) => t.votes > store.threshold)
            .map((t) => {
                return t.party;
            });
    }
});
</script>

<template>
    <div class="Election" :style="{ width: store.width + 'px' }">
        <ElectionMap :election="election" :parties="parties" />
        <!--        <municipality />-->
    </div>
</template>

<style lang="scss" scoped>
.Election {
    &__slider {
        width: 150px;
    }

    &__threshold {
        font-size: 11px;
    }
}
</style>
