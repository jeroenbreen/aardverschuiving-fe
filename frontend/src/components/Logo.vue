<script setup lang="ts"></script>

<template>
    <div class="Logo">
        Aardverschuiving
        <div class="block block-1" />
        <div class="block block-2" />
        <div class="block block-3" />
    </div>
</template>

<style lang="scss" scoped>
.Logo {
    font-family: "Recursive", sans-serif;
    font-weight: 900;
    display: flex;
    align-items: center;
    gap: 3px;
}

.block {
    width: 12px;
    height: 12px;
    background: #333;
    display: inline-block;
}

.block-1 {
    background: #70d4ff;
    margin-left: 4px;
    width: 15px;
    height: 15px;
}

.block-3 {
    width: 8px;
    height: 8px;
}

.block-2,
.block-3 {
    background: #a90000;
}
</style>
