<script setup lang="ts">
import { Municipality, Election } from "@/types";
import { useMainStore } from "@/stores/main";
import MunicipalityPicker from "./MunicipalityPicker.vue";
import ElectionPicker from "./ElectionPicker.vue";
import GridSlider from "./GridSlider.vue";

const store = useMainStore();

const setCurrent = (municipallity: Municipality) => {
    store.currentMunicipality = municipallity;
};

const setCurrentElection = (election: Election) => {
    store.currentElection = election;
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
    </div>
</template>

<style lang="scss" scoped>
.Tools {
    width: 250px;
    padding: var(--size-4);
    display: flex;
    flex-direction: column;
    gap: var(--size-4);
}
</style>
