import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/components/HomePage.vue';
import LoginPage from '@/components/LoginPage.vue';
import YieldChartGrid from '@/components/YieldChartGrid.vue'

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
    },
    {
      path: '/yield',
      name: 'YieldChartGrid',
      component: YieldChartGrid
    }
  ];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;

