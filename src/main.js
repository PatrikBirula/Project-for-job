import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import { setupI18n } from "./i18n.js";
import { setupRouter } from "./router/index.js";
import en from "./locales/en.json";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faSearch);
library.add(faTimes);

const i18n = setupI18n({
	globalInjection: true,
	legacy: false,
	locale: "en",
	fallbackLocale: "en",
	messages: {
		en,
	},
});
const router = setupRouter(i18n);

const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);
app.config.productionTip = false;
app.use(i18n);
app.use(router);
app.use(store);
app.mount("#app");
