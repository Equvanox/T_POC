import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import * as echarts from 'echarts';

const app = createApp(App);
app.config.globalProperties.$echarts = echarts;
app.use(router);
app.mount('#app');