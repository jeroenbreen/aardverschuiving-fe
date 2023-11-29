<script setup lang="ts">
import { onMounted, ref } from "vue";
import { render } from "./render";

const el = ref<HTMLElement | null>(null);

onMounted(() => {
    if (el.value) {
        render(el.value);
    }
});
</script>

<template>
    <div class="MapMain" ref="el"></div>
</template>

<style lang="scss" scoped>
.MapMain {
    width: 800px;
    height: 800px;
}
</style>
