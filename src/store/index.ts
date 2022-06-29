import { createStore } from 'vuex';
import { Category } from '@/types/trivia';
import { SessionConfiguration, SessionSummary } from '@/types/store';

export default createStore({
    state: {
        globalLoading: false as boolean,
        sessionToken: '' as string,
        categories: [] as Category[],
        sessionConfiguration: {} as SessionConfiguration,
        questions: [],
        sessions: [] as SessionSummary[],
    },
    mutations: {
        TOGGLE_GLOBAL_LOADING(state, loading: boolean) {
            state.globalLoading = loading;
        },

        SET_TOKEN(state, token: string) {
            state.sessionToken = token;
        },

        SET_CATEGORIES(state, categories: Category[]) {
            state.categories = categories;
        },

        SET_SESSION_CONFIGURATION(state, configuration: SessionConfiguration) {
            state.sessionConfiguration = configuration;
        },

        SET_QUESTIONS(state, questions) {
            state.questions = questions;
        },

        SET_SESSION_SUMMARY(state, session: SessionSummary) {
            state.sessions.push(session);
        },
    },
    actions: {
        toggleGlobalLoading({ commit }, loading: boolean) {
            commit('TOGGLE_GLOBAL_LOADING', loading);
        },

        setToken({ commit }, token: string) {
            commit('SET_TOKEN', token);
        },

        setCategories({ commit }, categories: Category[]) {
            commit('SET_CATEGORIES', categories);
        },

        setSessionConfiguration({ commit }, configuration: SessionConfiguration) {
            commit('SET_SESSION_CONFIGURATION', configuration);
        },

        setQuestions({ commit }, questions) {
            commit('SET_QUESTIONS', questions);
        },

        setSessionSummary({ commit }, session: SessionSummary) {
            commit('SET_SESSION_SUMMARY', session);
        },
    },
});
