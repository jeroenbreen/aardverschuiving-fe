import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Main from "@/pages/Main.vue";
import Mission from "@/pages/Mission.vue";
import Justification from "@/pages/Justification.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Main",
        component: Main,
    },
    {
        path: "/about",
        name: "Mission",
        component: Mission,
    },
    {
        path: "/verantwoording",
        name: "Justification",
        component: Justification,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
