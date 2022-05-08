import { createApp } from "vue";
import App from "./App.vue";
import "./assets/base.css";
import { registerSW } from "virtual:pwa-register";
import { router } from './router';

registerSW();

createApp(App)
    .use(router)
    .mount("#app");
