import CurrencyConverter from "@/components/CurrencyConverter.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: CurrencyConverter,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),
});

export default router;
