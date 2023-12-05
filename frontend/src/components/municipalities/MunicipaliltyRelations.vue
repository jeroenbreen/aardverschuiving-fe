<script setup lang="ts">
import { useMainStore } from "../../stores/main";
import { computed, PropType, defineProps } from "vue";
import { Municipality } from "@/types";
import { Distance } from "../../types";
defineProps({
    municipality: {
        type: Object as PropType<Municipality>,
        required: true,
    },
});

const store = useMainStore();

const list = computed(() => {
    if (store.distanceList) {
        const relations = store.distanceList.distances.map(
            (distance: Distance) => {
                return {
                    municipality: store.municipalities.find(
                        (municipality) =>
                            municipality.cbs_code ===
                            distance.target_municipality_code
                    ),
                    distance: distance.distance,
                };
            }
        );
        relations.length = 3;
        return relations;
    } else {
        return [];
    }
});

const select = (municipality: Municipality) => {
    store.currentMunicipality = municipality;
};
</script>

<template>
    <div class="MunicipaliltyRelations">
        <button
            @click="select(item.municipality)"
            v-for="(item, index) in list"
            :key="index"
        >
            {{ item.municipality.title }}<br />
            ({{ item.municipality.province }}) ({{ item.distance }})
        </button>
    </div>
</template>

<style lang="scss" scoped>
.MunicipaliltyRelations {
    margin-top: 20px;

    h4 {
        margin-bottom: 8px;
    }
}
button {
    background: var(--color-grey-1);
    padding: 2px;
    margin-bottom: 4px;
    display: block;
    text-align: left;
    width: 100%;

    &:hover {
        background: var(--color-grey-2);
    }
}
</style>
