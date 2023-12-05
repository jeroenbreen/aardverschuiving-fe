<script setup lang="ts">
import { computed } from "vue";
import { useMainStore } from "../../stores/main";
import MapParty from "@/components/map/MapParty";

const store = useMainStore();

const parties = computed(() => {
    return store.selectedParties.map((id) => {
        return store.parties.find((p) => p.id === id);
    });
});
</script>

<template>
    <div class="MapParties">
        <map-party
            v-for="(party, index) of parties"
            :key="index"
            :party="party"
        />
    </div>
</template>

<style lang="scss" scoped>
.MapParties {
    display: flex;
    flex-wrap: wrap;
    border-top: 1px solid #888;
    padding: 8px;
    width: 230px;
    pointer-events: none;
    font-family: var(--font-mono);
    color: var(--color-black-1);

    .MapParty {
        width: 50%;
    }
}
</style>
