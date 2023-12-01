<script setup lang="ts">
import { onMounted, ref } from "vue";
import { render } from "./render";
import { useMainStore } from "../../stores/main";
import { VoteSetHeavy } from "../../types";

const store = useMainStore();
const el = ref<HTMLElement | null>(null);

const callback = (cell: any) => {
    console.log(cell);
    if (cell.voteSets.length > 0) {
        const voteSet = cell.voteSets[0];
        store.selectMunicipality(voteSet.municipality.cbs_code);
        store.selectParty(voteSet.party.id);
    }
    // console.log(properties.party_id);
};

onMounted(() => {
    if (el.value) {
        const voteSets: VoteSetHeavy[] = store.voteSetsHeavy;
        render(el.value, voteSets, callback);
    }
});
</script>

<template>
    <div class="MapMain" ref="el"></div>
</template>

<style lang="scss" scoped>
.MapMain {
    padding: 20px;
}
</style>
