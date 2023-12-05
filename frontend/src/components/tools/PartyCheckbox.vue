<script setup lang="ts">
import { defineProps, PropType, ref, watch } from "vue";
import { Party } from "@/types";

import { useMainStore } from "@/stores/main";
const store = useMainStore();

const props = defineProps({
    party: {
        type: Object as PropType<Party>,
        required: true,
    },
    i: {
        type: Number,
        required: true,
    },
});

const isActive = ref(store.selectedPartyRanks.includes(props.i));

watch(
    () => isActive.value,
    () => {
        store.toggleParty(props.i);
    }
);

// watch(
//     () => store.selectedParties,
//     () => {
//         if (store.selectedParties.includes(props.party.id)) {
//             if (!isActive.value) {
//                 isActive.value = true;
//             }
//         } else {
//             if (isActive.value) {
//                 isActive.value = false;
//             }
//         }
//     },
//     {
//         deep: true,
//     }
// );
</script>

<template>
    <div class="PartyCheckbox">
        <input type="checkbox" v-model="isActive" />
        {{ party.name }}
    </div>
</template>

<style lang="scss" scoped>
.PartyCheckbox {
    font-size: var(--text-s);
}
</style>
