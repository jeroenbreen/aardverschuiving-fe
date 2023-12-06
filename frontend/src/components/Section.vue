<template>
    <div class="Section">
        <slot />
    </div>
</template>

<style lang="scss" scoped>
.Section {
    margin-top: 32px;
    padding: 8px 8px 8px 16px;
    border-left: 4px solid var(--color-grey-1);

    :deep(h4) {
        margin-bottom: 12px;
    }
}
</style>
