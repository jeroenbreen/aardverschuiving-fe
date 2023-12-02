<script setup lang="ts">
import { useMainStore } from "../../stores/main";
import { computed, PropType, defineProps } from "vue";
import { Municipality } from "@/types";

defineProps({
    municipality: {
        type: Object as PropType<Municipality>,
        required: true,
    },
});

const store = useMainStore();

const relations = computed(() => store.relations);
</script>

<template>
    <div class="MunicipaliltyRelations">
        {{ store.municipalityResultsDeviation }}
    </div>
</template>

<style lang="scss" scoped>
.MunicipaliltyRelations {
}
</style>
