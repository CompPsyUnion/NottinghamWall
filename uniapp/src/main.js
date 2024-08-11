import {
	createSSRApp
} from "vue";
import App from "./App.vue";
import { createPinia } from 'pinia';
import { useTokenStore } from './store/token';
export function createApp() {
	const app = createSSRApp(App);
	const pinia = createPinia();
	app.use(pinia);
	const tokenStore = useTokenStore();

	uni.addInterceptor('navigateTo', {
		invoke(args) {
			if (!tokenStore.token && args.url !== '/pages/transition/Login') {
				uni.navigateTo({
					url: '/pages/transition/Login',
					fail: (err) => {
						console.error('Route navigation failed:', err);
					}
				});
				return false; // Prevent route navigation
			}
			return true; // Allow route navigation
		},
		fail(err) {
			console.error('Route navigation failed:', err);
		}
	});
	return {
		app,
		pinia
	};
}
