<script setup lang="ts">
import { computed, ref, watch, defineEmits } from "vue";
import { useMainStore } from "@/stores/main";
import { Municipality } from "@/types";

const emit = defineEmits<{
    select: (value: Municipality) => void;
}>();

const store = useMainStore();

const options = computed<Municipality[]>(() => store.municipalities);
const localValue = ref<Municipality | null>(
    store.currentMunicipality as Municipality
);

watch(
    () => localValue.value,
    () => {
        if (localValue.value) {
            const municipality = options.value.find(
                (m) => m.title === localValue.value
            );
            if (municipality) {
                emit("select", municipality);
            }
        }
    }
);
</script>

<template>
    <div class="MunicipalityPicker">
        <v-select :items="options" v-model="localValue" item-title="title" />
    </div>
</template>

<style lang="scss" scoped>
.MunicipalityPicker {
}
</style>
