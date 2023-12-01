<script setup lang="ts">
import { onMounted, ref } from "vue";
import { render } from "./render";
import { useMainStore } from "../../stores/main";
import { FeatureProperties, VoteSetHeavy } from "../../types";

const store = useMainStore();
const el = ref<HTMLElement | null>(null);

const callback = (properties: FeatureProperties) => {
    store.selectMunicipality(properties.cbs_code);
    console.log(properties.party_id);
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
