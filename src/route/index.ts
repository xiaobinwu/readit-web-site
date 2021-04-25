import { createRouter, createWebHistory } from 'vue-router'
import routes from './route-table'

export const routerHistory = createWebHistory();

export const router = createRouter({
    history: routerHistory,
    routes
});