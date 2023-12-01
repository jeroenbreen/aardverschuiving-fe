<script setup lang="ts">
import { defineProps, PropType } from "vue";
import { Party } from "@/types";

defineProps({
    party: {
        type: Object as PropType<Party>,
        required: true,
    },
});
</script>

<template>
    <div class="MapParty">
        <div
            class="MapParty__color"
            :style="{ backgroundColor: party.color }"
        />
        <div class="MapParty__party">
            {{ party.name }}
        </div>
    </div>
</template>

<style lang="scss" scoped>
.MapParty {
    display: flex;
    align-items: center;
    border: 1px solid transparent;
    font-size: 12px;

    &__color {
        width: 12px;
        height: 12px;
        border-radius: 50%;
    }

    &__party {
        padding-left: 12px;
    }
}
</style>
