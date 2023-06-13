import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import NarativePage from '../views/NarativePage.vue';
import LoginScreen from '../views/LoginScreen.vue';
import CreateAccount from '../views/CreateAccount.vue';
import ForgotPassword from '../views/ForgotPassword.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/naratives', component: NarativePage },
  { path: '/login', component: LoginScreen },
  { path: '/create_account', component: CreateAccount },
  { path: '/forgot_password', component: ForgotPassword }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
