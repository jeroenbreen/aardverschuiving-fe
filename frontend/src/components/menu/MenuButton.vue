<script setup lang="ts">
import { PropType, defineProps } from "vue";
import { MenuButton } from "@/types";

defineProps({
    item: {
        type: Object as PropType<MenuButton>,
        required: true,
    },
});
</script>

<template>
    <router-link :to="{ name: item.route }">{{ item.label }}</router-link>
</template>

<style lang="scss" scoped>
a {
    font-family: var(--font-sans-serif);
    color: var(--color-black-1);
    font-weight: 700;
    text-decoration: none;
    border-bottom: 1px dashed red;
    padding: 8px 6px;
    line-height: 1;
    display: inline-block;

    &.router-link-active,
    &:hover {
        border-bottom: 1px solid red;
    }
}
</style>
