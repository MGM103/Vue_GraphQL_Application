import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import NarativePage from '../views/NarativePage.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/naratives', component: NarativePage }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
