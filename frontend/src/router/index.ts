import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Municipalities from "@/components/municipalities/Municipalities.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Municipalities",
        component: Municipalities,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
