import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
// import Map from "@/components/map/Map.vue";

const routes: Array<RouteRecordRaw> = [
    // {
    //     path: "/",
    //     name: "Map",
    //     component: Map,
    // },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
