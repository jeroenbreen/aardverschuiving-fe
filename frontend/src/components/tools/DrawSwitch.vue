<script setup lang="ts">
import { useMainStore } from "@/stores/main";
import Tool from "@/components/tools/Tool.vue";
const store = useMainStore();
</script>

<template>
    <Tool label="Teken modus">
        <v-switch v-model="store.mapMode" class="DrawSwitch" />
    </Tool>
</template>

<style lang="scss" scoped>
.DrawSwitch {
    --v-input-control-height: 24px;
}

:deep(.v-input__details) {
    display: none;
}
</style>
