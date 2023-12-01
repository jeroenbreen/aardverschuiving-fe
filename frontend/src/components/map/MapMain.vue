<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { render } from "./render";
import { useMainStore } from "../../stores/main";
import { VoteSetHeavy } from "../../types";
import MapParties from "./MapParties.vue";

const store = useMainStore();
const el = ref<HTMLElement>();

const callback = (cell: any) => {
    if (cell.voteSets.length > 0) {
        const voteSet = cell.voteSets[0];
        store.selectMunicipality(voteSet.municipality.cbs_code);
        store.selectParty(voteSet.party.id);
    }
};

const update = () => {
    if (el.value) {
        const voteSets: VoteSetHeavy[] = [...store.voteSetsHeavy];
        render(el.value, voteSets, callback, store.grid);
    }
};

onMounted(() => {
    update();
});

watch(
    () => store.grid,
    () => {
        update();
    }
);
</script>

<template>
    <div class="MapMain">
        <canvas ref="el" />
        <div class="MapMain__title">
            <div>Verkiezingen</div>
            <div>Tweede Kamer</div>
            <div>2023</div>
        </div>

        <map-parties />
    </div>
</template>

<style lang="scss" scoped>
.MapMain {
    padding: 20px;
    position: relative;
    margin: 20px;
    box-shadow: -4px 2px 12px rgba(0, 0, 0, 0.08),
        4px 5px 24px rgba(0, 0, 0, 0.04);

    &__title {
        line-height: 1;
        font-weight: 900;
        position: absolute;
        top: 40px;
        left: 40px;
        width: 160px;
        z-index: 1;
        text-align: center;
        pointer-events: none;

        div:nth-child(1) {
            font-weight: 400;
            font-size: 16px;
        }

        div:nth-child(2) {
            font-size: 32px;
        }

        div:nth-child(3) {
            font-size: 56px;
        }
    }

    .MapParties {
        position: absolute;
        bottom: 20px;
        left: 20px;
        z-index: 1;
        pointer-events: none;
    }
}
</style>
