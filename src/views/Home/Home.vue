<template>
    <div class="app-view view-home">
        <div class="view-home__header">
            <div class="claim">
                <h1>Let's some QUIZ</h1>
            </div>
            <div class="user">
                <avatar />
                <h3>Hello there {{ state.userName }}!</h3>
            </div>
        </div>
        <div class="view-home__content">
            <contentBox class="configuration">
                <stringInput label="Enter your name" v-model="state.userName"/>
                <btn @click="launchSession()">Let's begin!</btn>
            </contentBox>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import avatar from '@/components/avatar/avatar.vue';
import stringInput from '@/components/stringInput/stringInput.vue';
import contentBox from '@/components/contentBox/contentBox.vue';
import btn from '@/components/btn/btn.vue';
import { useStore } from 'vuex';
import { getCategories, getQuestions } from '@/services/trivia.service';
import { Category } from '@/types/trivia';

const store = useStore();
const sessionToken = computed(() => store.state.sessionToken);
const categories = computed(() => store.state.categories);
const router = useRouter();

const state = reactive({
    userName: 'Human' as string,
    category: '9' as string,
    difficulty: 'medium' as string,
    categories: [] as Category[],
});

function setupConfiguration() {
    if (categories.value.length) {
        state.categories = categories.value;
        return;
    }

    store.dispatch('toggleGlobalLoading', true);

    getCategories(sessionToken.value).then((response) => {
        store.dispatch('setCategories', response.data.trivia_categories);
        state.categories = response.data.trivia_categories;
    }).finally(() => {
        store.dispatch('toggleGlobalLoading', false);
    });
}

function saveConfiguration() {
    const config = {
        userName: state.userName,
        difficulty: state.difficulty,
        category: state.category,
    };

    store.dispatch('setSessionConfiguration', config);
}

function launchSession() {
    store.dispatch('toggleGlobalLoading', true);
    saveConfiguration();

    const params = {
        category: state.category,
        difficulty: state.difficulty,
    };

    getQuestions(sessionToken.value, params).then((response) => {
        store.dispatch('setQuestions', response.data.results);
    }).finally(() => {
        store.dispatch('toggleGlobalLoading', false);
        router.push('/quiz');
    });
}

onMounted(() => {
    setupConfiguration();
});

</script>

<style lang="scss" src="./Home.scss" />
