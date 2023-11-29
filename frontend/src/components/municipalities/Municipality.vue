<script setup lang="ts">
import { useMainStore } from "../../stores/main";
import { computed } from "vue";
import { Municipality } from "@/types";

const store = useMainStore();
const municipality = computed<Municipality>(() => store.currentMunicipality);
</script>

<template>
    <div v-if="municipality" class="Municipality">
        <h3>
            {{ municipality.title }}
        </h3>

        <table>
            <tr>
                <td>Inwoners</td>
                <td>
                    {{ municipality.population }}
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
    </div>
</template>

<style lang="scss" scoped>
table {
    margin-top: 12px;
    td {
        font-size: var(--text-s);
        padding-right: var(--size-4);
        border-bottom: 1px solid var(--color-grey-1);
    }
}
</style>
