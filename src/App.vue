<template>
    <router-view v-if="sessionToken"/>
    <splash v-if="loading" />
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import splash from '@/components/splash/splash.vue';
import { getToken } from '@/services/trivia.service';
import { useStore } from 'vuex';

const store = useStore();

const loading = computed(() => store.state.globalLoading);
const sessionToken = computed(() => store.state.sessionToken);

onMounted(() => {
    store.dispatch('toggleGlobalLoading', true);

    getToken().then((response) => {
        store.dispatch('setToken', response.data.token);
    }).finally(() => {
        store.dispatch('toggleGlobalLoading', false);
    });
});
</script>

<style lang="scss" src="./global.scss"/>
