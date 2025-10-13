<script setup lang="ts">
import { defineProps, PropType, useId } from "vue";
import { Party } from "@/types";

defineProps({
    item: {
        type: Object as PropType<{ party: Party; display: boolean }>,
        required: true,
    },
});

const id = useId();
</script>

<template>
    <div class="PartyCheckbox">
        <input :id="id" type="checkbox" v-model="item.display" />
        <label :for="id">
            {{ item.party.name }}
        </label>
    </div>
</template>

<style lang="scss" scoped>
.PartyCheckbox {
    font-size: 11px;
    background: #555;
    color: #fff;
    padding: 4px;
    display: flex;
    align-items: center;
    gap: 8px;
    line-height: 1;

    label {
        padding-top: 2px;
    }
}
</style>
