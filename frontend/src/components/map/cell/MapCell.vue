<script setup lang="ts">
import { defineProps, PropType } from "vue";
import { Cell } from "../map/Cell";
import MapCellVoteSet from "@/components/map/cell/MapCellVoteSet.vue";
import Section from "@/components/Section.vue";

defineProps({
    cell: {
        type: Object as PropType<Cell>,
        required: true,
    },
});
</script>

<template>
    <Section>
        <h4>Vertegenwoordigd in deze cel:</h4>
        <map-cell-vote-set
            v-for="(voteSet, index) in cell.voteSets"
            :key="index"
            :vote-set="voteSet"
        />
    </Section>
</template>
