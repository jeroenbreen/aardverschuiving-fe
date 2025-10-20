<script setup lang="ts">
import { useMainStore } from "./stores/main";
import { onMounted, ref } from "vue";
import elections from "@/data/elections";
import municipalities from "@/data/municipalities";
import parties from "@/data/parties";
import distances from "@/data/distances";
import {
    Election as ElectionType,
    MenuButton as MenuButtonType,
    VoteSet,
} from "@/types";
import { loadVotes } from "@/tools/loader";
import Tools from "@/components/tools/Tools.vue";
import Logo from "@/components/Logo.vue";
import { useRoute } from "vue-router";

const store = useMainStore();

const route = useRoute();

const loadElection = async (election: ElectionType) => {
    if (election.url.length > 0) {
        loadVotes(election.url).then((voteSets: VoteSet[]) => {
            election.voteSets = voteSets;
            election.loaded = true;
        });
    } else {
        election.loaded = true;
    }
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

const drawer = ref(true);
const menuItems: MenuButtonType[] = [
    {
        text: "Verkiezingskaart",
        to: "/",
    },
    {
        text: "Missie",
        to: "/about",
    },
    {
        text: "Uitleg grid",
        to: "/uitleg-grid",
    },
];
</script>

<template>
    <v-app>
        <v-app-bar app color="white" dark>
            <v-app-bar-nav-icon @click="drawer = !drawer" />

            <v-toolbar-title> <Logo /> </v-toolbar-title>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer">
            <v-list>
                <v-list-item
                    v-for="item in menuItems"
                    :key="item.text"
                    :to="item.to"
                    @click="drawer = false"
                >
                    <v-list-item-title
                        ><b>{{ item.text }}</b></v-list-item-title
                    >
                </v-list-item>
            </v-list>

            <Tools v-if="route.name === 'Main'" />
        </v-navigation-drawer>

        <v-main>
            <router-view />
        </v-main>
    </v-app>
</template>

<style lang="scss">
@import "@/styles/index";

main {
    overflow: hidden;
    height: 100vh;
    padding-top: 64px;
}
</style>

<style lang="scss" scoped>
.App {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.v-list {
    border-bottom: 2px solid #000;
    margin-bottom: 12px;
    background: #ddd !important;
}

nav {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    background: #fff;
}
</style>
