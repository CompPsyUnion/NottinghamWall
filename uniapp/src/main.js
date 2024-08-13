import {
	createSSRApp
} from "vue";
import App from "./App.vue";
import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-persistedstate-plugin'

export function createApp() {
	const app = createSSRApp(App);
	const pinia = createPinia();
	const persist = createPersistedState();
	pinia.use(persist);
	app.use(pinia);
	return {
		app,
		pinia
	};
}
