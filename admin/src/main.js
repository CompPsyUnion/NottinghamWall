import './assets/main.scss'
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-persistedstate-plugin'
import {setupRouterGuard} from '@/router/guards';
import router from '@/router/index'
import App from '@/App.vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn';

setupRouterGuard(router);

const app = createApp(App);
const pinia = createPinia();
const persist = createPersistedState();
pinia.use(persist);
app.use(pinia);
app.use(router);
app.use(ElementPlus, { locale: zhCn });
app.mount('#app')
