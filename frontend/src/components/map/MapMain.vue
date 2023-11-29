<script setup lang="ts">
import { onMounted, ref } from "vue";
import { render } from "./render";
import { useMainStore } from "../../stores/main";

const store = useMainStore();
const el = ref<HTMLElement | null>(null);

onMounted(() => {
    if (el.value) {
        const nlSet = store.municipalities.filter(
            (m) => m.province !== "Caribisch Nederland"
        );
        render(el.value, nlSet);
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
