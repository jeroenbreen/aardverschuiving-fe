<script setup lang="ts">
import { onMounted } from "vue";
import { useMainStore } from "./stores/main";
import elections from "@/data/elections";
import municipalities from "@/data/municipalities";
import distances from "@/data/distances";
import parties from "@/data/parties";
import ppMenu from "@/components/menu/Menu.vue";

import { Election, VoteSet } from "@/types";
import { loadVotes } from "@/tools/loader";
import { getSmallesOfParty } from "@/tools/prepairers";

const store = useMainStore();

// const prepair = async () => {
//     originToVotes("temp/2021.json", 2, store.parties, store.municipalities);
// };

const loadElection = async (election: Election) => {
    loadVotes(election.url).then((voteSets: VoteSet[]) => {
        election.voteSets = voteSets;
        store.currentElection = election;
        store.loaded = true;
        getSmallesOfParty(voteSets, 15);
    });
};

onMounted(() => {
    store.elections = elections;
    store.addMunicipalities(municipalities);
    store.addParties(parties);
    store.distances = distances;
    store.init = true;
    const m = municipalities.find((m) => m.cbs_code === "0363");
    if (m) {
        store.currentMunicipality = m;
    }
    loadElection(elections[elections.length - 1]);
});
</script>

<template>
    <div class="App">
        <pp-menu />
        <div class="App__content" v-if="store.loaded">
            <router-view />
        </div>
    </div>
</template>

<style lang="scss">
@import "@/styles/index";
</style>

<style lang="scss" scoped>
.App {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    .Menu {
        height: 60px;
    }

    &__content {
        height: calc(100% - 60px);
    }
}
</style>
