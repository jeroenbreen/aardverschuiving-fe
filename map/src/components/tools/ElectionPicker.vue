<script setup lang="ts">
import { computed, ref, watch, defineEmits } from "vue";
import { useMainStore } from "@/stores/main";
import { Election } from "@/types";

const emit = defineEmits<{
    select: (value: Election) => void;
}>();

const store = useMainStore();

const options = computed<Election[]>(() => store.elections);
const localValue = ref<Election | null>(store.currentElection as Election);

watch(
    () => localValue.value,
    () => {
        if (localValue.value) {
            const election = options.value.find(
                (e) => e.id === localValue.value
            );
            if (election) {
                emit("select", election);
            }
        }
    }
);
</script>

<template>
    <div class="ElectionPicker">
        <v-select
            :items="options"
            v-model="localValue"
            item-title="year"
            item-value="id"
        />
    </div>
</template>

<style lang="scss" scoped>
.ElectionPicker {
}
</style>
