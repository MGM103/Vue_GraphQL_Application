import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import NarativePage from '../views/NarativePage.vue';
import LoginScreen from '../views/LoginScreen.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/naratives', component: NarativePage },
  { path: '/login', component: LoginScreen }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
