import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/:pathMatch(.*)*',
        redirect: '/',
    },
    {
        path: '/',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home/Home.vue'),
    },
    {
        path: '/quiz',
        name: 'quiz',
        component: () => import(/* webpackChunkName: "quiz" */ '@/views/Quiz/Quiz.vue'),
    },
    {
        path: '/summary',
        name: 'summary',
        component: () => import(/* webpackChunkName: "summary" */ '@/views/Summary/Summary.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
