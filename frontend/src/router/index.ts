import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Municipalities from "@/components/municipalities/Municipalities.vue";
import Map from "@/components/map/Map.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Map",
        component: Map,
    },
    {
        path: "/municipalities",
        name: "Municipalities",
        component: Municipalities,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
