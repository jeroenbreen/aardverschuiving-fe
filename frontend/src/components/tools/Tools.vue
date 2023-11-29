<script setup lang="ts">
import { Municipality, Election } from "@/types";
import { useMainStore } from "@/stores/main";
import MunicipalityPicker from "./MunicipalityPicker.vue";
import ElectionPicker from "./ElectionPicker.vue";

const store = useMainStore();

const setCurrent = (municipallity: Municipality) => {
    store.currentMunicipality = municipallity;
};

const setCurrentElection = (election: Election) => {
    store.currentElection = election;
};
</script>

<template>
    <div class="Tools">
        <municipality-picker @select="setCurrent" />
        <election-picker @select="setCurrentElection" />
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
