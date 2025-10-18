<script setup lang="ts">
import { useMainStore } from "./stores/main";
import ppMenu from "@/components/menu/Menu.vue";
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

const store = useMainStore();

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

const drawer = ref(false);
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

            <v-toolbar-title>
                <Logo />
            </v-toolbar-title>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer">
            <v-list>
                <v-list-item
                    v-for="item in menuItems"
                    :key="item.text"
                    :to="item.to"
                    @click="drawer = false"
                >
                    <v-list-item-title>{{ item.text }}</v-list-item-title>
                </v-list-item>
            </v-list>

            <Tools />
        </v-navigation-drawer>

        <v-main>
            <router-view />
        </v-main>
    </v-app>
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
