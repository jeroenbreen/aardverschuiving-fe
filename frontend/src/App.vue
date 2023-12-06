<script setup lang="ts">
import { onMounted } from "vue";
import { useMainStore } from "./stores/main";
import elections from "@/data/elections";
import municipalities from "@/data/municipalities";
import distances from "@/data/distances";
import parties from "@/data/parties";

import { Election, VoteSet } from "@/types";
import { loadVotes } from "@/tools/loader";
import { voteSetsToRelations } from "@/tools/prepairers";

const store = useMainStore();

// const prepair = async () => {
//     originToVotes("temp/2021.json", 2, store.parties, store.municipalities);
// };

const loadElection = async (election: Election) => {
    loadVotes(election.url).then((voteSets: VoteSet[]) => {
        store.votes = voteSets;
        store.loaded = true;
    });
};

onMounted(() => {
    store.elections = elections;
    const currentElection = elections[elections.length - 1];
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
    <router-view />
</template>

<style lang="scss">
@import "@/styles/index";
</style>
