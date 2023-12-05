<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useMainStore } from "../../stores/main";
import { VoteSetHeavy } from "../../types";
import MapParties from "./MapParties.vue";
import { ratio, settings } from "./classes/settings";
import { App } from "./classes/App";
import { Cell } from "./classes/Cell";

const store = useMainStore();
const el = ref<HTMLElement>();
const app = ref<App>();

const callback = (cell: Cell) => {
    if (cell.voteSets.length > 0) {
        const voteSet = cell.voteSets[0];
        store.selectMunicipality(voteSet[1].cbs_code);
        store.selectParty(voteSet[2].id);
    }
};

const padding = 20;
const baseWidth = ref(0);
const width = computed(() => baseWidth.value + padding * 2);
const height = computed(() => (width.value / 21) * 29.7);
const report = ref(null);

const create = () => {
    if (el.value) {
        const start = new Date();
        const voteSets: VoteSetHeavy[] = [...store.voteSetsHeavy];
        const canvas = el.value;
        const ctx = canvas.getContext("2d");
        if (ctx) {
            const w = settings.width + settings.padding * 2;
            baseWidth.value = w;
            canvas.width = w;
            canvas.height = settings.width * ratio + settings.padding * 2;
            app.value = new App(
                ctx,
                canvas.width,
                canvas.height,
                voteSets,
                store.grid,
                callback,
                store.selectedParties
            );
            report.value = app.value.getReport();
        }
        const end = new Date();
        console.log("create time", end.getTime() - start.getTime());
    }
};

watch(
    () => store.grid,
    () => {
        // update function is slow for some reason, dont understand why
        // app.value.updateGrid(store.grid, [...store.voteSetsHeavy]);
        create();
    }
);

watch(
    () => store.loaded,
    () => {
        if (store.loaded) {
            create();
        }
    }
);

watch(
    () => store.selectedPartyRanks,
    () => {
        app.value.updateSelectedParties(store.selectedParties);
    },
    {
        deep: true,
    }
);
</script>

<template>
    <div class="map-container">
        <div
            class="Map"
            :style="{
                width: width + 'px',
                height: height + 'px',
            }"
        >
            <canvas ref="el" />
            <div
                v-if="store.currentElection"
                class="Map__title"
                :style="{
                    width: width / 3 + 'px',
                    'font-size': width / 30 + 'px',
                }"
            >
                <div>Verkiezingen</div>
                <div>Tweede Kamer</div>
                <div>{{ store.currentElection.year }}</div>
            </div>

            <map-parties />
        </div>

        <div class="Map__report" v-if="report">
            Op deze kaart is {{ report.coverage }}% van de stemmers
            vertegenwoordigd (als alle partijen zijn aangevinkt).<br />
            De stemmers zijn gemiddeld {{ report.displacement }}km van hun eigen
            gemeente afgebeeld [UITLEG].
        </div>
    </div>
</template>

<style lang="scss" scoped>
.Map {
    display: inline-block;
    position: relative;
    margin: 20px;
    box-shadow: -4px 2px 12px rgba(0, 0, 0, 0.08),
        4px 5px 24px rgba(0, 0, 0, 0.04);

    canvas {
        position: absolute;
        left: 47%;
        top: 47%;
        transform: translate(-50%, -50%);
    }

    &__title {
        line-height: 0.9;
        font-weight: 900;
        position: absolute;
        top: 40px;
        left: 40px;
        z-index: 1;
        text-align: center;
        pointer-events: none;

        div:nth-child(1) {
            font-weight: 400;
        }

        div:nth-child(2) {
            font-size: 200%;
        }

        div:nth-child(3) {
            font-size: 350%;
        }
    }

    .MapParties {
        position: absolute;
        bottom: 20px;
        left: 20px;
        z-index: 1;
        pointer-events: none;
    }

    &__report {
        padding: 20px;
        font-style: italic;
        font-size: var(--text-s);
    }
}
</style>
