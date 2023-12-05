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

const posterPadding = 20;
const posterWidth = settings.width + settings.padding * 2 + posterPadding * 2;
const posterHeight = computed(() => (posterWidth / 21) * 29.7);
const report = ref(null);

function relMouseCoords(event) {
    var totalOffsetX = 0;
    var totalOffsetY = 0;
    var canvasX = 0;
    var canvasY = 0;
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    var currentElement = this;

    do {
        totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
        totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
    } while ((currentElement = currentElement.offsetParent));

    canvasX = event.pageX - totalOffsetX;
    canvasY = event.pageY - totalOffsetY;

    return { x: canvasX, y: canvasY };
}
HTMLCanvasElement.prototype.relMouseCoords = relMouseCoords;

const create = () => {
    if (el.value) {
        const start = new Date();
        const voteSets: VoteSetHeavy[] = [...store.voteSetsHeavy];
        const canvas = el.value;
        const ctx = canvas.getContext("2d");
        if (ctx) {
            canvas.width = settings.width + settings.padding * 2;
            canvas.height = settings.width * ratio + settings.padding * 2;
            app.value = new App(
                ctx,
                settings.width,
                settings.width * ratio,
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
                width: posterWidth + 'px',
                height: posterHeight + 'px',
                padding: posterPadding + 'px',
            }"
        >
            <canvas ref="el" />
            <div
                v-if="store.currentElection"
                class="Map__title"
                :style="{
                    width: posterWidth / 3 + 'px',
                    'font-size': posterWidth / 30 + 'px',
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
.map-container {
    padding: 20px;
}
.Map {
    display: inline-block;
    position: relative;
    margin: 0;
    box-shadow: -4px 2px 12px rgba(0, 0, 0, 0.08),
        4px 5px 24px rgba(0, 0, 0, 0.04);

    canvas {
        position: absolute;
        left: 3%;
        top: 10%;
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
