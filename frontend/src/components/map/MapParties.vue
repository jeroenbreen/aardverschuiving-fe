<script setup lang="ts">
import { computed } from "vue";
import { useMainStore } from "../../stores/main";
import MapParty from "@/components/map/MapParty";

const store = useMainStore();

const parties = computed(() => {
    const ids = [4, 1, 2, 6];
    return ids.map((id) => {
        return store.parties.find((p) => p.id === id);
    });
});
</script>

<template>
    <div class="MapParties">
        <map-party
            v-for="(party, index) of parties"
            :key="index"
            :party="party"
        />
    </div>
</template>

<style lang="scss" scoped>
.MapParties {
}
</style>
