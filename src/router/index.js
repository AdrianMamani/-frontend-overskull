import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: "/",
        name : "inicio",
        component: () => import("../views/HomeView.vue"),
    },
    {
        path: "/categorias",
        name : "categorias",
        component: () => import("../views/CategoriasView.vue"),
    },
    {
        path: "/productos",
        name : "productos",
        component: () => import("../views/ProductosView.vue"),
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router