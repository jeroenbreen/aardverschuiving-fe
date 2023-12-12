<script setup lang="ts">
import MenuButton from "@/components/menu/MenuButton.vue";
import { MenuButton as MenuButtonType } from "@/types";

const items: MenuButtonType[] = [
    {
        label: "Verkiezingskaart",
        route: "Main",
    },
    {
        label: "Uitleg grid",
        route: "Grid",
    },
];
</script>

<template>
    <div class="Menu">
        <menu-button v-for="(item, index) in items" :key="index" :item="item" />
    </div>
</template>

<style lang="scss" scoped>
.Menu {
    padding: 0 16px;
    display: flex;
    align-items: center;
    gap: var(--size-4);
}
</style>
