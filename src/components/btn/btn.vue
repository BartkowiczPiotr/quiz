<template>
    <button class="btn" :class="{'btn--disabled': props.disabled, 'btn--lite': props.lite}" :disabled="props.disabled">
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

interface Props {
    disabled?: boolean,
    lite?: boolean,
}

const props = defineProps<Props>();
</script>

<style lang="scss" src="./btn.scss" />
