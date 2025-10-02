<script setup lang="ts">
import { computed, defineProps, onMounted, ref, watch } from "vue";
import { useMainStore } from "../../stores/main";
import { Election, Party, VoteSetHeavy } from "../../types";
import MapParties from "./MapParties.vue";
import { ratio } from "./map/settings";
import { App } from "./map/App";
import { Cell } from "./map/Cell";
import { addToPrototype } from "./map/canvasPrototype";
import MapCell from "./cell/MapCell.vue";

const props = defineProps<{
    election: Election;
    parties: Party[];
}>();

addToPrototype();

const store = useMainStore();
const el = ref<HTMLCanvasElement>();
const app = ref<App>();
const currentCell = ref<Cell | null>(null);

const callback = (cell: Cell) => {
    if (cell.voteSets.length > 0) {
        // const voteSet = cell.voteSets[0];
        // store.selectMunicipality(voteSet[1].cbs_code);
        // store.selectParty(voteSet[2].id);
        // currentCell.value = cell;
    }
};

const electionType = computed(() => {
    return props.election.type.split("-").join(" ");
});

const report = ref(null);

const create = () => {
    if (el.value) {
        const start = new Date();
        const voteSets: VoteSetHeavy[] = props.election.voteSets
            .map((v) => {
                const e = props.election;
                const m = store.municipalityLib[v[1]];
                const p = store.partyLib[v[2]];
                return [e, m, p, v[3]];
            })
            .filter((v) => v[0] && v[1] && v[2]);

        const canvas = el.value;
        const ctx = canvas.getContext("2d");
        if (ctx) {
            const netWidth = store.width - 2 * padding.value;
            canvas.width = store.width;
            canvas.height = store.width * ratio;
            app.value = new App(
                ctx,
                netWidth,
                netWidth * ratio,
                voteSets,
                store.grid,
                callback,
                props.parties.map((p) => p.id)
            );
            report.value = app.value.getReport();
        }
        const end = new Date();
        console.log("create time", end.getTime() - start.getTime());
    }
};

const height = computed(() => (store.width * 29.7) / 21);
const padding = computed(() => store.width / 13);

watch(
    () => store.grid,
    () => {
        // update function is slow for some reason, dont understand why
        // app.value.updateGrid(store.grid, [...store.voteSetsHeavy]);
        create();
        currentCell.value = null;
    }
);

watch(
    () => store.width,
    () => {
        create();
        currentCell.value = null;
    }
);

watch(
    () => props.parties,
    () => {
        app.value.updateSelectedParties(props.parties.map((p) => p.id));
    },
    {
        deep: true,
    }
);

onMounted(() => {
    create();
});
</script>

<template>
    <div class="map-container">
        <div
            class="Map"
            :style="{
                height: height + 'px',
                padding: padding + 'px',
            }"
        >
            <canvas ref="el" />
            <div
                class="Map__title"
                :style="{
                    width: store.width / 3 + 'px',
                    'font-size': store.width / 30 + 'px',
                }"
            >
                <div>Verkiezingen</div>
                <div style="text-transform: capitalize">{{ electionType }}</div>
                <div>{{ election.year }}</div>
            </div>

            <MapParties :parties="parties" />
        </div>

        <div class="Map__report" v-if="report">
            Op deze kaart is {{ report.coverage }}% van de stemmers
            vertegenwoordigd (als alle partijen getoond worden).<br />
            De stemmers zijn gemiddeld {{ report.displacement }}km van hun eigen
            gemeente afgebeeld [<router-link :to="{ name: 'Grid' }"
                >UITLEG</router-link
            >].
        </div>

        <map-cell
            v-if="currentCell"
            :cell="currentCell"
            :style="{
                width: store.width + 'px',
            }"
        />
    </div>
</template>

<style lang="scss" scoped>
.map-container {
    position: relative;
}
.Map {
    width: 100%;
    display: inline-block;
    position: relative;
    margin: 0;
    background: #fff;
    box-shadow: -4px 2px 8px rgba(0, 0, 0, 0.1), 4px 5px 16px rgba(0, 0, 0, 0.1);

    canvas {
        position: absolute;
        left: 0;
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
        font-family: "Recursive", sans-serif;

        div:nth-child(1) {
            font-weight: 400;
            font-size: 80%;
        }

        div:nth-child(2) {
            font-size: 200%;
        }

        div:nth-child(3) {
            font-size: 400%;
            font-weight: 400;
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
        margin-top: 12px;
        font-style: italic;
        font-size: 70%;
    }
}
</style>
