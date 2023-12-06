<script setup lang="ts">
import { computed } from "vue";
import { VoteSet as VoteSetType } from "@/types";
import { useMainStore } from "../../stores/main";
import MunicipalityVoteSet from "@/components/municipalities/MunicipalityVoteSet.vue";

const store = useMainStore();

const voteSets = computed<VoteSetType[]>(() => store.voteSetsForMunicipality);
</script>

<template>
    <div class="MunicipalityElection">
        <div class="MunicipalityElection__vote-sets">
            <municipality-vote-set
                v-for="(voteSet, index) in voteSets"
                :key="index"
                :vote-set="voteSet"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.MunicipalityElection {
    margin-top: 16px;
}
</style>
