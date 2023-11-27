<script setup lang="ts">
import { onMounted } from "vue";
import { useMainStore } from "./stores/main";
import elections from "@/data/elections";
import votes from "@/data/votes";
import municipallities from "@/data/municipallities";
import parties from "@/data/parties";

const store = useMainStore();

onMounted(() => {
    store.elections = elections;
    store.votes = votes;
    store.municipallities = municipallities;
    store.parties = parties;
});
</script>

<template>
    <router-view />
</template>

<style lang="scss"></style>
