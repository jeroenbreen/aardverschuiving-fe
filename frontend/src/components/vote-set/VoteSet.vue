<script setup lang="ts">
import { computed, defineProps, PropType } from "vue";
import { VoteSet } from "@/types";
import { useMainStore } from "../../stores/main";
import { addDotsToNumber } from "@/tools/format";

const store = useMainStore();
const props = defineProps({
    voteSet: {
        type: Array as PropType<VoteSet>,
        required: true,
    },
    isHeavy: {
        type: Boolean,
        default: false,
    },
    hideMunicipality: {
        type: Boolean,
        default: false,
    },
    small: {
        type: Boolean,
        default: false,
    },
});

const municipalityTitle = computed(() => {
    let m;
    if (props.isHeavy) {
        m = props.voteSet[1];
    } else {
        m = store.municipalities.find((m) => props.voteSet[1] === m.cbs_code);
    }
    return m ? m.title : "";
});

const party = computed(() => {
    if (props.isHeavy) {
        return props.voteSet[2];
    } else {
        return store.parties.find((p) => props.voteSet[2] === p.id);
    }
});

const partyTitle = computed(() => {
    return party.value ? party.value.name : "";
});

const partyColor = computed(() => {
    return party.value ? party.value.color : "";
});

const votes = computed(() => {
    return addDotsToNumber(props.voteSet[3]);
});
</script>

<template>
    <div class="VoteSet" :data-small="small">
        <div class="VoteSet__color" :style="{ backgroundColor: partyColor }" />

        <div class="VoteSet__party">
            {{ partyTitle }}
        </div>

        <div v-if="!hideMunicipality" class="VoteSet__municipality">
            {{ municipalityTitle }}
        </div>

        <div class="VoteSet__votes">
            {{ votes }}
        </div>
    </div>
</template>

<style lang="scss" scoped>
.VoteSet {
    display: flex;
    align-items: center;
    padding: 2px 4px;
    border: 1px solid transparent;
    text-align: left;

    &__color {
        width: 16px;
        height: 16px;
    }

    &__party {
        padding: 2px 12px;
    }

    &__municipality {
        flex-grow: 1;
        width: calc(50% - 59px);
    }

    &__votes {
        width: 100px;
        text-align: right;
        flex-grow: 1;
    }

    &[data-small="true"] {
        padding: 1px 2px;
        font-size: 80%;

        .VoteSet__color {
            width: 10px;
            height: 10px;
        }

        .VoteSet__party {
            padding: 2px 8px 0 8px;
        }
    }
}
</style>
