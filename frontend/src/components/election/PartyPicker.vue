<script setup lang="ts">
import PartyCheckbox from "./PartyCheckbox.vue";
import { defineProps } from "vue";
import { Party } from "@/types";

defineProps<{
    parties: { party: Party; display: boolean }[];
}>();
</script>

<template>
    <div class="PartyPicker">
        <PartyCheckbox
            v-for="(item, index) in parties"
            :key="index"
            :item="item"
        />
    </div>
</template>

<style lang="scss" scoped>
.PartyPicker {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    button {
        border: 1px solid #000;
        font-size: var(--text-s);
        padding: 0 4px;
    }
}
</style>
