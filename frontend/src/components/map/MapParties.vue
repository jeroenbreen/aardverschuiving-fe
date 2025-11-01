<script setup lang="ts">
import { defineProps } from "vue";
import MapParty from "./MapParty.vue";
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
    padding-top: 8px;
    border-top: 1px solid #888;
    gap: 4px 2px;
    pointer-events: none;
    font-family: var(--font-mono);
    color: var(--color-black-1);
    background: #fff;
}
</style>
