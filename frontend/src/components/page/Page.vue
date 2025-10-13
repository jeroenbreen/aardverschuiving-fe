<script setup lang="ts"></script>

<template>
    <div class="Page">
        <slot />
    </div>
</template>

<style lang="scss" scoped>
.Page {
    padding: 20px;
    font-family: var(--font-sans-serif);
    width: 100%;
    max-width: 900px;

    :deep(h2) {
        margin-bottom: 40px;
    }
    :deep(h3) {
        margin-bottom: 30px;
    }

    :deep(p) {
        margin-bottom: 20px;
    }

    :deep(section) {
        padding: 20px 0;
        border-bottom: 1px dashed var(--color-grey-1);
    }

    :deep(.image-set) {
        margin: 20px 0;
        display: flex;
        flex-wrap: wrap;
        gap: var(--size-4);
    }
}
</style>
