import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/components/HomePage.vue';
import LoginPage from '@/components/LoginPage.vue';

const routes = [
    {
      path: '/',
      name: 'Login',
      component: LoginPage
    },
    {
      path: '/home',
      name: 'Home',
      component: HomePage
    }
  ];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;

