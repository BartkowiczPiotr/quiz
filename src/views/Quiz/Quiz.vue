<template>
    <div class="app-view view-quiz">
        <div class="view-quiz__header">
            <h1>Question {{state.questionIndex + 1}} of 5</h1>
        </div>
        <div class="view-quiz__content">
            <contentBox v-if="state.currentQuestion" class="question-box">
                <div class="question-box__question">
                    <p class="question-box__question">{{state.currentQuestion.question}}</p>
                </div>
                <div class="question-box__answers">
                    <div class="answer" :class="{'answer--selected': answered?.answer === 'True'}" @click="setAnswer('True')">True</div>
                    <div class="answer" :class="{'answer--selected': answered?.answer === 'False'}" @click="setAnswer('False')">False</div>
                </div>
                <div class="question-box__controls">
                    <btn :disabled="state.questionIndex === 0" :lite="true" @click="prevQuestion()">Back</btn>
                    <btn :disabled="!answered" @click="nextQuestion()">{{state.questionIndex === 4 ? 'Finish' : 'Next'}}</btn>
                </div>
            </contentBox>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import contentBox from '@/components/contentBox/contentBox.vue';
import btn from '@/components/btn/btn.vue';
import { useStore } from 'vuex';
import { Answer } from './Quiz.types';

const store = useStore();
const router = useRouter();

const questions = computed(() => store.state.questions);

const state = reactive({
    questionIndex: 0 as number,
    currentQuestion: null,
    answers: [] as Answer[],
});

function setCurrentQuestion() {
    state.currentQuestion = questions.value[state.questionIndex];
}

const sessionsCount = computed(() => store.state.sessions.length);
const player = computed(() => store.state.sessionConfiguration.userName);

function finishSession() {
    const session = {
        name: `Session ${sessionsCount.value + 1}`,
        results: state.answers,
        player,
    };

    store.dispatch('setSessionSummary', session);
    router.push('/summary');
}

const answered = computed(() => state.answers.find((item) => item.index === state.questionIndex));

function nextQuestion() {
    if (!answered.value) return;

    if (state.questionIndex + 1 > 4) {
        finishSession();
        return;
    }

    state.questionIndex += 1;
    setCurrentQuestion();
}

function prevQuestion() {
    if (state.questionIndex - 1 < 0) {
        return;
    }

    state.questionIndex -= 1;
    setCurrentQuestion();
}

function setAnswer(answer: string) {
    const index = state.answers.findIndex((item) => item.index === state.questionIndex);

    if (index > -1) {
        state.answers[index].answer = answer;
        return;
    }

    state.answers.push({ index: state.questionIndex, answer, correct: questions.value[state.questionIndex].correct_answer });
}

onMounted(() => {
    setCurrentQuestion();
});

</script>

<style lang="scss" src="./Quiz.scss" />
