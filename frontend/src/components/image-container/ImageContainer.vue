<script setup lang="ts">
import { defineProps } from "vue";

defineProps({
    image: {
        type: String,
        required: true,
    },
    imageAlt: {
        type: String,
        required: true,
    },
    href: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        required: true,
    },
    size: {
        type: Number,
        default: 400,
    },
});
</script>

<template>
    <div class="ImageContainer" :style="{ width: size + 'px' }">
        <img :src="image" :alt="imageAlt" />
        <a href="href" target="_blank">
            {{ label }}
        </a>
    </div>
</template>

<style lang="scss" scoped>
.ImageContainer {
    background: #fff;
    padding: 10px;
    border: 1px solid #ddd;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    img {
        width: 100%;
        height: auto;
    }

    a {
        color: var(--color-black-1);
    }
}
</style>
