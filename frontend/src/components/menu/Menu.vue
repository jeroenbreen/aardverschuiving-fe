<script setup lang="ts">
import MenuButton from "@/components/menu/MenuButton.vue";
import { MenuButton as MenuButtonType } from "@/types";

const items: MenuButtonType[] = [
    {
        label: "Verkiezingskaart",
        route: "Main",
    },
    {
        label: "Doel",
        route: "Mission",
    },
    {
        label: "Uitleg grid",
        route: "Grid",
    },
    {
        label: "Uitleg overeenkomstige gemeentes",
        route: "MatchingMunicipalities",
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
    padding: 8px 16px;
    display: flex;
    gap: var(--size-4);
}
</style>
