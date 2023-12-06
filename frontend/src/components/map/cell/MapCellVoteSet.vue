<script setup lang="ts">
import { defineProps, PropType } from "vue";
import { VoteSet as VoteSetType } from "@/types";
import VoteSet from "@/components/vote-set/VoteSet.vue";

defineProps({
    voteSet: {
        type: Array as PropType<VoteSetType>,
        required: true,
    },
});
</script>

<template>
    <div class="MapCellVoteSet">
        <vote-set :vote-set="voteSet" is-heavy small />
    </div>
</template>

<style lang="scss" scoped>
.MapCellVoteSet {
    border-bottom: 1px solid var(--color-grey-1);
}
</style>
