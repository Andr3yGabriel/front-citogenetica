import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../components/LandingPage.vue";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";

const routes = [
    {
        path: '/',
        name: 'LandingPage',
        component: LandingPage
    },
    {
        path: '/Login',
        name: 'Login',
        component: Login
    },
    {
        path: '/Register',
        name: 'Register',
        component: Register
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;