<script setup lang="ts">
import { useMainStore } from "@/stores/main";
import PartyCheckbox from "./PartyCheckbox.vue";

const store = useMainStore();
</script>

<template>
    <div class="PartyPicker">
        <party-checkbox
            v-for="(result, index) in store.electionResults"
            :key="index"
            :party="result.party"
            :i="index"
        />
    </div>
</template>

<style lang="scss" scoped>
.PartyPicker {
    button {
        border: 1px solid #000;
        font-size: var(--text-s);
        padding: 0 4px;
        margin-bottom: 8px;
    }
}
</style>
