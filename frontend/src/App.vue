<script setup lang="ts">
import { onMounted } from "vue";
import { useMainStore } from "./stores/main";
import elections from "@/data/elections";
import votes2023 from "@/data/votes-2023";
import votes2021 from "@/data/votes-2021";
import municipalities from "@/data/municipalities";
import distances from "@/data/distances";
import parties from "@/data/parties";
import Tools from "./components/tools/Tools.vue";
import Municipality from "./components/municipalities/Municipality.vue";
import { originToVotes, sumElection } from "./tools/prepairers";

const store = useMainStore();

const prepair = async () => {
    const votes = await originToVotes(
        "temp/2021.json",
        2,
        store.parties,
        store.municipalities
    );
    console.log(votes);
};

onMounted(() => {
    store.elections = elections;
    store.votes = [...votes2021, ...votes2023];
    store.municipalities = municipalities;
    store.parties = parties;
    store.distances = distances;
    store.currentMunicipality = municipalities.find(
        (m) => m.cbs_code === "1676"
    );
    store.currentElection = elections[0];
    store.loaded = true;
});
</script>

<template>
    <div class="App" v-if="store.loaded">
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
