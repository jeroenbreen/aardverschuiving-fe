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
        election.voteSets = voteSets;
        store.loaded = true;
        store.currentElection = election;
    });
};

onMounted(() => {
    store.elections = elections;
    store.addMunicipalities(municipalities);
    store.addParties(parties);
    store.distances = distances;
    store.init = true;
    store.currentMunicipality = municipalities.find(
        (m) => m.cbs_code === "1676"
    );
    loadElection(elections[elections.length - 1]);
});
</script>

<template>
    <router-view />
</template>

<style lang="scss">
@import "@/styles/index";
</style>
