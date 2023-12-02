<script setup lang="ts">
import { onMounted } from "vue";
import { useMainStore } from "./stores/main";
import elections from "@/data/elections";
import votes from "@/data/votes";
import municipalities from "@/data/municipalities";
import parties from "@/data/parties";
import Tools from "./components/tools/Tools.vue";
import Municipality from "./components/municipalities/Municipality.vue";

const store = useMainStore();

const count = () => {
    //
    const votes = store.parties.map((party) => {
        const votes = store.votes.filter((vote) => {
            return vote.party_id === party.id;
        });
        const n = votes.reduce((acc, v) => {
            return acc + v.votes;
        }, 0);
        return {
            party_id: party.id,
            votes: n,
        };
    });
    console.log(votes);
};

onMounted(() => {
    store.elections = elections;
    store.votes = votes;
    store.municipalities = municipalities;
    store.parties = parties;
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
        <!--        <router-view />-->
    </div>
</template>

<style lang="scss">
@import "@/styles/index";
</style>

<style lang="scss" scoped>
.App {
    display: flex;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}
</style>
