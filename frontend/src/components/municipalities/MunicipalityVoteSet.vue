<script setup lang="ts">
import { computed, defineProps, PropType } from "vue";
import { VoteSet as VoteSetType } from "@/types";
import VoteSet from "@/components/vote-set/VoteSet.vue";
import { useMainStore } from "@/stores/main";

const props = defineProps({
    voteSet: {
        type: Array as PropType<VoteSetType>,
        required: true,
    },
});

const store = useMainStore();

const party = computed(() => {
    return store.parties.find((p) => props.voteSet[2] === p.id);
});

const isCurrent = computed(() => {
    return store.currentParty === party.value;
});

const isActive = computed(() => {
    return party.value && store.selectedParties.includes(party.value.id);
});
</script>

<template>
    <button :data-is-current="isCurrent" :data-is-active="isActive">
        <vote-set :vote-set="voteSet" hide-municipality />
    </button>
</template>

<style lang="scss" scoped>
button {
    display: block;
    width: 100%;
    border: 1px solid transparent;

    &[data-is-current="true"] {
        background-color: #f5f5f5;
        border: 1px solid #000;
    }

    &[data-is-active="false"] {
        opacity: 0.3;
    }
}
</style>
