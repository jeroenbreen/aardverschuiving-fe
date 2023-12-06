<script setup lang="ts">
import Tools from "@/components/tools/Tools.vue";
import Municipality from "@/components/municipalities/Municipality.vue";
import ElectionMap from "@/components/map/Map.vue";
import { useMainStore } from "@/stores/main";

const store = useMainStore();
</script>

<template>
    <div class="Main" v-if="store.init">
        <tools />
        <municipality />
        <election-map />
    </div>
</template>

<style lang="scss" scoped>
.Main {
    display: flex;
    gap: 24px;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;

    .Tools {
        width: 250px;
        height: 100%;
        overflow: auto;
    }

    .Municipality {
        width: 320px;
        height: 100%;
        overflow: auto;
        padding-right: 20px;
    }

    .map-container {
        flex: 1;
        height: 100%;
        overflow: auto;
    }
}
</style>
