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

const municipalities = computed(() => {
    if (store.distanceList) {
        return store.distanceList.distances.map((distance: Distance) => {
            return store.municipalities.find(
                (municipality) =>
                    municipality.cbs_code === distance.target_municipality_code
            );
        });
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
        <h4>Meest overeenkomstige gemeentes:</h4>
        <button
            @click="select(municipality)"
            v-for="(municipality, index) in municipalities"
            :key="index"
        >
            {{ municipality.title }}
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

    &:hover {
        background: var(--color-grey-2);
    }
}
</style>
