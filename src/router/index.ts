/**
 * Vue Router Configuration
 *
 * Routes:
 * - / (Home)
 * - /about (About page)
 * - /dashboard (Protected - requires auth)
 * - /login (Guest only)
 * - /admin (Protected - admin role)
 * - /404 (Not found)
 * - /* (Catch all - redirects to 404)
 *
 * Features:
 * - Authentication guards
 * - Role-based access control
 * - Lazy loading with code splitting
 */

import { createRouter, createWebHistory, /* createWebHashHistory, */ type RouteRecordRaw } from 'vue-router';
import { createAuthGuard, createAfterGuard } from './guards';

// Import pages as lazy loaded components for better performance
const Home = () => import('@/pages/Home.vue');
const About = () => import('@/pages/About.vue');
const Dashboard = () => import('@/pages/Dashboard.vue');
const Login = () => import('@/pages/Login.vue');
const Admin = () => import('@/pages/Admin.vue');
const NotFound = () => import('@/pages/NotFound.vue');

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: {
            title: 'Home',
        },
    },
    {
        path: '/about',
        name: 'about',
        component: About,
        meta: {
            title: 'About',
        },
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta: {
            title: 'Dashboard',
            requiresAuth: true,
        },
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            title: 'Login',
            requiresGuest: true,
        },
    },
    {
        path: '/admin',
        name: 'admin',
        component: Admin,
        meta: {
            title: 'Admin Panel',
            requiresAuth: true,
            role: 'admin',
        },
    },
    {
        path: '/forbidden',
        name: 'forbidden',
        component: () => import('@/pages/Forbidden.vue'),
        meta: {
            title: 'Access Denied',
        },
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'notfound',
        component: NotFound,
        meta: {
            title: '404 Not Found',
        },
    },
];

const router = createRouter({
    // history: createWebHashHistory(), // Route like '/#/about'
    history: createWebHistory(), // Route like '/about'
    routes,
});

// Setup guards
createAuthGuard(router);
createAfterGuard(router);

export default router;
