<template>
    <div class="results">
        <div class="row">
            <div class="row__column">Session name</div>
            <div class="row__column">Player</div>
            <div class="row__column">Correct answers</div>
        </div>
        <div v-for="(item, index) in props.items" :key="index" class="row">
            <div class="row__column">{{item.sessionName}}</div>
            <div class="row__column">{{item.player}}</div>
            <div class="row__column">{{item.correctAnswers}}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

type ResultItem = {
    player: string,
    correctAnswers: number,
    sessionName: string,
};

interface Props {
    items: ResultItem[],
}

const props = defineProps<Props>();
</script>

<style lang="scss" src="./results.scss" />
