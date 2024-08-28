import {
	createSSRApp
} from "vue";
import App from "./App.vue";
import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-persistedstate-plugin'
import UniGrid from './uni_modules/uni-grid/components/uni-grid/uni-grid.vue'
import UniGridItem from './uni_modules/uni-grid/components/uni-grid-item/uni-grid-item.vue'
import UniIcons from "./uni_modules/uni-icons/components/uni-icons/uni-icons.vue";
import UniFilePicker from "./uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.vue";

export function createApp() {

	const app = createSSRApp(App);
	const pinia = createPinia();
	const persist = createPersistedState();
	pinia.use(persist);
	app.use(pinia);

	// 全局注册组件
	app.component('uni-grid', UniGrid)
	app.component('uni-grid-item', UniGridItem)
	app.component('uni-icons', UniIcons)
	app.component('uni-file-picker', UniFilePicker)

	return {
		app,
		pinia
	};
}
