<script setup lang="ts">
import { defineProps } from "vue";
import MapParty from "@/components/map/MapParty";
import { Party } from "@/types";

defineProps<{
    parties: Party[];
}>();
</script>

<template>
    <div class="MapParties">
        <MapParty
            v-for="(party, index) of parties"
            :key="index"
            :party="party"
        />
    </div>
</template>

<style lang="scss" scoped>
.MapParties {
    display: flex;
    flex-wrap: wrap;
    border-top: 1px solid #888;
    padding: 8px;
    width: 230px;
    pointer-events: none;
    font-family: var(--font-mono);
    color: var(--color-black-1);

    .MapParty {
        width: 50%;
    }
}
</style>
