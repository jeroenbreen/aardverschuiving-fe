<script setup lang="ts">
import { computed, defineProps, PropType } from "vue";
import { VoteSet } from "@/types";
import { useMainStore } from "../../stores/main";

const store = useMainStore();
const props = defineProps({
    voteSet: {
        type: Array as PropType<VoteSet>,
        required: true,
    },
});

const party = computed(() => {
    return store.parties.find((p) => props.voteSet[2] === p.id);
});

const partyTitle = computed(() => {
    return party.value ? party.value.name : "";
});

const partyColor = computed(() => {
    return party.value ? party.value.color : "";
});

const isCurrent = computed(() => {
    return store.currentParty && store.currentParty.id === props.voteSet[2];
});

const isActive = computed(() => {
    return store.selectedParties.includes(props.voteSet[2]);
});
</script>

<template>
    <div
        class="MunicipalityVoteSet"
        :data-is-current="isCurrent"
        :data-is-active="isActive"
    >
        <div
            class="MunicipalityVoteSet__color"
            :style="{ backgroundColor: partyColor }"
        />
        <div class="MunicipalityVoteSet__party">
            {{ partyTitle }}
        </div>
        <div class="MunicipalityVoteSet__votes">
            {{ voteSet[3] }}
        </div>
    </div>
</template>

<style lang="scss" scoped>
.MunicipalityVoteSet {
    display: flex;
    align-items: center;
    padding: 2px 8px;
    border: 1px solid transparent;

    &__color {
        width: 20px;
        height: 20px;
        border-radius: 50%;
    }

    &__party {
        flex-grow: 1;
        padding-left: 12px;
    }

    &__votes {
        width: 100px;
        text-align: right;
    }

    &[data-is-current="true"] {
        background-color: #f5f5f5;
        border: 1px solid #000;
    }

    &[data-is-active="false"] {
        opacity: 0.3;
    }
}
</style>
