<script setup lang="ts">
import { useMainStore } from "../../stores/main";
import { computed } from "vue";
import { Municipality } from "@/types";
import MunicipalityElection from "./MunicipalityElection.vue";
import MunicipaliltyRelations from "./MunicipaliltyRelations.vue";
import { addDotsToNumber } from "@/tools/format";

const store = useMainStore();
const municipality = computed<Municipality>(() => store.currentMunicipality);

const population = computed(() => {
    return addDotsToNumber(municipality.value.population);
});
</script>

<template>
    <div class="Municipality">
        <template v-if="municipality">
            <h1>
                {{ municipality.title }}
            </h1>

            <table>
                <tr>
                    <td>Inwoners</td>
                    <td>
                        {{ population }}
                    </td>
                </tr>
                <tr>
                    <td>Provincie</td>
                    <td>
                        {{ municipality.province }}
                    </td>
                </tr>
                <tr>
                    <td>Oppervlakte</td>
                    <td>{{ municipality.area }} km²</td>
                </tr>
                <tr>
                    <td>Gemiddeld inkomen</td>
                    <td>{{ municipality.income }} EUR</td>
                </tr>
                <tr>
                    <td>Migranten</td>
                    <td>{{ municipality.migrants }}%</td>
                </tr>
                <tr>
                    <td>Westerse migranten</td>
                    <td>{{ municipality.migrants_western }}%</td>
                </tr>
                <tr>
                    <td>Niet-Westerse migranten</td>
                    <td>{{ municipality.migrants_non_western }}%</td>
                </tr>
            </table>

            <municipalilty-relations :municipality="municipality" />

            <municipality-election />
        </template>
    </div>
</template>

<style lang="scss" scoped>
.Municipality {
    padding-top: var(--size-4);
    line-height: 1.2;
}

table {
    margin-top: 12px;
    width: 100%;

    td {
        font-size: var(--text-s);

        border-bottom: 1px solid var(--color-grey-1);

        &:first-child {
            padding-right: var(--size-4);
        }

        &:last-child {
            text-align: right;
            white-space: nowrap;
        }
    }
}
</style>
