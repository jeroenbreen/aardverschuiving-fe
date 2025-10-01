<script setup lang="ts">
import { useMainStore } from "./stores/main";
import ppMenu from "@/components/menu/Menu.vue";
import { onMounted } from "vue";
import elections from "@/data/elections";
import municipalities from "@/data/municipalities";
import parties from "@/data/parties";
import distances from "@/data/distances";
import { Election as ElectionType, VoteSet } from "@/types";
import { loadVotes } from "@/tools/loader";

const store = useMainStore();

const loadElection = async (election: ElectionType) => {
    loadVotes(election.url).then((voteSets: VoteSet[]) => {
        election.voteSets = voteSets;
        election.loaded = true;
    });
};

onMounted(() => {
    store.elections = elections;
    store.addMunicipalities(municipalities);
    store.addParties(parties);
    store.distances = distances;
    store.init = true;
    for (const election of store.elections) {
        loadElection(election);
    }
});
</script>

<template>
    <div class="App">
        <pp-menu />
        <div class="App__content">
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
