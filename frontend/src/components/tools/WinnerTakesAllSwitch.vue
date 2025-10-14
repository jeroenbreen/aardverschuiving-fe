<script setup lang="ts">
import { useMainStore } from "@/stores/main";
import Tool from "@/components/tools/Tool.vue";
const store = useMainStore();
</script>

<template>
    <Tool label="Winner Takes All" for-switch>
        <v-switch v-model="store.winnerTakesAll" class="WinnerTakesAll" />
    </Tool>
</template>

<style lang="scss" scoped>
.WinnerTakesAll {
    --v-input-control-height: 24px;
}

:deep(.v-input__details) {
    display: none;
}
</style>
