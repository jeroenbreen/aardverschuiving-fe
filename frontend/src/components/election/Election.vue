<script setup lang="ts">
import { computed, defineProps } from "vue";
import ElectionMap from "@/components/map/Map.vue";
import { Election, Party } from "@/types";
import ps from "@/data/parties";
import { useMainStore } from "@/stores/main";

const props = defineProps<{
    election: Election;
}>();

const store = useMainStore();

const parties = computed(() => {
    const results = [...props.election.results].sort(
        (a, b) => b.votes - a.votes
    );
    return results.map((r) => {
        const party = ps.find((p) => p.id === r.party_id) as Party;
        return {
            party,
            display: r.votes > store.threshold,
        };
    });
});

const selectedParties = computed(() => {
    return parties.value.filter((p) => p.display).map((i) => i.party);
});
</script>

<template>
    <div class="Election" :style="{ width: store.width + 'px' }">
        <ElectionMap :election="election" :parties="selectedParties" />
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
