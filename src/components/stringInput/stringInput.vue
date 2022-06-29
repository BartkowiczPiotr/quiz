<template>
    <div class="custom-control string-input">
        <label for="input">{{ props.label }}</label>
        <input name="input" type="text" :value="modelValue" @input="emitValue($event.target.value)"/>
        <span v-if="modelValue" @click="emitValue('')" class="string-input__cancel">x</span>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

interface Props {
    modelValue?: string,
    label?: string
}

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);

function emitValue(value: string) {
    emit('update:modelValue', value);
}

</script>

<style lang="scss" src="./stringInput.scss" />
