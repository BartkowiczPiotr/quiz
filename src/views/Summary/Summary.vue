<template>
    <div class="app-view view-summary">
        <div class="view-summary__header">
            <div class="claim">
                <h1>Summary</h1>
            </div>
        </div>
        <div class="view-summary__content">
            <contentBox class="summary">
                <results :items="sessions" />
                <btn @click="$router.push('/')">Try another one!</btn>
            </contentBox>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import contentBox from '@/components/contentBox/contentBox.vue';
import btn from '@/components/btn/btn.vue';
import { useStore } from 'vuex';
import results from '@/components/results/results.vue';
import { SessionSummary } from '@/types/store';
import { Answer } from '../Quiz/Quiz.types';

const store = useStore();
const router = useRouter();

const sessions = computed(() => {
    const mapped = store.state.sessions.map((item: SessionSummary) => {
        return {
            player: item.player,
            correctAnswers: item.results.filter((answer: Answer) => answer.answer === answer.correct).length,
            sessionName: item.name,
        };
    });

    return mapped;
});

</script>

<style lang="scss" src="./Summary.scss" />
