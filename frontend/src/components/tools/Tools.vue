<script setup lang="ts">
import { Municipality, Election } from "@/types";
import { useMainStore } from "@/stores/main";
import MunicipalityPicker from "./MunicipalityPicker.vue";
import ElectionPicker from "./ElectionPicker.vue";
import GridSlider from "./GridSlider.vue";
import PartyPicker from "./PartyPicker.vue";

const store = useMainStore();

const setCurrent = (municipallity: Municipality) => {
    store.currentMunicipality = municipallity;
};

const setCurrentElection = (election: Election) => {
    store.currentElection = election;
    // const topParties = election.results
    //     .sort((a, b) => b.votes - a.votes)
    //     .slice(0, 5)
    //     .map((result) => result.party_id);
    // store.setSelected(topParties);
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
