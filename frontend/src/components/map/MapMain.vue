<script setup lang="ts">
import { onMounted, ref, defineEmits } from "vue";
import { render } from "./render";
import { useMainStore } from "../../stores/main";
import { FeatureProperties } from "../../types";

const store = useMainStore();
const el = ref<HTMLElement | null>(null);

const callback = (properties: FeatureProperties) => {
    store.selectMunicipality(properties.cbs_code);
};

onMounted(() => {
    if (el.value) {
        const nlSet = store.municipalities.filter(
            (m) => m.province !== "Caribisch Nederland"
        );
        render(el.value, nlSet, callback);
    }
});
</script>

<template>
    <div class="MapMain" ref="el"></div>
</template>

<style lang="scss" scoped>
.MapMain {
    width: 500px;
    height: 500px;
}
</style>
