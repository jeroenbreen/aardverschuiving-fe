<script setup lang="ts">
import { onMounted } from "vue";
import { useMainStore } from "./stores/main";
import elections from "@/data/elections";
import municipalities from "@/data/municipalities";
import distances from "@/data/distances";
import parties from "@/data/parties";
import Tools from "./components/tools/Tools.vue";
import Municipality from "@/components/municipalities/Municipality.vue";
import { Election } from "@/types";
import { loadVotes } from "@/tools/loader";
import data from "@/data/temp/2023.js";

const store = useMainStore();

// const prepair = async () => {
//     originToVotes("temp/2021.json", 2, store.parties, store.municipalities);
// };

const loadElection = async (election: Election) => {
    loadVotes(election.url).then((voteSets) => {
        store.votes = voteSets;
        store.loaded = true;
    });
};

onMounted(() => {
    store.elections = elections;
    const currentElection = elections[0];
    store.currentElection = currentElection;
    store.municipalities = municipalities;
    store.parties = parties;
    store.distances = distances;
    store.init = true;
    store.currentMunicipality = municipalities.find(
        (m) => m.cbs_code === "1676"
    );
    loadElection(currentElection);
});
</script>

<template>
    <div class="App" v-if="store.init">
        <tools />
        <municipality />
        <router-view />
    </div>
</template>

<style lang="scss">
@import "@/styles/index";
</style>

<style lang="scss" scoped>
.App {
    display: flex;
    gap: 24px;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;

    .Tools {
        width: 250px;
        height: 100%;
        overflow: auto;
    }

    .Municipality {
        width: 320px;
        height: 100%;
        overflow: auto;
        padding-right: 20px;
    }

    .map-container {
        flex: 1;
        height: 100%;
        overflow: auto;
    }
}
</style>
