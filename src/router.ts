import { createRouter, createWebHistory } from "vue-router";
import { state } from './store';
import { persiststate } from "./firebase";

const routes = [
    {
        path: '/auth',
        name: 'Auth',
        component: () => import('./components/Auth.vue')
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import('./components/Home.vue')
    },
    {
        path: '/chat:id',
        name: 'Chat',
        component: () => import('./components/Chat.vue')
    },
    // {
    //     path: '/user',
    //     name: 'User',
    //     component: ()=> import('./components/User.vue')
    // },
];

export const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

router.afterEach(async (to, from) => {
    persiststate();
    if (to.name != 'Auth' && !state.user) {
        return router.push({ name: 'Auth' });
    }
    if (to.path == '/') {
        if (state.user)
            return router.push({ name: 'Home' });
        else
            return router.push({ name: 'Auth' });
    }
    if (to.name == 'Auth') {
        localStorage.clear();
        state.user = null;
    }
});