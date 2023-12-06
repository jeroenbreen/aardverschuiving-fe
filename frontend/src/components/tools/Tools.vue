<script setup lang="ts">
import { Municipality, Election, VoteSet } from "@/types";
import { useMainStore } from "@/stores/main";
import MunicipalityPicker from "./MunicipalityPicker.vue";
import ElectionPicker from "./ElectionPicker.vue";
import GridSlider from "./GridSlider.vue";
import PartyPicker from "./PartyPicker.vue";
import { loadVotes } from "@/tools/loader";

const store = useMainStore();

const setCurrent = (municipallity: Municipality) => {
    store.currentMunicipality = municipallity;
};

const setCurrentElection = (election: Election) => {
    if (election.voteSets.length === 0) {
        store.currentElection = null;
        store.loaded = false;
        loadVotes(election.url).then((voteSets: VoteSet[]) => {
            election.voteSets = voteSets;
            store.loaded = true;
            store.currentElection = election;
        });
    } else {
        store.currentElection = election;
    }
};

const setGrid = (grid: number) => {
    store.grid = grid;
};
</script>

<template>
    <div class="Tools">
        <municipality-picker @select="setCurrent" />
        <election-picker @select="setCurrentElection" />
        <grid-slider @select="setGrid" />
        <party-picker :key="store.currentElection" />
    </div>
</template>

<style lang="scss" scoped>
.Tools {
    padding: var(--size-4);
    display: flex;
    flex-direction: column;
    gap: var(--size-4);
}
</style>
